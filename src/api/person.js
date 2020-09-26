// @flow
import { http } from './http'
import type { Person, PersonCreate, PersonUpdate } from 'types'

export const person = {
  // Create a new person.
  create: async (person: PersonCreate): Promise<Person> => {
    const url = '/api/person/'
    return await http.post(url, person)
  },
  // Update an existing tenancy
  update: async (update: PersonUpdate): Promise<Person> => {
    const url = `/api/person/${update.personId}/`
    return await http.patch(url, update.updates)
  },
}
