// @flow
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Spin } from 'antd'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form, Header, Page, Layout } from 'components'
import { logError, validate, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import { Sidebar } from 'containers'
import { SECTIONS } from 'questions'
import type { View, Form as FormType, Redux, FormState } from 'types'

type Props = {
  submissionId: string,
}

export const FormContainer = ({ submissionId }: Props) => {
  // Setup redirect to out-of-form pages.
  const [redirect, setRedirect] = useState<View | null>(null)
  // Hook up to Redux store.
  const dispatch = useDispatch()
  const setAnswer = k => v => dispatch(actions.form.answer(k, v))
  const loadSubmission = () => dispatch(actions.form.load(submissionId))
  const onPrev = () => dispatch(actions.form.prev())
  const formState: FormState = useSelector(
    ({ form }: Redux) => form,
    shallowEqual
  )
  // Load submission if it is not already loaded.
  useEffect(() => {
    if (!formState.id) loadSubmission().catch(logError)
  }, [])
  // Redirect users to out-of-form message pages.
  if (formState.isComplete) {
    return <NamedRedirect to={VIEWS.SubmittedView} />
  }
  if (redirect) {
    return <NamedRedirect to={VIEWS[redirect]} />
  }
  if (formState.isLoading) {
    return (
      <Layout vertical>
        <Page>
          <Spin tip="Loading..." />
        </Page>
      </Layout>
    )
  }

  const forms: Array<FormType> = SECTIONS.map(s => s.forms).reduce(flattenArray)
  const form = forms[formState.page]
  // Redirect if necessary, otherwise request next page.
  // TODO - move this into some Redux middleware.
  const onNext = (e: SyntheticEvent<any>) => {
    const maybeRedirect = form.getRedirect
      ? form.getRedirect(formState.answers)
      : null
    if (maybeRedirect) {
      setRedirect(maybeRedirect)
    } else {
      dispatch(actions.form.next()).catch(logError)
    }
  }
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Sidebar current={formState.page} sections={SECTIONS} />
        <Page>
          <Form
            submissionId={submissionId}
            form={form}
            validation={formState.validation}
            hasNext={formState.hasNext}
            hasPrev={formState.hasPrev}
            isSubmitted={formState.isSubmitted}
            onNext={onNext}
            onPrev={onPrev}
            onChange={setAnswer}
            data={formState.answers}
          />
        </Page>
      </Layout>
    </Layout>
  )
}
