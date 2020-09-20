// @flow
import { http } from './http'
import type { Person, PersonCreate } from 'types'

export const person = {
  // Create a new person.
  create: async (person: PersonCreate): Promise<Person> => {
    const url = '/api/person/'
    return await http.post(url, person)
  },
}
