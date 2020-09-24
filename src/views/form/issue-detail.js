// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import camelize from 'camelize'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS as REPAIRS_FIELDS } from 'forms/repairs'
import { FIELDS as OTHER_FIELDS } from 'forms/other-issues'
import { FIELDS as RENT_REDUCTION_FIELDS } from 'forms/rent-reduction'
import { ROUTES } from 'consts'
import { api } from 'api'
import { useRedux } from 'state'
import type { Data } from 'types'

const FIELD_LOOKUP = {
  REPAIRS: REPAIRS_FIELDS,
  RENT_REDUCTION: RENT_REDUCTION_FIELDS,
  OTHER: OTHER_FIELDS,
}

export const ClientIssuesDetailView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux(true)
  const { issueId } = useParams()
  const issue = client ? client.issueSet.find((i) => i.id) : null
  if (client && !issue) {
    const route = ROUTES.ISSUES_FORM.replace(':id', client.id)
    history.push(route)
  }
  const fields = issue ? FIELD_LOOKUP[issue.topic] : {}
  const onSubmit = async (data: Data) => {
    if (!issue || !client) return
    // Turn 'IS_ON_LEASE' into 'isOnLease', so that camelize/snakeize donesn't mangle the keys.
    let answers = {}
    for (let k of Object.keys(data)) {
      const key = k.toLowerCase()
      answers[key] = data[k]
    }
    answers = camelize(answers)
    await actions.client.updateIssue({
      issueId: issue.id,
      updates: { answers, isAnswered: true },
    })
    // Check for any unanswered issues.
    const unanswered = client.issueSet
      .filter((i) => i.id !== issue.id)
      .filter((i) => i.isAnswered)
      .map((i) => i.id)

    if (unanswered.length < 1) {
      // If there are no unanswered issues, proceed to landlord form.
      const route = ROUTES.LANDLORD_FORM.replace(':id', client.id)
      history.push(route)
    } else {
      // If there are unanswered issues, then go to their issue detail form.
      const nextId = unanswered[0]
      const route = ROUTES.ISSUE_DETAIL_FORM.replace(':id', client.id).replace(
        ':issueId',
        nextId
      )
      history.push(route)
    }

    const route = ROUTES.ISSUES_FORM.replace(':id', client.id)
    history.push(route)
  }
  const onUpload = async (file: File) => {
    const id = issue ? issue.id : ''
    return await actions.client.createUpload({ issue: id, file })
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form
        fields={fields}
        onSubmit={onSubmit}
        onUpload={onUpload}
        isViewLoading={isLoading}
      />
    </>
  )
}
