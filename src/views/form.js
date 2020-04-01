// @flow
import React from 'react'
import { useParams } from 'react-router-dom'
import { FormContainer } from 'containers'
import { NamedRedirect, VIEWS } from 'routes'

export const FormView = () => {
  const { submissionId } = useParams()
  if (!submissionId) return <NamedRedirect to={VIEWS.NotFoundView} />
  return <FormContainer submissionId={submissionId} />
}
