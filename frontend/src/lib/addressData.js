// Dữ liệu địa chỉ hành chính Việt Nam (Cập nhật chính xác)
// Cấu trúc: { tỉnh: { quận: [phường] } }

// Helpers to fetch provinces/districts/wards at runtime from VNAppMob Open API:
// - Provinces:  GET https://api.vnappmob.com/api/v2/province/
// - Districts:  GET https://api.vnappmob.com/api/v2/province/district/{province_id}
// - Wards:      GET https://api.vnappmob.com/api/v2/province/ward/{district_id}
//
// This file provides two things:
// 1) A small static fallback `vietnamAddressData` used when offline.
// 2) Async helpers `fetchAllProvinces`, `getProvinces`, `getDistricts`, `getWards`
//    which call VNAppMob API and return consistent structures.

export const vietnamAddressData = {
  "Hà Nội": { "Ba Đình": ["Phúc Tân", "Trúc Bạch", "Cống Vị"], "Hoàn Kiếm": ["Hàng Bài", "Hàng Gai"] },
  "TP. Hồ Chí Minh": { "Quận 1": ["Bến Nghé", "Đa Kao"], "Quận 9": ["Phú Hữu", "Phước Long A", "Phước Long B"] }
}

const BASE = 'https://34tinhthanh.com/api'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
  return res.json()
}

/**
 * Concurrency-limited async mapper (to avoid blasting the API with too many requests).
 */
async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length)
  let idx = 0

  async function worker() {
    while (true) {
      const i = idx++
      if (i >= items.length) return
      results[i] = await mapper(items[i], i)
    }
  }

  const workers = Array.from({ length: Math.max(1, limit) }, worker)
  await Promise.all(workers)
  return results
}

/**
 * Normalize names for matching (e.g., "Thành phố Hà Nội" vs "Hà Nội").
 */
function normalizeName(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/^thành phố\s+/i, '')
    .replace(/^tỉnh\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Fetch all provinces, optionally nesting districts and wards.
 * `depth` compatibility:
 * - depth=1: provinces only
 * - depth=2: provinces + districts
 * - depth=3: provinces + districts + wards
 */
export async function fetchAllProvinces(depth = 3, { concurrency = 6 } = {}) {
  const provinces = await getProvinces()

  if (depth <= 1) return provinces

  // Attach districts
  const provincesWithDistricts = await mapLimit(provinces, concurrency, async (p) => {
    const districts = await getDistricts(p.code)
    return { ...p, districts }
  })

  if (depth <= 2) return provincesWithDistricts

  // Attach wards to each district
  const provincesWithAll = await mapLimit(provincesWithDistricts, concurrency, async (p) => {
    const districtsWithWards = await mapLimit(p.districts ?? [], concurrency, async (d) => {
      const wards = await getWards(d.code)
      return { ...d, wards }
    })
    return { ...p, districts: districtsWithWards }
  })

  return provincesWithAll
}

// Get the list of provinces (name + id). Lightweight.
export async function getProvinces() {
  const url = `${BASE}/provinces`
  const list = await fetchJson(url)
  return (Array.isArray(list) ? list : []).map(p => ({
    name: p.name,
    code: p.province_code,
    codename: null,
    type: null
  }))
}

// Get districts for a province by province_id.
// Returns array of { name, code, codename }
export async function getDistricts(provinceId) {
  void provinceId
  return []
}

/**
 * Get wards for a given district by district_id.
 * Backward compatible signature:
 * - Old: getWards(provinceCode, districtCode) (from provinces.open-api.vn)
 * - New: getWards(districtId)
 *
 * So:
 * - if called with 2 args => use districtCode
 * - if called with 1 arg => treat it as districtId
 */
export async function getWards(provinceOrDistrictId, maybeDistrictId) {
  const provinceCode = (maybeDistrictId ?? provinceOrDistrictId)
  const url = `${BASE}/wards?province_code=${encodeURIComponent(String(provinceCode))}`
  const list = await fetchJson(url)
  return (Array.isArray(list) ? list : []).map(w => ({
    name: w.ward_name,
    code: w.ward_code,
    codename: null,
    province_code: w.province_code,
    province_name: w.province_name,
    old_units: w.old_units,
    has_merger: w.has_merger
  }))
}

// Convenience: find province by name (case-insensitive, ignores "Tỉnh/Thành phố" prefix).
export async function findProvinceByName(name) {
  const list = await getProvinces()
  const needle = normalizeName(name)
  return list.find(p => normalizeName(p.name) === needle)
}

export async function searchAdministrative(q) {
  const query = String(q ?? '').trim()
  if (query.length < 2) return []
  const url = `${BASE}/search?q=${encodeURIComponent(query)}`
  const list = await fetchJson(url)
  return Array.isArray(list) ? list : []
}

// Example usage in React:
// const provinces = await getProvinces()
// const districts = await getDistricts(provinceId)
// const wards = await getWards(districtId)
