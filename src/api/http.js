// @flow
import camelize from 'camelize'
import snakeize from 'snakeize'

import { logException } from 'utils'
import type { Data } from 'types'

// Add server to URL if required
const url = (path: string) =>
  path.includes('http') ? path : `${SERVER}${path}`

// HTTP helper functions.
export const http = {
  // POST a JSON to URL (create new resource)
  post: async (path: string, data: Data): Promise<Data> => {
    const resp = await fetch(url(path), {
      method: 'POST',
      credentials: 'include',
      body: parseJsonBody(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(resp)
  },
  // PATCH a JSON to URL (partially update resource)
  patch: async (path: string, data: Data): Promise<Data> => {
    const resp = await fetch(url(path), {
      method: 'PATCH',
      credentials: 'include',
      body: parseJsonBody(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(resp)
  },
  // PUT a JSON to URL (fully update resource)
  put: async (path: string, data: Data): Promise<Data> => {
    const resp = await fetch(url(path), {
      method: 'PUT',
      credentials: 'include',
      body: parseJsonBody(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(resp)
  },
  // DELETE a URL (delete resource)
  delete: async (path: string): Promise<Data> => {
    const resp = await fetch(url(path), {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-CSRFToken': '' },
    })
    return handleResponse(resp)
  },
  // GET a URL (read resource)
  get: async (path: string): Promise<Data> => {
    const resp = await fetch(url(path), { credentials: 'include' })
    return handleResponse(resp)
  },
}

const parseJsonBody = (data: Data): string => JSON.stringify(snakeize(data))

const handleResponse = async (resp: Response): Promise<Data> => {
  if (!resp.ok) {
    // The HTTP request failed.
    let error
    try {
      // Try parse the response data anyway.
      const data = await resp.json()
      error = { resp, data }
    } catch {
      // Couldn't parse response, just throw the request.
      error = { resp }
    }
    logException(error)
    throw error
  }
  if (resp.status === 204) {
    // Django DELETE returns no content,
    // So we shouldn't try parse the response data.
    return {}
  }
  try {
    // Try to parse the response data.
    const data = await resp.json()
    return camelize(data)
  } catch (error) {
    // Parsing the response failed.
    logException(error)
    throw error
  }
}
