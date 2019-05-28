// @flow
import { http } from './http'
import type { Data, ImageUpload, Submission } from 'types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const questions = {
  submission: {
    create: (data: Data): Promise<Submission> => {
      const url = '/api/submission/'
      return http.post(url, { data }).then(r => r.json())
    },
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
