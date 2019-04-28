// Read querystring parameters from URL
// Returns an object.
const getQueryParams = () => parseQueryString(window.location.search)

// Reads provided QS params
const parseQueryString = qs =>
  (qs.startsWith('?') ? qs.slice(1) : qs)
    .split('&')
    .filter(param => param)
    .map(paramString => paramString.split('='))
    .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {})

// Builds a querystring, including the ?, from obj params.
// Returns a string.
const buildQueryString = params => {
  const qs = Object.entries(params)
    .map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)])
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return `?${qs}`
}

export { getQueryParams, buildQueryString, parseQueryString }
