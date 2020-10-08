// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import camelize from 'camelize'
import snakeize from 'snakeize'

import { IntakeNavbar, Form } from 'comps'
import { FIELDS as REPAIRS_FIELDS } from 'forms/repairs'
import { FIELDS as OTHER_FIELDS } from 'forms/other-issues'
import { FIELDS as RENT_REDUCTION_FIELDS } from 'forms/rent-reduction'
import { ROUTES } from 'consts'
import { api } from 'api'
import { useRedux } from 'state'
import type { Data, Issue, Client, Topic } from 'types'
import { getNextFormRoute, useScrollTop } from 'utils'

const FIELD_LOOKUP = {
  REPAIRS: REPAIRS_FIELDS,
  RENT_REDUCTION: RENT_REDUCTION_FIELDS,
  OTHER: OTHER_FIELDS,
}

export const ClientIssuesDetailView = (topic: Topic) => () => {
  useScrollTop()
  const history = useHistory()
  const { path } = useRouteMatch()
  const { actions, client, isLoading } = useRedux()
  const issue = client?.issueSet.find((i) => i.topic === topic)
  const match = useRouteMatch()
  const onSubmit = async (data: Data) => {
    // User has submitted the form
    if (!issue || !client) return
    const updatedIssue = await actions.client.updateIssue({
      issueId: issue.id,
      updates: { answers: toApi(data), isAnswered: true },
    })
    // User is ready to go to the next page
    const route = getNextFormRoute(path, client, { issueTopic: topic })
    history.push(route)
  }
  const onUpload = async (file: File) => {
    // User is uploading a file
    const id = issue?.id || ''
    return await actions.client.createUpload({ issue: id, file })
  }
  const fields = issue ? FIELD_LOOKUP[issue.topic] : {}
  return (
    <>
      <IntakeNavbar current={1} />
      <Form
        fields={fields}
        onSubmit={onSubmit}
        onUpload={onUpload}
        isViewLoading={isLoading}
        initData={toForm(issue)}
      />
    </>
  )
}

const toForm = (issue: ?Issue): Data => {
  if (!issue) return {}
  const answers = snakeize(issue.answers)
  const data = {}
  for (let k of Object.keys(answers)) {
    const key = k.toUpperCase()
    data[key] = answers[k]
  }
  return data
}

const toApi = (data: Data) => {
  // Turn 'IS_ON_LEASE' into 'isOnLease', so that camelize/snakeize donesn't mangle the keys.
  let answers = {}
  for (let k of Object.keys(data)) {
    const key = k.toLowerCase()
    answers[key] = data[k]
  }
  return camelize(answers)
}
