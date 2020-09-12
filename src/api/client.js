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
    console.warn(`Sending... ${JSON.stringify(client)}`)
    await timeout(500)
    console.warn(`Submitted.`)
    return {
      id: '123456789',
      firstName: 'Matt',
      lastName: 'Segal',
      email: 'matt@anikalegal.com',
      submissions: [],
      isEligible: null,
    }
  },
  setEligibility: async (
    uuid: string,
    isEligible: boolean
  ): Promise<Client> => {
    const url = `/api/client/${uuid}`
    // const result = await http.post(url, client).then((r) => r.json())
    console.warn(`Sending... ${JSON.stringify({ uuid, isEligible })}`)
    await timeout(500)
    console.warn(`Submitted.`)
    return {
      id: '123456789',
      firstName: 'Matt',
      lastName: 'Segal',
      email: 'matt@anikalegal.com',
      submissions: [],
      isEligible,
    }
  },
}
