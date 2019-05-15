// @flow
import type { Action } from 'types'
export default {
  progress: (idx: number): Action => ({ type: 'PROGRESS_FORM', idx }),
  answer: (name: string, answer: any): Action => ({
    type: 'ANSWER_FORM',
    name,
    answer,
  }),
  complete: (): Action => ({ type: 'COMPLETE_FORM', idx: 1 }),
}
