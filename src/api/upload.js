// @flow
import camelize from 'camelize'

import { http } from './http'
import type { Upload } from 'types'

// Longest response body we keep on an UploadError, so a large error page
// doesn't bloat the Sentry event.
const MAX_BODY_LENGTH = 500

export class UploadError extends Error {
  status: number
  responseBody: string

  constructor(status: number, responseBody: string, message?: string) {
    super(message || `Upload failed with status ${status}`)
    this.name = 'UploadError'
    this.status = status
    this.responseBody = responseBody
  }
}

// Status for an upload that got no response we can read: the network dropped,
// or the browser hid a response that had no CORS headers.
export const NO_RESPONSE_STATUS = 0

export const upload = {
  // Upload a new file upload to a submission.
  create: async (file: File): Promise<Upload> => {
    const url = '/api/upload/'
    const form = new FormData()
    form.append('file', file)
    const request = { method: 'POST', body: form }
    let resp
    try {
      resp = await fetch(`${SERVER}${url}`, request)
    } catch (e) {
      // The browser's own message ("Failed to fetch", "Load failed") is all
      // we get here.
      throw new UploadError(
        NO_RESPONSE_STATUS,
        '',
        `Upload failed with no response (${e?.message || 'unknown'})`
      )
    }
    if (!resp.ok) {
      // Keep the response body so Sentry shows why the upload failed.
      let responseBody = ''
      try {
        responseBody = (await resp.text()).slice(0, MAX_BODY_LENGTH)
      } catch (e) {
        // The status alone is still worth reporting.
      }
      throw new UploadError(resp.status, responseBody)
    }
    const data = await resp.json()
    return camelize(data)
  },
}
