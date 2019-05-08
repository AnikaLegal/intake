import React from 'react'

import { SECTIONS } from 'questions'
import { Header, Page, Layout } from 'components'
import { Sidebar, ReviewContainer } from 'containers'

export const ReviewView = () => (
  <Layout vertical>
    <Header />
    <Layout>
      <Sidebar sections={SECTIONS} />
      <Page>
        <ReviewContainer sections={SECTIONS} />
      </Page>
    </Layout>
  </Layout>
)
