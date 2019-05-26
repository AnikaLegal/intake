// @flow
import type { Data } from 'types'
import { http } from './http'

const questions = {
  submit: (data: Data): Promise<any> => {
    const url = '/api/submission/'
    return http.post(url, { data })
  },
}

export const api = {
  questions,
}
