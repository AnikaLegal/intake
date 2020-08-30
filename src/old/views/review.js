// @flow
import React from 'react'
import { useParams } from 'react-router-dom'

import { ReviewContainer } from 'containers'
import { NamedRedirect, VIEWS } from 'routes'

export const ReviewView = () => {
  const { submissionId } = useParams()
  if (!submissionId) return <NamedRedirect to={VIEWS.NotFoundView} />
  return <ReviewContainer submissionId={submissionId} />
}
