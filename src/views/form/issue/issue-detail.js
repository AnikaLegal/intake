// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import camelize from 'camelize'
import snakeize from 'snakeize'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS as REPAIRS_FIELDS } from 'forms/repairs'
import { FIELDS as OTHER_FIELDS } from 'forms/other-issues'
import { FIELDS as RENT_REDUCTION_FIELDS } from 'forms/rent-reduction'
import { ROUTES } from 'consts'
import { api } from 'api'
import { useRedux } from 'state'
import type { Data, Issue, Client, Topic } from 'types'

const FIELD_LOOKUP = {
  REPAIRS: REPAIRS_FIELDS,
  RENT_REDUCTION: RENT_REDUCTION_FIELDS,
  OTHER: OTHER_FIELDS,
}

export const ClientIssuesDetailView = (topic: Topic) => () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const issue = client?.issueSet.find((i) => i.topic === topic)
  const onAnswered = () => {
    // User is ready to go to the next page
    console.log('onAnswered')
    if (!client) return
    const route = getNextIssueRoute(topic, client.id, client.issueSet)
    history.push(route)
  }
  const onSubmit = async (data: Data) => {
    // User has submitted the form
    console.log('submit', issue, client, data)
    if (!issue || !client) return
    const updatedIssue = await actions.client.updateIssue({
      issueId: issue.id,
      updates: { answers: toApi(data), isAnswered: true },
    })
  }
  const onUpload = async (file: File) => {
    // User is uploading a file
    const id = issue?.id || ''
    return await actions.client.createUpload({ issue: id, file })
  }
  if (client && !issue) {
    // Go back to issues form if we can't find this issue.
    const route = ROUTES.ISSUES_FORM.replace(':id', client.id)
    history.push(route)
  }
  if (issue?.isAnswered) {
    onAnswered()
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

const TOPIC_ROUTES = {
  REPAIRS: ROUTES.ISSUE_REPAIRS_FORM,
  RENT_REDUCTION: ROUTES.ISSUE_RENT_REDUCTION_FORM,
  OTHER: ROUTES.ISSUE_OTHER_FORM,
}

export const getNextIssueRoute = (
  topic: string,
  clientId: string,
  issues: Array<Issue>
) => {
  // Check for any unanswered issues.
  const unanswered = issues
    .filter((i) => i.topic !== topic)
    .filter((i) => !i.isAnswered)

  if (unanswered.length > 0) {
    // If there are unanswered issues, then go to their issue detail form.
    const nextTopic = unanswered[0].topic
    const nextRoute = TOPIC_ROUTES[nextTopic]
    return nextRoute.replace(':id', clientId)
  } else {
    // If there are no unanswered issues, proceed to property manager form.
    return ROUTES.PROPERTY_MANAGER_FORM.replace(':id', clientId)
  }
}

const toForm = (issue: ?Issue): Data => (issue ? snakeize(issue.answers) : {})

const toApi = (data: Data) => {
  // Turn 'IS_ON_LEASE' into 'isOnLease', so that camelize/snakeize donesn't mangle the keys.
  let answers = {}
  for (let k of Object.keys(data)) {
    const key = k.toLowerCase()
    answers[key] = data[k]
  }
  return camelize(answers)
}
