// @flow
import * as React from 'react'
import camelize from 'camelize'
import snakeize from 'snakeize'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data } from 'types'
import type { Field, Topic, Issue } from 'types'

import { events } from 'analytics'

import { FIELDS as REPAIRS_FIELDS } from 'forms/issue-types/repairs'
import { FIELDS as RENT_REDUCTION_FIELDS } from 'forms/issue-types/rent-reduction'
import { FIELDS as OTHER_FIELDS } from 'forms/issue-types/other-issues'
import { BaseForm } from './base'

const TOPIC_ROUTES = {
  REPAIRS: ROUTES.ISSUE_REPAIRS_FORM,
  RENT_REDUCTION: ROUTES.ISSUE_RENT_REDUCTION_FORM,
  OTHER: ROUTES.ISSUE_OTHER_FORM,
  END_ISSUE: ROUTES.PROPERTY_MANAGER_FORM,
}

const NEXT_TOPIC = {
  START_ISSUE: 'REPAIRS', // START_ISSUE is a dummy topic
  REPAIRS: 'RENT_REDUCTION',
  RENT_REDUCTION: 'OTHER',
  OTHER: 'END_ISSUE', // END_ISSUE is a dummy topic
}

const FIELD_LOOKUP = {
  REPAIRS: REPAIRS_FIELDS,
  RENT_REDUCTION: RENT_REDUCTION_FIELDS,
  OTHER: OTHER_FIELDS,
}

export const getNextIssuesRoute = (topic: string, client: Client): string => {
  const topics = client.issueSet.map((i) => i.topic).concat(['END_ISSUE'])
  let thisTopic: string = topic || ''
  let nextTopic = null
  while (nextTopic == null) {
    thisTopic = NEXT_TOPIC[thisTopic]
    if (topics.includes(thisTopic)) {
      nextTopic = thisTopic
      break
    }
  }
  if (!nextTopic) {
    throw Error('Could not find a next topic.')
  }
  return ROUTES.build(
    TOPIC_ROUTES[nextTopic],
    { ':qIdx': 0 },
    { client: client.id }
  )
}

class BaseIssueForm extends BaseForm implements Form {
  stage = 1
  topic: Topic

  getIssue(): Issue | void {
    return this.client?.issueSet.find((i) => i.topic === this.topic)
  }

  getFields(): Array<[string, Field]> {
    return FIELD_LOOKUP[this.topic]
  }

  async onSubmit(data: Data, history: any) {
    // User has submitted the form
    const issue = this.getIssue()
    if (!issue) return
    const updatedIssue = await this.actions.client.updateIssue({
      issueId: issue.id,
      updates: { answers: this.toApi(data), isAnswered: true },
    })
    // User is ready to go to the next page
    if (!this.client) return
    const route = getNextIssuesRoute(this.topic, this.client)
    history.push(route)
  }

  toForm() {
    const issue = this.getIssue()
    if (!issue) return {}
    const answers = snakeize(issue.answers)
    const data = {}
    for (let k of Object.keys(answers)) {
      const key = k.toUpperCase()
      data[key] = answers[k]
    }
    return data
  }

  toApi(data: Data) {
    // Turn 'IS_ON_LEASE' into 'isOnLease', so that camelize/snakeize donesn't mangle the keys.
    let answers = {}
    for (let k of Object.keys(data)) {
      const key = k.toLowerCase()
      answers[key] = data[k]
    }
    return camelize(answers)
  }

  getFieldCount(data: Data) {
    const fields = this.getFields()
    if (!fields) return 0
    return fields.length
  }

  getField(idx: number, data: Data) {
    const fields = this.getFields()
    if (!fields) return ['', null]
    //$FlowFixMe
    return fields[idx] || ['', null]
  }
}

export class RepairsIssueForm extends BaseIssueForm {
  topic = 'REPAIRS'
}

export class RentReductionIssueForm extends BaseIssueForm {
  topic = 'RENT_REDUCTION'
}

export class OtherIssueForm extends BaseIssueForm {
  topic = 'OTHER'
}
