// @flow
import { http } from './http'
import type { ClientUpdate, Client, ClientCreate } from 'types'

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
  update: async (update: ClientUpdate): Promise<Client> => {
    const url = `/api/client/${update.clientId}/`
    return await http.patch(url, update.updates)
  },
}
