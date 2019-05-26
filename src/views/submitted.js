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
          <p>We'll talk to you soon.</p>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
