// @flow
import React from 'react'
import { withRouter } from 'react-router-dom'

import { ReviewContainer } from 'containers'
import { NamedRedirect, VIEWS } from 'routes'

export const ReviewView = withRouter(({ match }) => {
  const {
    params: { submissionId },
  } = match
  if (!submissionId) return <NamedRedirect to={VIEWS.NotFoundView} />
  return <ReviewContainer submissionId={submissionId} />
})
