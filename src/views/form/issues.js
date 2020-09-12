// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { ROUTES } from 'consts'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/issues'
import { api } from 'api'
import type { Data } from 'types'

const routesLookup = {
  REPAIRS: ROUTES.REPAIR_ISSUE_FORM,
  COVID: ROUTES.COVID_ISSUE_FORM,
  OTHER: ROUTES.OTHER_ISSUE_FORM,
}

export const ClientIssuesView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    const address = data.ADDRESS
    const clientIssues = data.ISSUES
    const client = {
      id: '123456789',
      firstName: 'Matt',
      lastName: 'Segal',
      email: 'matt@anikalegal.com',
      submissions: [],
      isEligible: true,
    }
    const promises = []
    promises.push(api.tenancy.create(client, address))
    for (let topic of clientIssues) {
      promises.push(api.submission.create(client, topic))
    }
    const results = await Promise.all<any>(promises)
    const tenancy = results[0]
    const submissions = results.slice(1)
    let hasSubmissionQuestions = false
    for (let sub of submissions) {
      console.warn('Submission', sub)
      if (!sub.answers) {
        hasSubmissionQuestions = true
        history.push(routesLookup[sub.topic])
        break
      }
    }
    if (!hasSubmissionQuestions) {
      history.push(ROUTES.LANDLORD_FORM)
    }
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form fields={FIELDS} onSubmit={onSubmit} />
    </>
  )
}
