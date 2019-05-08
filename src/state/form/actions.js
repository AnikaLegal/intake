export default {
  progress: idx => ({ type: 'PROGRESS_FORM', idx }),
  answer: (name, answer) => ({ type: 'ANSWER_FORM', name, answer }),
  complete: () => ({ type: 'COMPLETE_FORM' }),
}
