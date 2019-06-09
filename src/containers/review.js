// @flow
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Button, Card, Spin } from 'antd'
import styled from 'styled-components'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Header, Page, Layout } from 'components'
import { Sidebar } from 'containers'
import { logError, flattenArray, entries } from 'utils'
import { SECTIONS } from 'questions'
import { NamedRedirect, NamedLink, VIEWS } from 'routes'
import type { Redux, Data, Section, FormState, Field } from 'types'

type Props = {
  submissionId: string,
}

export const ReviewContainer = ({ submissionId }: Props) => {
  const dispatch = useDispatch()
  const onSubmit = () =>
    dispatch(actions.form.submit(submissionId)).catch(logError)
  const loadSubmission = () =>
    dispatch(actions.form.load(submissionId)).catch(logError)

  const formState: FormState = useSelector(
    ({ form }: Redux) => form,
    shallowEqual
  )
  // Load submission if it is not already loaded.
  useEffect(() => {
    if (!formState.id) loadSubmission()
  }, [])
  if (formState.isLoading) {
    return (
      <Layout vertical>
        <Header />
        <Layout>
          <Sidebar current={999} sections={SECTIONS} />
          <Page>
            <Layout vertical>
              <Spin tip="Loading..." />
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
        <Sidebar current={999} sections={SECTIONS} />
        <Page>
          <div>
            <h1>Review your answers</h1>
            {SECTIONS.map(section => (
              <Card
                key={section.name}
                title={section.name}
                style={{ marginBottom: 16 }}
              >
                {section.forms.map(form => (
                  <Card
                    key={form.name}
                    type="inner"
                    title={form.prompt}
                    style={{ marginBottom: 16 }}
                    headStyle={{
                      color: '#007682',
                      opacity: '0.8',
                    }}
                  >
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
                  </Card>
                ))}
              </Card>
            ))}
            <NamedLink to={VIEWS.FormView} params={{ submissionId }}>
              <Button style={{ marginRight: 8 }}>Back</Button>
            </NamedLink>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Page>
      </Layout>
    </Layout>
  )
}

const FieldReview = ({ field, answers }: { field: Field, answers: Data }) => (
  <FieldReviewEl>
    <Prompt>{field.prompt}</Prompt>
    {answers[field.name]}
  </FieldReviewEl>
)

const FieldReviewEl = styled.div`
  margin-bottom: 1rem;
`

const Prompt = styled.div`
  font-weight: bold;
`
