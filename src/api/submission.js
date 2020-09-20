// @flow
import { http } from './http'
import type { Submission, SubmissionCreate, Data } from 'types'

export const submission = {
  // Create a new submission.
  create: async (sub: SubmissionCreate): Promise<Submission> => {
    const url = '/api/submission/'
    return await http.post(url, sub)
  },
  // Update an existing submission
  update: async (subId: string, update: Data): Promise<Submission> => {
    const url = `/api/submission/${subId}/`
    return await http.patch(url, update)
  },
}
