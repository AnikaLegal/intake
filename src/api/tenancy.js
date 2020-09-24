// @flow
import { http } from './http'
import type { TenancyUpdate, Tenancy, TenancyCreate } from 'types'

export const tenancy = {
  // Create a new tenancy for a client.
  create: async (tenancy: TenancyCreate): Promise<Tenancy> => {
    const url = '/api/tenancy/'
    return await http.post(url, tenancy)
  },
  // Update an existing tenancy
  update: async (update: TenancyUpdate): Promise<Tenancy> => {
    const url = `/api/tenancy/${update.tenancyId}/`
    return await http.patch(url, update.updates)
  },
}
