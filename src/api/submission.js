// @flow
import { http } from './http'

type Submission = {
  id: string,
  answers: Object,
}

export const submission = {
  // Create a new submission.
  get: async (id: string): Promise<Submission> => {
    const url = `/api/submission/${id}/`
    return await http.get(url)
  },
  // Create a new submission.
  create: async (answers: Object): Promise<Submission> => {
    const url = '/api/submission/'
    return await http.post(url, { answers })
  }, // Create a new submission.
  update: async (id: string, answers: Object): Promise<Submission> => {
    const url = `/api/submission/${id}/`
    return await http.patch(url, { answers })
  }, // Create a new submission.
  submit: async (id: string): Promise<void> => {
    const url = `/api/submission/${id}/submit/`
    return await http.post(url, {})
  },
}
