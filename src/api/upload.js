// @flow
import camelize from 'camelize'

import { http } from './http'
import type { Upload, UploadCreate } from 'types'

export const upload = {
  // Attach a new file upload to a submission.
  create: async (upload: UploadCreate): Promise<Upload> => {
    const url = '/api/upload/'
    const form = new FormData()
    form.append('file', upload.file)
    form.append('submission', upload.submission)
    const request = { method: 'POST', body: form }
    const resp = await fetch(`${SERVER}${url}`, request)
    // Handle case where user tries to upload corrupt image,
    // or renames their PDF to mydoc.png and tries to upload that.
    if (resp.status == 400) {
      throw 400
    }
    const data = await resp.json()
    return camelize(data)
  },
}
