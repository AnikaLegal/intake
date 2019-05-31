// @flow
import type { Action } from 'types'
export default {
  answer: (name: string, answer: any): Action => ({
    type: 'ANSWER_FORM',
    name,
    answer,
  }),
}
