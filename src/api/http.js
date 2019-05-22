// @flow
import type { Data } from 'types'

// Add server to URL if required
const url = (path: string) =>
  path.includes('http') ? path : `${SERVER}${path}`

// HTTP helper functions.
const http = {
  // POST a JSON to URL (create new resource)
  post: (path: string, data: Data): Promise<Response> =>
    fetch(url(path), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    }),
  // PATCH a JSON to URL (partially update resource)
  patch: (path: string, data: Data): Promise<Response> =>
    fetch(url(path), {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    }),
  // PUT a JSON to URL (fully update resource)
  put: (path: string, data: Data): Promise<Response> =>
    fetch(url(path), {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'X-CSRFToken': '',
        'Content-Type': 'application/json',
      },
    }),
  // DELETE a URL (delete resource)
  delete: (path: string): Promise<Response> =>
    fetch(url(path), {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-CSRFToken': '' },
    }),
  // GET a URL (read resource)
  get: (path: string): Promise<Response> =>
    fetch(url(path), {
      credentials: 'include',
    }),
}
