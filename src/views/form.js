// @flow
import React from 'react'
import { withRouter } from 'react-router-dom'

import { SECTIONS } from 'questions'
import { NamedRedirect, VIEWS } from 'routes'
import { Header, Page, Layout } from 'components'
import { Sidebar, FormContainer } from 'containers'

const _FormView = ({ match }) => {
  const {
    params: { formId },
  } = match
  const idx = Number.parseInt(formId)
  if (!idx && idx !== 0) return <NamedRedirect to={VIEWS.NotFoundView} />
  return (
    <Layout vertical>
      <Header />
      <Layout>
        <Sidebar current={idx} sections={SECTIONS} />
        <Page>
          <FormContainer idx={idx} sections={SECTIONS} />
        </Page>
      </Layout>
    </Layout>
  )
}

export const FormView = withRouter(_FormView)
