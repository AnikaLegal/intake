export default {
  PROGRESS_FORM: (state, { idx }) => ({
    ...state,
    form: {
      ...state.form,
      current: idx,
    },
  }),
  COMPLETE_FORM: state => ({
    ...state,
    form: {
      ...state.form,
      complete: true,
    },
  }),
  ANSWER_FORM: (state, { name, answer }) => ({
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
