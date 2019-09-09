// @flow
import React, { useState } from 'react'

import { Header, Page, Layout, Message, Button } from 'features/generic'
import { actions } from 'state'
import { validate, flattenArray } from 'utils'
import { NamedLink, NamedRedirect, VIEWS } from 'routes'
import { SECTIONS } from 'questions'

export const HomeContainer = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Page>
        <Message>
          <h1>Welcome to Anika</h1>
          <p>
            Anika is an online platform that is used to provide legal advice to
            members of the public. We believe that you will find Anika helpful
            for two key reasons:
          </p>
          <ul>
            <li>It's all online, so you don’t need to leave your home.</li>
            <li>It's 100% free: you don’t need to pay us anything.</li>
          </ul>
          <h3>Here's how it works</h3>
          <p>
            So you need something in your rental property to be fixed? In order
            for us to determine whether we can help you, we need to ask you a
            few questions.
          </p>
          <NamedLink to={VIEWS.HelpView}>
            <Button>Find out if we can help you</Button>
          </NamedLink>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
