import { useState, useEffect } from 'react'
import { getProvinces, getWards } from '../lib/addressData'
import MapPicker from './MapPicker'
import '../styles/AddressForm.css'

export default function AddressForm({ onConfirm, onCancel }) {
  const [step, setStep] = useState(1) // 1: select address, 2: pick on map
  const [province, setProvince] = useState('') // will store province code
  const [ward, setWard] = useState('') // will store ward name
  const [street, setStreet] = useState('')
  const [error, setError] = useState('')
  const [mapLocation, setMapLocation] = useState(null)

  const [provincesList, setProvincesList] = useState([])
  const [wardsList, setWardsList] = useState([])

  const removeAccents = (s = '') => {
    try {
      return String(s)
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/đ/gi, 'd')
    } catch {
      return String(s)
    }
  }

  const isHoChiMinh = (name = '') => {
    const n = removeAccents(name).toLowerCase()
    return (
      n.includes('ho chi minh') ||
      n.includes('tp ho chi minh') ||
      n.includes('thanh pho ho chi minh') ||
      n.includes('hcm')
    )
  }

  const sortKey = (s = '') => {
    const n = removeAccents(String(s || '')).toLowerCase()
    return n
      .replace(/^thanh pho\s+/i, '')
      .replace(/^tp\.?\s+/i, '')
      .replace(/^tinh\s+/i, '')
      .replace(/^quan\s+/i, '')
      .replace(/^huyen\s+/i, '')
      .replace(/^thi xa\s+/i, '')
      .replace(/^thi tran\s+/i, '')
      .replace(/^phuong\s+/i, '')
      .replace(/^xa\s+/i, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const geocodeNominatim = async (query, { limit = 5 } = {}) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=${encodeURIComponent(String(limit))}&countrycodes=vn&q=${encodeURIComponent(query)}`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'vi',
        'User-Agent': 'food-ordering-app/1.0 (contact: your-email@example.com)'
      }
    })
    const arr = await res.json()
    if (!Array.isArray(arr) || arr.length === 0) return []
    return arr
      .map(r => ({
        display_name: r.display_name,
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
        address: r.address || null,
        importance: Number(r.importance || 0),
        class: r.class || null,
        type: r.type || null,
        addresstype: r.addresstype || null,
        boundingbox: Array.isArray(r.boundingbox) ? r.boundingbox.map(Number) : null
      }))
      .filter(r => Number.isFinite(r.lat) && Number.isFinite(r.lng))
  }

  const centerFromBoundingBox = (bb) => {
    if (!Array.isArray(bb) || bb.length !== 4) return null
    const [south, north, west, east] = bb
    const lat = (Number(south) + Number(north)) / 2
    const lng = (Number(west) + Number(east)) / 2
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
    return { lat, lng }
  }

  const guessIsRoadOnlyInput = (street = '') => {
    return !/^\s*\d+/u.test(String(street || ''))
  }

  const stripLeadingHouseNumber = (s = '') => {
    return String(s).replace(/^\s*\d+[A-Za-z0-9\/._-]*\s+/u, '').trim()
  }

  const buildStreetMatchTokens = (s = '') => {
    const raw = removeAccents(String(s || '')).toLowerCase().trim()
    if (!raw) return []

    const compact = raw
      .replace(/[.,]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()

    const noPrefixes = compact
      .replace(/^\b(duong|d\.?|street|st\.?|road|rd\.?|ngo|hem|h\.)\b\s+/i, '')
      .trim()

    const noSo = noPrefixes
      .replace(/\b(so|số|no\.?|number)\b\s*/gi, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()

    const tokens = [compact, noPrefixes, noSo]
      .filter(Boolean)
      .map((t) => t.trim())
      .filter(Boolean)

    return Array.from(new Set(tokens))
  }

  const pickBestCandidate = (candidates, { provinceName, districtName, wardName, street, requireWardMatch = false, requireStreetMatch = false, streetMatchTokens = [] } = {}) => {
    if (!Array.isArray(candidates) || candidates.length === 0) return null

    const norm = (s = '') => removeAccents(String(s)).toLowerCase()
    const nProvince = norm(provinceName)
    const nProvinceCore = nProvince
      .replace(/\b(thanh pho|tp\.?|tinh)\b/gi, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
    const provinceKeywords = Array.from(
      new Set([nProvince, nProvinceCore, isHoChiMinh(provinceName) ? 'ho chi minh' : null].filter(Boolean))
    )
    const nDistrict = norm(districtName)
    const nWard = norm(wardName)
    const nStreet = norm(street)

    const districtFallbackKeywords = (() => {
      const kws = []
      if (nDistrict.includes('quan 9')) kws.push('thu duc')
      return kws
    })()

    const preciseTypes = new Set([
      'house',
      'building',
      'amenity',
      'shop',
      'office',
      'craft',
      'industrial',
      'tourism'
    ])

    const roadTypes = new Set(['road', 'street', 'residential', 'unclassified', 'tertiary', 'secondary', 'primary', 'service'])
    const wardishTypes = new Set(['suburb', 'quarter', 'neighbourhood', 'hamlet', 'village', 'administrative'])

    const score = (c) => {
      const dn = norm(c.display_name)
      let s = 0
      const provinceHit = provinceKeywords.some((k) => dn.includes(k))
      const districtHit = nDistrict && dn.includes(nDistrict)
      const districtFallbackHit = districtFallbackKeywords.some(k => dn.includes(k))
      const wardHit = nWard && dn.includes(nWard)

      if (provinceHit) s += 6
      if (districtHit) s += 5
      if (districtFallbackHit) s += 3
      if (wardHit) s += 4
      if (nStreet && dn.includes(nStreet)) s += 2

      const at = norm(c.addresstype || c.type || '')
      if (preciseTypes.has(at)) s += 10
      else if (roadTypes.has(at)) s += 6
      else if (wardishTypes.has(at)) s += 4

      s += Math.min(2, Number(c.importance || 0))
      return s
    }

    const scored = candidates
      .map((c) => ({ c, s: score(c) }))
      .sort((a, b) => b.s - a.s)

    const best = scored[0]
    if (!best) return null

    const bestDn = norm(best.c.display_name)
    const hasAdminConstraint = Boolean(nProvince || nDistrict || nWard)
    const hasAdminMatch =
      provinceKeywords.some((k) => bestDn.includes(k)) ||
      (nDistrict && bestDn.includes(nDistrict)) ||
      districtFallbackKeywords.some(k => bestDn.includes(k)) ||
      (nWard && bestDn.includes(nWard))

    if (hasAdminConstraint && !hasAdminMatch) return null
    if (requireWardMatch && nWard && !bestDn.includes(nWard)) return null
    if (requireStreetMatch) {
      const tokens = Array.isArray(streetMatchTokens) ? streetMatchTokens : []
      const normTokens = tokens.map((t) => norm(t)).filter(Boolean)
      if (normTokens.length > 0) {
        const tokenHit = normTokens.some((t) => bestDn.includes(t))
        if (!tokenHit) {
          const words = normTokens[0]
            .split(/\s+/)
            .map((w) => w.trim())
            .filter((w) => w && w.length >= 2)
          const hitCount = words.reduce((acc, w) => acc + (bestDn.includes(w) ? 1 : 0), 0)
          if (hitCount < Math.min(2, words.length || 2)) return null
        }
      }
    }
    if (best.s < 4) return null

    return best.c
  }

  useEffect(() => {
    let mounted = true
    getProvinces().then(list => {
      if (!mounted) return
      const sorted = (Array.isArray(list) ? list : [])
        .slice()
        .sort((a, b) => sortKey(a?.name).localeCompare(sortKey(b?.name), 'vi'))
      setProvincesList(sorted)
    }).catch(() => setProvincesList([]))
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!province) {
      setWardsList([])
      setWard('')
      return
    }
    let mounted = true
    getWards(province).then(list => {
      if (!mounted) return
      const sorted = (Array.isArray(list) ? list : [])
        .slice()
        .sort((a, b) => sortKey(a?.name).localeCompare(sortKey(b?.name), 'vi'))
      setWardsList(sorted)
    }).catch(() => setWardsList([]))
    return () => { mounted = false }
  }, [province])

  const handleAddressSelect = async () => {
    if (!province || !ward || !street) {
      setError('Vui lòng nhập đầy đủ thông tin địa chỉ')
      return
    }
    setError('')
    // Combine address string for Nominatim search
    const provinceObj = provincesList.find(p => String(p.code) === String(province))
    const provinceName = provinceObj ? provinceObj.name : province
    const wardObj = wardsList.find(w => String(w.name) === String(ward))
    const wardName = wardObj ? wardObj.name : ward
    const oldWardCandidates = Array.isArray(wardObj?.old_units) ? wardObj.old_units : []
    const wardVariants = Array.from(new Set([
      wardName,
      ...oldWardCandidates
        .map(s => String(s || '').split('(')[0].split(',')[0].trim())
        .filter(Boolean)
        .slice(0, 6)
    ].filter(Boolean)))

    const addressString = `${street}, ${wardName}, ${provinceName}, Vietnam`

    let latlng = null
    try {
      const isRoadOnly = guessIsRoadOnlyInput(street)
      const withoutNumber = stripLeadingHouseNumber(street)
      const roadQuery = isRoadOnly ? String(street || '').trim() : withoutNumber

      const provinceVariants = (() => {
        const vars = [provinceName]
        if (isHoChiMinh(provinceName)) {
          vars.push('TP. Hồ Chí Minh')
          vars.push('TP Hồ Chí Minh')
          vars.push('Ho Chi Minh City')
        }
        return Array.from(new Set(vars.filter(Boolean)))
      })()

      const areaVariants = (() => {
        if (!isHoChiMinh(provinceName)) return ['']
        return ['', 'Thủ Đức', 'Thành phố Thủ Đức']
      })()

      const tryQueries = []
      for (const av of areaVariants) {
        for (const pv of provinceVariants) {
          const mid = av ? `, ${av}` : ''
          for (const wv of (wardVariants.length ? wardVariants : [wardName])) {
            tryQueries.push(`${street}, ${wv}${mid}, ${pv}, Vietnam`)
            if (roadQuery) tryQueries.push(`${roadQuery}, ${wv}${mid}, ${pv}, Vietnam`)
            tryQueries.push(`${wv}${mid}, ${pv}, Vietnam`)
          }
          if (av) tryQueries.push(`${av}, ${pv}, Vietnam`)
        }
      }
      for (const pv of provinceVariants) {
        tryQueries.push(`${pv}, Vietnam`)
      }

      const uniqueTryQueries = Array.from(new Set(tryQueries.filter(Boolean)))

      let bestPicked = null

      const normQ = (s = '') => removeAccents(String(s)).toLowerCase()
      const normWard = normQ(ward)
      const normStreet = normQ(street)
      const normRoad = normQ(roadQuery)
      const roadTokens = buildStreetMatchTokens(roadQuery || withoutNumber || '')

      for (let i = 0; i < uniqueTryQueries.length; i++) {
        const q = uniqueTryQueries[i]
        const qn = normQ(q)
        const isStreetStage = normStreet && qn.startsWith(normStreet)
        const isRoadStage = !isStreetStage && normRoad && qn.startsWith(normRoad)
        const isWardStage = !isStreetStage && !isRoadStage && normWard && qn.startsWith(normWard)
        const candidates = await geocodeNominatim(q, { limit: 10 })
        const best = pickBestCandidate(candidates, {
          provinceName,
          districtName: '',
          wardName: wardName,
          street: isRoadOnly ? roadQuery : street,
          requireWardMatch: isWardStage,
          requireStreetMatch: isStreetStage || isRoadStage,
          streetMatchTokens: roadTokens
        })
        if (!best) continue

        bestPicked = best
        break
      }

      if (bestPicked) {
        const at = removeAccents(String(bestPicked.addresstype || bestPicked.type || '')).toLowerCase()
        const roadLike = ['road', 'street', 'residential', 'unclassified', 'tertiary', 'secondary', 'primary', 'service'].includes(at)

        if (roadLike && bestPicked.boundingbox) {
          latlng = centerFromBoundingBox(bestPicked.boundingbox) || { lat: bestPicked.lat, lng: bestPicked.lng }
        } else {
          latlng = { lat: bestPicked.lat, lng: bestPicked.lng }
        }
      } else {
        for (const av of areaVariants) {
          if (latlng) break
          for (const pv of provinceVariants) {
            if (latlng) break
            const mid = av ? `, ${av}` : ''
            for (const wv of (wardVariants.length ? wardVariants : [wardName])) {
              if (latlng) break
              const wardCandidates = await geocodeNominatim(
                `${wv}${mid}, ${pv}, Vietnam`,
                { limit: 10 }
              )
              const wardBest = pickBestCandidate(wardCandidates, {
                provinceName,
                districtName: '',
                wardName: wv,
                street: ''
              })
              if (wardBest?.boundingbox) {
                latlng = centerFromBoundingBox(wardBest.boundingbox) || { lat: wardBest.lat, lng: wardBest.lng }
              } else if (wardBest) {
                latlng = { lat: wardBest.lat, lng: wardBest.lng }
              }
            }
          }
        }

        if (!latlng) {
          for (const av of areaVariants.filter(Boolean)) {
            if (latlng) break
            for (const pv of provinceVariants) {
              if (latlng) break
              const areaCandidates = await geocodeNominatim(
                `${av}, ${pv}, Vietnam`,
                { limit: 10 }
              )
              const areaBest = pickBestCandidate(areaCandidates, {
                provinceName,
                districtName: '',
                wardName: '',
                street: ''
              })
              if (areaBest?.boundingbox) {
                latlng = centerFromBoundingBox(areaBest.boundingbox) || { lat: areaBest.lat, lng: areaBest.lng }
              } else if (areaBest) {
                latlng = { lat: areaBest.lat, lng: areaBest.lng }
              }
            }
          }
        }

        if (!latlng) {
          const provinceCandidates = await geocodeNominatim(`${provinceName}, Vietnam`, { limit: 10 })
          const provinceBest = pickBestCandidate(provinceCandidates, {
            provinceName,
            districtName: '',
            wardName: '',
            street: ''
          })
          if (provinceBest?.boundingbox) {
            latlng = centerFromBoundingBox(provinceBest.boundingbox) || { lat: provinceBest.lat, lng: provinceBest.lng }
          } else if (provinceBest) {
            latlng = { lat: provinceBest.lat, lng: provinceBest.lng }
          }
        }
      }
    } catch {
      latlng = null
    }

    // Fallback lat/lng based on common cities
    const fallbackLat = isHoChiMinh(provinceName) ? 10.776 : 21.028
    const fallbackLng = isHoChiMinh(provinceName) ? 106.7 : 105.854
    setMapLocation({
      lat: latlng?.lat ?? fallbackLat,
      lng: latlng?.lng ?? fallbackLng,
      address: addressString
    })
    setStep(2)
  }

  const handleMapConfirm = (data) => {
    const provinceObj = provincesList.find(p => String(p.code) === String(province))
    const finalAddress = {
      province: provinceObj ? provinceObj.name : province,
      ward,
      street,
      lat: data.lat,
      lng: data.lng,
      fullAddress: `${street}, ${ward}, ${provinceObj ? provinceObj.name : province}`
    }
    onConfirm(finalAddress)
  }

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">
        {step === 1 ? (
          <div className="address-form-step1">
            <h2>Chọn địa chỉ giao hàng</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Tỉnh / Thành phố <span className="required">*</span></label>
                <select
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value)
                    setWard('')
                  }}
                  className="form-input"
                >
                  <option value="">-- Chọn tỉnh / thành phố --</option>
                  {provincesList.map(p => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phường / Xã <span className="required">*</span></label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  disabled={!province}
                  className="form-input"
                >
                  <option value="">-- Chọn phường / xã --</option>
                  {wardsList.map(w => (
                    <option key={w.code} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Số nhà, tên đường <span className="required">*</span></label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Nhập số nhà, tên đường"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={onCancel}>Hủy</button>
              <button className="btn-primary" onClick={handleAddressSelect}>
                Tiếp tục xác nhận trên bản đồ →
              </button>
            </div>
          </div>
        ) : (
          <div className="address-form-step2">
            <h2>Xác nhận vị trí trên bản đồ</h2>
            <p className="info-text">
              {street}, {ward}, {provincesList.find(p=>String(p.code)===String(province))?.name || province}
            </p>

            {mapLocation && (
              <div className="map-picker-wrapper">
                <MapPicker
                  value={mapLocation}
                  onChange={setMapLocation}
                  onConfirm={handleMapConfirm}
                />
              </div>
            )}

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setStep(1)}>← Quay lại</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
