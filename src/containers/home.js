// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

import { Header, Page, Layout, Message } from 'components'
import { actions } from 'state'
import { validate, flattenArray } from 'utils'
import { NamedRedirect, VIEWS } from 'routes'
import { SECTIONS } from 'questions'

export const HomeContainer = () => {
  const dispatch = useDispatch()
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
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
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Page>
          <Message>
            <h1>Welcome to Anika</h1>
            <p>
              Anika is a registered charity that provides legal advice to
              members of the public. Our legal advice helpful for two key
              reasons:
            </p>
            <ul>
              <li>
                It's all online, so you don’t need to leave the comfort of your
                home.
              </li>
              <li>It's 100% free: you don’t need to pay us anything.</li>
            </ul>
            <h2>Here's how it works</h2>
            <p>
              So you need something in your rental property to be fixed? In
              order for us to help you get it fixed, we need you to first
              complete our questionnaire.
            </p>
            <Button disabled={isLoading} onClick={onCreate} type="primary">
              Get started
            </Button>
          </Message>
        </Page>
      </Layout>
    </Layout>
  )
}
