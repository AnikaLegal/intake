import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form } from 'components'
import { NamedRedirect, ROUTE_NAMES } from 'components/router'

export const _FormContainer = ({
  current,
  complete,
  answers,
  setProgress,
  setComplete,
  setAnswer,
  sections,
}) => {
  if (complete) {
    return <NamedRedirect to={ROUTE_NAMES.REVIEW} />
  }
  const forms = sections
    .map(s => s.forms)
    .reduce((arr, fs) => [...arr, ...fs], [])
  const onNext = idx => () => {
    if (idx + 1 >= forms.length) return
    if (forms[idx + 1].when && !forms[idx + 1].when(answers)) {
      onNext(idx + 1)()
    } else {
      setProgress(idx + 1)
    }
  }
  const onBack = idx => () => {
    if (idx - 1 < 0) return
    if (forms[idx - 1].when && !forms[idx - 1].when(answers)) {
      onBack(idx - 1)()
    } else {
      setProgress(idx - 1)
    }
  }
  const onChange = key => value => {
    setAnswer(key, value)
  }
  const hasNext = current + 1 < forms.length
  const hasBack = current - 1 >= 0
  const isComplete = current + 1 === forms.length
  return (
    <Form
      {...forms[current]}
      key={current}
      data={answers}
      hasNext={hasNext}
      hasBack={hasBack}
      onNext={onNext(current)}
      onBack={onBack(current)}
      onChange={onChange}
      isComplete={isComplete}
      onComplete={setComplete}
    />
  )
}

const mapState = state => ({
  current: state.form.current,
  answers: state.form.answers,
  complete: state.form.complete,
})
const mapActions = dispatch => ({
  setProgress: (...args) => dispatch(actions.form.progress(...args)),
  setComplete: (...args) => dispatch(actions.form.complete(...args)),
  setAnswer: (...args) => dispatch(actions.form.answer(...args)),
})
export const FormContainer = connect(
  mapState,
  mapActions
)(_FormContainer)
