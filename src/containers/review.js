// @flow
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

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
import type { State, Data, Section, FormState, Field, Dispatch } from 'types'

type Props = {
  submissionId: string,
}

export const ReviewContainer = ({ submissionId }: Props) => {
  const dispatch = useDispatch()
  const onSubmit = () =>
    dispatch.form.submitSubmission(submissionId).catch(logError)
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
    return <NamedRedirect to={VIEWS.SubmittedView} />
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
              <div key={section.name}>
                {section.forms.map(form => (
                  <div key={form.name}>
                    {form.fields
                      .reduce(
                        (a, f) => (f.fields ? [...a, ...f.fields] : [...a, f]),
                        []
                      )
                      .filter(field => field.type !== 'FILE')
                      .filter(field => formState.answers[field.name])
                      .map(field => (
                        <FieldReview
                          key={field.name}
                          field={field}
                          answers={formState.answers}
                        />
                      ))}
                  </div>
                ))}
              </div>
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

const FieldReview = ({ field, answers }: { field: Field, answers: Data }) => {
  const answer = answers[field.name]
  const answerText = Array.isArray(answer) ? answer.join(', ') : answer
  return (
    <FieldReviewEl>
      <Prompt>{field.prompt}</Prompt>
      {answerText}
    </FieldReviewEl>
  )
}

const Prompt = styled.div`
  font-weight: bold;
  margin-bottom: 0.4rem;
`
const FieldReviewEl = styled.div`
  margin-bottom: 2rem;
`
