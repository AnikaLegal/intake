// @flow
import React, { useState } from 'react'

import { Header } from 'components'
import { Page, Layout, Message, Button } from 'features/generic'
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
            Anika is a registered charity that provides legal advice to members
            of the public. We believe that you will find our legal advice
            helpful for two key reasons:
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
            So you need something in your rental property to be fixed? In order
            for us to help you get it fixed, we need you to first complete our
            questionnaire.
          </p>
          <NamedLink to={VIEWS.HelpView}>
            <Button>Find out if we can help you</Button>
          </NamedLink>
        </Message>
      </Page>
    </Layout>
  </Layout>
)
