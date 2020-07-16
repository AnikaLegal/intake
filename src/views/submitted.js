// @flow
import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  Header,
  Page,
  Layout,
  Message,
  Button,
  Warning,
} from 'features/generic'
import { useParams } from 'react-router-dom'
import { logError } from 'utils'
import { LINKS } from 'consts'
import { NamedRedirect, VIEWS } from 'routes'
import type { State, FormState, Form, Dispatch } from 'types'

export const SubmittedView = () => {
  const dispatch = useDispatch()
  const { submissionId } = useParams()
  const formState: FormState = useSelector(
    ({ form }: State) => form,
    shallowEqual
  )
  useEffect(() => {
    if (!formState.id) loadSubmission()
  }, [])
  const loadSubmission = () =>
    dispatch.form.loadSubmission(submissionId).catch(logError)

  if (!submissionId) return <NamedRedirect to={VIEWS.NotFoundView} />
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Page>
          <Message>
            <h1>Your case has been submitted</h1>
            <p>
              One of our staff will contact you in the{' '}
              <strong>next few days</strong> to discuss how we can help you. If
              you have any questions in the meantime, you can contact us at{' '}
              contact@anikalegal.com
            </p>
            <p>
              To help our paralegals get a better understanding of your
              situation we have a few final questions for you. On average it
              takes less than two minutes.
            </p>
            <p>
              {!formState.id && <Button>Take the survey</Button>}
              {formState.id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={LINKS.PRE_IMPACT_SURVEY[formState.topic]}
                >
                  <Button>Take the survey</Button>
                </a>
              )}
            </p>
            <Warning>
              We can only assist you if you meet our{' '}
              <a href={LINKS.ELIGIBILIY_PAGE}>eligibility criteria</a>.
            </Warning>
          </Message>
        </Page>
      </Layout>
    </Layout>
  )
}
