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

const BASE = 'https://api.vnappmob.com/api/v2/province'

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
  const url = `${BASE}/`
  const data = await fetchJson(url)
  const list = data?.results ?? []
  // Keep field names compatible with your old code: { name, code, codename }
  // VNAppMob doesn't provide codename => set null.
  return list.map(p => ({
    name: p.province_name,
    code: p.province_id,
    codename: null,
    type: p.province_type
  }))
}

// Get districts for a province by province_id.
// Returns array of { name, code, codename }
export async function getDistricts(provinceId) {
  const url = `${BASE}/district/${provinceId}`
  const data = await fetchJson(url)
  const list = data?.results ?? []
  return list.map(d => ({
    name: d.district_name,
    code: d.district_id,
    codename: null
  }))
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
  const districtId = (maybeDistrictId ?? provinceOrDistrictId)
  const url = `${BASE}/ward/${districtId}`
  const data = await fetchJson(url)
  const list = data?.results ?? []
  return list.map(w => ({
    name: w.ward_name,
    code: w.ward_id,
    codename: null
  }))
}

// Convenience: find province by name (case-insensitive, ignores "Tỉnh/Thành phố" prefix).
export async function findProvinceByName(name) {
  const list = await getProvinces()
  const needle = normalizeName(name)
  return list.find(p => normalizeName(p.name) === needle)
}

// Example usage in React:
// const provinces = await getProvinces()
// const districts = await getDistricts(provinceId)
// const wards = await getWards(districtId)
