// @flow
import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form } from 'components'
import { NamedRedirect, VIEWS } from 'routes'
import type { Section, Data, Redux } from 'types'

type Props = {
  sections: Array<Section>,
  answers: Data,
  current: number,
  complete: boolean,
  setProgress: Function,
  setComplete: Function,
  setAnswer: Function,
}

export const _FormContainer = ({
  current,
  complete,
  answers,
  sections,
  setProgress,
  setComplete,
  setAnswer,
}: Props) => {
  if (complete) {
    return <NamedRedirect to={VIEWS.ReviewView} />
  }
  const forms = sections
    .map(s => s.forms)
    .reduce((arr, fs) => [...arr, ...fs], [])
  const onNext = idx => () => {
    if (idx + 1 >= forms.length) return
    const nextForm = forms[idx + 1]
    if (nextForm.when && !nextForm.when(answers)) {
      onNext(idx + 1)()
    } else {
      setProgress(idx + 1)
    }
  }
  const onBack = idx => () => {
    if (idx - 1 < 0) return
    const prevForm = forms[idx - 1]
    if (prevForm.when && !prevForm.when(answers)) {
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
      form={forms[current]}
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

const mapState = (state: Redux) => ({
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
