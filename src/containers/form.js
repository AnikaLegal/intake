// @flow
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form } from 'components'
import { validate, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import type {
  View,
  Section,
  Data,
  Form as FormType,
  Redux,
  Validations,
} from 'types'

type Props = {
  idx: number,
  sections: Array<Section>,
  answers: Data,
  complete: boolean,
  setComplete: Function,
  setAnswer: Function,
}

export const _FormContainer = ({
  idx,
  answers,
  sections,
  setComplete,
  setAnswer,
}: Props) => {
  const [redirect, setRedirect] = useState<View | null>(null)
  const [isSubmitted, setSubmitted] = useState(false)
  if (redirect) {
    return <NamedRedirect to={VIEWS[redirect]} />
  }
  const forms: Array<FormType> = sections.map(s => s.forms).reduce(flattenArray)
  const form = forms[idx]

  const validation = getValidation(form, answers)
  const nextPage = getNextPage(idx, forms, answers)
  const backPage = getBackPage(idx, forms, answers)
  const isFinalForm = idx + 1 === forms.length

  const onNext = (e: SyntheticEvent<any>) => {
    const maybeRedirect = form.getRedirect ? form.getRedirect(answers) : null
    if (maybeRedirect) {
      setRedirect(maybeRedirect)
      return
    }
    setSubmitted(true)
    if (!validation.valid) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      setSubmitted(false)
      window.scrollTo(0, 0)
    }
  }

  return (
    <Form
      idx={idx}
      form={form}
      validation={validation}
      data={answers}
      nextPage={nextPage}
      backPage={backPage}
      onNext={onNext}
      onChange={k => v => setAnswer(k, v)}
      isFinalForm={isFinalForm}
      isSubmitted={isSubmitted}
    />
  )
}

const mapState = (state: Redux) => ({
  answers: state.form.answers,
})
const mapActions = dispatch => ({
  setAnswer: (...args) => dispatch(actions.form.answer(...args)),
})
export const FormContainer = connect(
  mapState,
  mapActions
)(_FormContainer)

const getValidation = (form: FormType, answers: Data): Validations => {
  const fieldRules = {}
  for (let field of form.fields) {
    if (field.fields) {
      for (let subfield of field.fields) {
        fieldRules[subfield.name] = [
          ...(form.rules[subfield.name] || []),
          ...subfield.rules,
        ]
      }
    } else {
      fieldRules[field.name] = [
        ...(form.rules[field.name] || []),
        ...field.rules,
      ]
    }
  }
  const rules = {
    ...form.rules,
    ...fieldRules,
  }
  return validate(rules)(answers)
}

const getNextPage = (
  idx: number,
  forms: Array<FormType>,
  answers: Data
): number | null => {
  if (idx + 1 >= forms.length) return null
  const nextForm = forms[idx + 1]
  if (nextForm.when && !nextForm.when(answers)) {
    return getNextPage(idx + 1, forms, answers)
  } else {
    return idx + 1
  }
}

const getBackPage = (
  idx: number,
  forms: Array<FormType>,
  answers: Data
): number | null => {
  if (idx - 1 < 0) return null
  const prevForm = forms[idx - 1]
  if (prevForm.when && !prevForm.when(answers)) {
    return getBackPage(idx - 1, forms, answers)
  } else {
    return idx - 1
  }
}
