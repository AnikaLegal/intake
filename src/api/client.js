// @flow
import { http } from './http'
import type { Data, Client, ClientCreate } from 'types'

export const client = {
  // Create a new client.
  create: async (client: ClientCreate): Promise<Client> => {
    const url = '/api/client/'
    return await http.post(url, client)
  },
  // Get a client
  get: async (clientId: string): Promise<Client> => {
    const url = `/api/client/${clientId}/`
    return await http.get(url)
  },
  // Update data on a client.
  update: async (clientId: string, update: Data): Promise<Client> => {
    const url = `/api/client/${clientId}/`
    return await http.patch(url, update)
  },
}
