// @flow
import type { Redux } from 'types'

export default {
  PROGRESS_FORM: (state: Redux, { idx }: { idx: number }): Redux => ({
    ...state,
    form: {
      ...state.form,
      current: idx,
    },
  }),
  COMPLETE_FORM: (state: Redux): Redux => ({
    ...state,
    form: {
      ...state.form,
      complete: true,
    },
  }),
  ANSWER_FORM: (
    state: Redux,
    { name, answer }: { name: string, answer: any }
  ): Redux => ({
    ...state,
    form: {
      ...state.form,
      answers: {
        ...state.form.answers,
        [name]: answer,
      },
    },
  }),
}
