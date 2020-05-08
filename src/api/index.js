// @flow
import { http } from './http'
import Cookies from 'universal-cookie'

import type {
  Data,
  DocumentUpload,
  ImageUpload,
  Submission,
  Section,
  Topic,
} from 'types'

const cookies = new Cookies()

const questions = {
  submission: {
    // Create a new submission.
    create: (questions: Array<Section>, topic: Topic): Promise<Submission> => {
      const url = '/api/submission/'
      const data = {
        topic: topic.toUpperCase(),
        answers: [],
        questions,
      }
      return http.post(url, data).then(r => r.json())
    },
    // Retrieve an existing submission.
    get: (id: string): Promise<Submission> => {
      const url = `/api/submission/${id}/`
      return http.get(url).then(r => r.json())
    },
    // Update an existing submission's data.
    update: (
      id: string,
      answers: Array<{
        name: string,
        answer: mixed,
      }>
    ): Promise<Submission> => {
      const url = `/api/submission/${id}/`
      return http.patch(url, { answers }).then(r => r.json())
    },
    // Submit a submission.
    submit: (id: string): Promise<Submission> => {
      const url = `/api/submission/${id}/`
      return http.patch(url, { complete: true }).then(r => r.json())
    },
  },
}
const image = {
  create: (image: File): Promise<ImageUpload> => {
    const url = '/api/images/'
    const form = new FormData()
    form.append('image', image)
    return fetch(`${SERVER}${url}`, {
      method: 'POST',
      body: form,
    }).then(r => {
      // Handle case where user tries to upload corrupt image,
      // or renames their PDF to mydoc.png and tries to upload that.
      if (r.status == 400) throw 400
      return r.json()
    })
  },
}
const document = {
  create: (file: File): Promise<DocumentUpload> => {
    const url = '/api/files/'
    const form = new FormData()
    form.append('file', file)
    return fetch(`${SERVER}${url}`, {
      method: 'POST',
      body: form,
    }).then(r => {
      // Handle case where user tries to upload bad file (?)
      if (r.status == 400) throw 400
      return r.json()
    })
  },
}

export const api = {
  questions,
  image,
  document,
}
