// @flow
import { http } from './http'

import type { Data, Tenancy, Client } from 'types'
import { timeout } from 'utils'

export const tenancy = {
  // Create a new tenancy for a client.
  create: async (client: Client, address: string): Promise<Tenancy> => {
    const url = '/api/tenancy/'
    // const result = await http.post(url, client).then((r) => r.json())
    console.warn(`Sending... ${JSON.stringify({ client, address })}`)
    await timeout(500)
    console.warn(`Submitted.`)
    return {
      id: 1,
      address: '123 Fake St',
    }
  },
}
