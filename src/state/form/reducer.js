// @flow
import type { Redux } from 'types'

export default {
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
