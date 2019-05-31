// @flow
import React from 'react'
import { Button } from 'antd'

import { Header, Page, Layout, Message } from 'components'
import { NamedLink, VIEWS } from 'routes'

export const HomeView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Page>
        <Message>
          <h1>Welcome to Anika</h1>

          <p>
            We are a free legal service operated by university students and
            lawyers who wish to make justice accessible for everyone. You won’t
            need to pay a cent for our services.
          </p>
          <p>
            We are sorry to hear that you have had difficulty getting your
            landlord to repair a defect at your rental property. We will do our
            best to help you get this resolved as soon as possible.
          </p>
          <p>
            So that we can provide you with the most appropriate assistance, we
            will ask you a few questions about the nature of the defect at your
            rental property and the communications between you and your landlord
            (or your landlord’s agent). Don’t worry if you answer “no” to
            anything as there are no wrong answers.
          </p>
          <p>
            Once you have completed the questionnaire, one of our friendly Anika
            team members will contact you to introduce themselves and to collect
            any further information that we need to assist you.
          </p>
          <NamedLink to={VIEWS.FormView} params={{ formId: '0' }}>
            <Button type="primary">Start</Button>
          </NamedLink>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
