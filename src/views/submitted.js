// @flow
import React from 'react'

import {
  Header,
  Page,
  Layout,
  Message,
  Button,
  Warning,
} from 'features/generic'

export const SubmittedView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Page>
        <Message>
          <h1>Your case has been submitted</h1>
          <p>Thank you for taking the time to tell us about your problem.</p>
          <p>
            One of our staff will contact you in the next few days to discuss
            how we can help you.
          </p>
          <p>
            If you have any questions in the meantime, you can contact us at{' '}
            contact@anikalegal.com
          </p>
          <Warning>
            We can only assist you if you meet our{' '}
            <a href="https://www.anikalegal.com/eligibility-criteria">
              eligibility criteria
            </a>
            .
          </Warning>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
