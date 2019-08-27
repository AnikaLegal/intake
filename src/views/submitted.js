// @flow
import React from 'react'

import { Page, Layout, LoadingSpinner } from 'features/generic'

export const SubmittedView = () => {
  // Send use to thank you page on anikalegal.com
  // to register a goal completion for Google AdWords
  window.location = SUCCESS_URL
  return (
    <Layout vertical>
      <Page>
        <LoadingSpinner />
      </Page>
    </Layout>
  )
}
