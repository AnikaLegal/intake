// @flow
import { http } from './http'

import type { Data, Client } from 'types'
import { timeout } from 'utils'

type ClientCreate = {
  firstName: string,
  lastName: string,
  email: string,
}

export const client = {
  // Create a new client.
  create: async (client: ClientCreate): Promise<Client> => {
    const url = '/api/client/'
    // const result = await http.post(url, client).then((r) => r.json())
    console.warn(`Sending... ${Object.values(client).toString()}`)
    await timeout(500)
    console.warn(`Submitted ${Object.values(client).toString()}`)
    return {
      uuid: '123456789',
      firstName: 'Matt',
      lastName: 'Segal',
      email: 'matt@anikalegal.com',
      isEligible: null,
    }
  },
}
