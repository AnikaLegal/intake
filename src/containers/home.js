// @flow
import React, { useState } from 'react'

import { TOPICS } from 'consts'
import { Header, Page, Layout, Message, Button } from 'features/generic'
import { validate, flattenArray } from 'utils'
import { NamedLink, NamedRedirect, VIEWS } from 'routes'

import type { Topic } from 'types'

type Props = { topic: Topic }

export const HomeContainer = ({ topic }: Props) => {
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Page>
          <Message>
            <h1>Welcome to Anika</h1>
            <p>
              Anika is an online platform that is used to provide legal advice
              to members of the public. We believe that you will find Anika
              helpful for three important reasons:
            </p>
            <ul>
              <li>
                <strong>Personalised:</strong> Our legal assistance will be
                specifically tailored to your circumstances.
              </li>
              <li>
                <strong>Easy to access:</strong> Our materials are easy to
                understand and can be accessed online.
              </li>
              <li>
                <strong>Free of cost:</strong> Our legal services are 100% free!
              </li>
            </ul>
            <h3>Here's how it works</h3>
            <p>
              {topic == TOPICS.REPAIRS && RENTAL_COPY}
              {topic == TOPICS.COVID && COVID_COPY} In order for us to determine
              whether we can help you, we need to ask you a few questions.
            </p>
            <NamedLink
              to={VIEWS.HelpView}
              params={{ topic: topic.toLowerCase() }}
            >
              <Button>Find out if we can help you</Button>
            </NamedLink>
          </Message>
        </Page>
      </Layout>
    </Layout>
  )
}

const RENTAL_COPY = 'So you need something in your rental property to be fixed?'
const COVID_COPY =
  'So you have been affected by COVID-19 and are worried about meeting your rental payments?'
