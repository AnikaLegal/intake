// @flow
import { http } from './http'
import type { Data, Tenancy, TenancyCreate } from 'types'

export const tenancy = {
  // Create a new tenancy for a client.
  create: async (tenancy: TenancyCreate): Promise<Tenancy> => {
    const url = '/api/tenancy/'
    return await http.post(url, tenancy)
  },
  // Update an existing tenancy
  update: async (tenancyId: string, update: Data): Promise<Tenancy> => {
    const url = `/api/tenancy/${tenancyId}/`
    return await http.patch(url, update)
  },
}
