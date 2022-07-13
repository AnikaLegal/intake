// @flow
import { http } from './http'

type NoEmail = {
  id: string,
  answers: Object,
}

export const noemail = {
  // Create a new submission of no email.
  create: async (answers: Object): Promise<NoEmail> => {
    const url = '/api/noemail/'
    return await http.post(url, { answers })
  },
}
