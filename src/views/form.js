// @flow
import React from 'react'
import { withRouter } from 'react-router-dom'
import { FormContainer } from 'containers'
import { NamedRedirect, VIEWS } from 'routes'

export const FormView = withRouter(({ match }) => {
  const {
    params: { submissionId },
  } = match
  if (!submissionId) return <NamedRedirect to={VIEWS.NotFoundView} />
  return <FormContainer submissionId={submissionId} />
})
