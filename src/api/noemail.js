// @flow
import { http } from './http'

type NoEmail = {
  id: string,
  name: string,
  phone_number: string,
}

export const noemail = {
  // Create a new submission of no email.
  create: async (name: string, phone_number: string): Promise<NoEmail> => {
    const url = '/api/noemail/'
    return await http.post(url, { name, phone_number })
  },
  // Submit a new submission of no email.
  submit: async (id: string): Promise<void> => {
    const url = `/api/noemail/${id}/submit/`
    return await http.post(url, {})
  },
}
