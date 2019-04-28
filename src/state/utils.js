import camelize from 'camelize'

// Default schema for backend data
const DATA_DEFAULT = {
  loading: false, // Whether the data is loading from the backend
  lookup: {}, // Lookup table of the data, indexed by 'id'
  list: [], // List of all the data (exactly the same elements as lookup)
}

// Recursively convert snake_case to camelCase.
const parsePythonObject = obj => {
  if (Array.isArray(obj)) {
    return obj.map(parsePythonObject)
  } else if (typeof obj === 'object') {
    return camelize(obj)
  }
  return obj
}

const checkForError = (response, silentForbidden) => {
  return checkForBadRequest(response)
    .then(checkForForbidden(silentForbidden))
    .then(checkForServerError)
}

const checkForBadRequest = response =>
  new Promise((resolve, reject) => {
    if (response.status === 400) {
      // Bad request, try and get details
      logHTTPError(response, 'Bad request - invalid data')
      reject(response)
    } else {
      resolve(response)
    }
  })

const checkForForbidden = silentForbidden => response =>
  new Promise((resolve, reject) => {
    if (response.status === 401 || response.status === 403) {
      if (!silentForbidden) {
        logHTTPError(response, 'Forbidden')
      }
      reject(response)
    } else {
      resolve(response)
    }
  })

const checkForServerError = response =>
  new Promise((resolve, reject) => {
    if (response.status >= 400) {
      logHTTPError(response, 'Server side error')
      reject(response)
    } else {
      resolve(response)
    }
  })

const logHTTPError = (response, msg) => {
  console.error('HTTP error:', response)
  response.json().then(data => console.error('HTTP error data:', data))
}

// Handle response from a JSON HTTP API, returns a promise of a JS object.
const handleJSONResponse = (response, silentForbidden = false) =>
  checkForError(response, silentForbidden)
    .then(response => response.json())
    .then(parsePythonObject)

export { handleJSONResponse, DATA_DEFAULT }
