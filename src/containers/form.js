// @flow
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { Page, Layout, LoadingSpinner, Header } from 'features/generic'
import { Form } from 'features/form'
import { logError, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import { Sidebar } from 'containers'
import { getQuestions } from 'questions'
import { TOPICS } from 'consts'

import type { Topic, View, Form as FormType, Dispatch, FormState } from 'types'

type Props = {
  submissionId: string,
}

export const FormContainer = ({ submissionId }: Props) => {
  // Setup redirect to out-of-form pages.
  const [redirect, setRedirect] = useState<View | null>(null)
  // Hook up to Redux store.
  const dispatch: Dispatch = useDispatch()
  const setAnswer = k => v => dispatch.form.setAnswer({ name: k, answer: v })
  const loadSubmission = () => dispatch.form.loadSubmission(submissionId)
  const onPrev = () => dispatch.form.setPrevPage()
  const formState: FormState = useSelector(({ form }) => form, shallowEqual)
  const sections = getQuestions(formState.topic)
  // Load submission if it is not already loaded.
  useEffect(() => {
    if (!formState.id) loadSubmission().catch(logError)
  }, [])
  // Redirect users to out-of-form message pages.
  if (formState.isComplete) {
    return <NamedRedirect to={VIEWS.SubmittedView} />
  }
  if (redirect) {
    return <NamedRedirect push to={VIEWS[redirect]} />
  }
  if (formState.isLoading) {
    return (
      <Layout vertical>
        <Header />
        <Layout>
          <Sidebar current={formState.page} sections={sections} />
          <Page>
            <LoadingSpinner />
          </Page>
        </Layout>
      </Layout>
    )
  }
  const forms: Array<FormType> = sections.map(s => s.forms).reduce(flattenArray)
  const form = forms[formState.page]
  // Redirect if necessary, otherwise request next page.
  // TODO - move this into some Redux middleware.
  const onNext = () => {
    const maybeRedirect = form.getRedirect
      ? form.getRedirect(formState.answers)
      : null
    if (maybeRedirect) {
      setRedirect(maybeRedirect)
    } else {
      dispatch.form.setNextPage().catch(logError)
    }
  }
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Sidebar current={formState.page} sections={sections} />
        <Page fadeIn>
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
