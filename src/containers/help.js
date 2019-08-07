// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { actions } from 'state'
import { validate, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import { SECTIONS } from 'questions'
import {
  Page,
  Layout,
  Message,
  Field,
  DropdownInput,
  ButtonChoiceInput,
  Button,
  Header,
} from 'features/generic'

const VALID_STATE = 'Victoria'
const STATES = [
  'Victoria',
  'New South Wales',
  'Tasmania',
  'Australian Capital Territory',
  'South Australia',
  'Queensland',
  'Western Australia',
  'Northern Territory',
  'Other territory in Australia',
  'Outside Australia',
]

export const HelpContainer = () => {
  const dispatch = useDispatch()
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [state, setState] = useState<string>('')
  const [isRenter, setIsRenter] = useState<boolean | null>(null)
  const [needsRepairs, setNeedsRepairs] = useState<boolean | null>(null)
  // Create a new form submission.
  const onCreate = () => {
    setLoading(true)
    dispatch(actions.form.create(SECTIONS)).then(sub => setSubmissionId(sub.id))
  }
  if (submissionId) {
    return (
      <NamedRedirect
        to={VIEWS.FormView}
        params={{
          submissionId,
          pageNumber: 0,
        }}
      />
    )
  }
  const isValid =
    state === VALID_STATE && isRenter === true && needsRepairs === true
  const isInvalid =
    !isValid && state && isRenter !== null && needsRepairs !== null
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Page>
          <Message>
            <h1>Can we help you?</h1>
            <p>
              We would ideally like to help everyone, but at this stage we only
              have the resources to provide legal advice to Victorian tenants.
              Answer the three questions below to find out if we can help you.
            </p>
            <Field prompt="Where do you live?" errors={[]} required>
              <DropdownInput
                onChange={setState}
                value={state}
                options={STATES.map(s => ({ label: s, value: s }))}
                placeholder="Select a state"
              />
            </Field>
            <Field
              prompt="Do rent your home or do you own your home?"
              errors={[]}
              required
            >
              <ButtonChoiceInput
                value={isRenter}
                onChange={setIsRenter}
                options={[
                  { label: 'Rent', value: true },
                  { label: 'Own', value: false },
                ]}
              />
            </Field>
            <Field
              prompt="Do you need your landlord to fix something in your home?"
              errors={[]}
              required
            >
              <ButtonChoiceInput
                value={needsRepairs}
                onChange={setNeedsRepairs}
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
              />
            </Field>

            {isValid && (
              <React.Fragment>
                <p>
                  Great. We are able to help you. In order for us to provide you
                  with the best advice, we need you to first complete our
                  questionnaire
                </p>
                <Button disabled={isLoading} onClick={onCreate}>
                  Get started
                </Button>
              </React.Fragment>
            )}
            {isInvalid && (
              <React.Fragment>
                <p>Thank you for taking the time to answer those questions.</p>
                <p>
                  Unfortunately, we do not currently have the resources to
                  provide the legal advice that you need. We wish you all the
                  best in resolving your problem.{' '}
                </p>
              </React.Fragment>
            )}
          </Message>
        </Page>
      </Layout>
    </Layout>
  )
}
