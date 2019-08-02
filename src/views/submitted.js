// @flow
import React from 'react'

// import { Page, Layout } from 'components'

const SUBMIT_REDIRECT = 'https://anikalegal.com/thank-you'

export const SubmittedView = () => {
  // Send use to thank you page on anikalegal.com
  // to register a goal completion for Google AdWords
  window.location = SUBMIT_REDIRECT
  // FIXME - antd
  // return (
  //   <Layout vertical>
  //     <Page>
  //       <Spin tip="Loading..." />
  //     </Page>
  //   </Layout>
  // )
}
