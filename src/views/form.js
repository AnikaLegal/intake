// @flow
import React from 'react'

import { SECTIONS } from 'questions'
import { Header, Page, Layout } from 'components'
import { Sidebar, FormContainer } from 'containers'

export const FormView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Sidebar sections={SECTIONS} />
      <Page>
        <FormContainer sections={SECTIONS} />
      </Page>
    </Layout>
  </Layout>
)
