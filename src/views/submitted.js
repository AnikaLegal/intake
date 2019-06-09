// @flow
import React from 'react'
import styled from 'styled-components'

import { Header, Page, Layout, Message } from 'components'

export const SubmittedView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Page>
        <Message>
          <h1>Your case has been submitted</h1>
          <p>
            Thank you for taking the time to complete the questionnaire. One of
            our friendly Anika team members will contact you as soon as possible
            to introduce themselves and to discuss how we can help you.
          </p>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
