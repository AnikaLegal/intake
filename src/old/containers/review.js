// @flow
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { events } from 'analytics'
import { Sidebar } from 'containers'
import { logError, flattenArray, entries } from 'utils'
import { getQuestions } from 'questions'
import {
  Header,
  Page,
  Layout,
  LoadingSpinner,
  Button,
  Message,
  Divider,
} from 'features/generic'
import { NamedRedirect, NamedLink, VIEWS } from 'routes'
import type {
  State,
  Data,
  Section,
  FormState,
  Field,
  Form,
  Dispatch,
} from 'types'

type Props = {
  submissionId: string,
}

export const ReviewContainer = ({ submissionId }: Props) => {
  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch.form.submitSubmission(submissionId).catch(logError)
    events.onFinishIntake(submissionId)
  }
  const loadSubmission = () =>
    dispatch.form.loadSubmission(submissionId).catch(logError)

  const formState: FormState = useSelector(
    ({ form }: State) => form,
    shallowEqual
  )
  const questions = getQuestions(formState.topic)
  // Load submission if it is not already loaded.
  useEffect(() => {
    if (!formState.id) loadSubmission()
  }, [])
  if (formState.isLoading) {
    return (
      <Layout vertical>
        <Header />
        <Layout>
          <Sidebar current={999} sections={questions} />
          <Page>
            <Layout vertical>
              <LoadingSpinner />
            </Layout>
          </Page>
        </Layout>
      </Layout>
    )
  }
  if (formState.isComplete) {
    return (
      <NamedRedirect
        to={VIEWS.SubmittedView}
        params={{
          submissionId: formState.id,
        }}
      />
    )
  }
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Sidebar current={999} sections={questions} />
        <Page>
          <Message>
            <h1>Review your answers</h1>
            {questions.map(section => (
              <SectionReview
                key={`section-${section.name}`}
                section={section}
                answers={formState.answers}
              />
            ))}
            <Divider />
            <NamedLink to={VIEWS.FormView} params={{ submissionId }}>
              <Button secondary margin="0 0.5rem 0 0">
                Back
              </Button>
            </NamedLink>
            <Button onClick={onSubmit}>Submit</Button>
          </Message>
        </Page>
      </Layout>
    </Layout>
  )
}

const SectionReview = ({
  section,
  answers,
}: {
  section: Section,
  answers: Data,
}) => (
  <SectionEl>
    <SectionHeader>
      <h4>{section.name}</h4>
    </SectionHeader>
    {section.forms.map(form => (
      <FormReview key={`form-${form.name}`} form={form} answers={answers} />
    ))}
  </SectionEl>
)

const SectionEl = styled.div`
  border: solid 3px #008897;
  border-radius: 5px;
  margin-bottom: 1rem;
`

const SectionHeader = styled.div`
  background-color: #008897;
  padding: 0.5rem 1rem;
  h4 {
    color: white;
    margin: 0;
  }
`

const FormReview = ({ form, answers }: { form: Form, answers: Data }) => (
  <FormEl key={form.name}>
    {form.fields
      .reduce((a, f) => (f.fields ? [...a, ...f.fields] : [...a, f]), [])
      .filter(field => field.type !== 'FILE')
      .filter(field => answers[field.name])
      .map(field => (
        <FieldReview
          key={`field-${field.name}`}
          field={field}
          answers={answers}
        />
      ))}
  </FormEl>
)

const FormEl = styled.div`
  padding: 0 1rem;
`

const FieldReview = ({ field, answers }: { field: Field, answers: Data }) => {
  const answer = answers[field.name]
  const answerText = Array.isArray(answer) ? answer.join(', ') : answer
  return (
    <p>
      <strong>{field.displayName}: </strong>
      {answerText}
    </p>
  )
}
