// @flow
import { http } from './http'
import type { Data, ImageUpload } from 'types'

const questions = {
  submit: (data: Data): Promise<any> => {
    const url = '/api/submission/'
    return http.post(url, { data })
  },
  upload: (image: File): Promise<ImageUpload> => {
    const url = '/api/images/'
    const form = new FormData()
    form.append('image', image)
    return fetch(`${SERVER}${url}`, {
      method: 'POST',
      body: form,
    }).then(r => r.json())
  },
}

export const api = {
  questions,
}
