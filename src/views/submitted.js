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
          <Warning>
            <h4>Christmas Closure</h4>
            <p>
              Just so you know, we'll be closing from{' '}
              <strong>21 December 2019</strong> to{' '}
              <strong>5 January 2020</strong>. When we're back in the office,
              we'll get on your case as soon as possible.
            </p>
            <p>
              If you have any questions in the meantime, you can email us at{' '}
              contact@anikalegal.com. We will be able to respond once we're back
              in the office.
            </p>
          </Warning>
        </Message>
      </Page>
    </Layout>
  </Layout>
)

/*
Replace with this after Christmas
<p>
  One of our staff will contact you in the next few days to discuss
  how we can help you.
</p>
<p>
  If you have any questions in the meantime, you can contact us at{' '}
  contact@anikalegal.com
</p>
*/
