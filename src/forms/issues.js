// @flow
import * as React from 'react'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data } from 'types'
import type { Field } from 'types'

import { events } from 'analytics'

import { BaseForm } from './base'
import { getNextIssuesRoute } from './issues-detail'

export class IssueForm extends BaseForm implements Form {
  stage = 1

  async onSubmit(data: Data, history: any) {
    if (!this.client) return
    const address = data.ADDRESS
    const started = `${data.START_DATE}T00:00`
    const isOnLease = data.IS_ON_LEASE
    const clientIssues = data.ISSUES
    const promises = []
    const tenancy = this.client.tenancySet.find((t) => t)
    if (tenancy) {
      // Change the tenancy address
      promises.push(
        this.actions.client.updateTenancy({
          tenancyId: tenancy.id,
          updates: { address, started, isOnLease },
        })
      )
    } else {
      // Create the tenancy
      promises.push(
        this.actions.client.createTenancy({
          // $FlowFixMe
          client: this.client.id,
          address,
          started,
          isOnLease,
        })
      )
    }
    for (let topic of clientIssues) {
      promises.push(
        // $FlowFixMe
        this.actions.client.createIssue({ client: this.client.id, topic })
      )
    }
    const results = await Promise.all<any>(promises)
    const issues = results.slice(1)
    const updatedClient = { ...this.client, issueSet: issues }
    // $FlowFixMe
    const route = getNextIssuesRoute('START_ISSUE', updatedClient)
    history.push(route)
  }

  toForm() {
    const formData = {}
    if (!this.client) return formData
    const tenancy = this.client.tenancySet.find((t) => t)
    if (tenancy) {
      formData['ADDRESS'] = tenancy.address
      formData['START_DATE'] = tenancy.started
      formData['IS_ON_LEASE'] = tenancy.isOnLease
    }
    // $FlowFixMe
    formData['ISSUES'] = this.client.issueSet.map((i) => i.topic)
    return formData
  }

  toApi(data: Data) {
    return {}
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    return FIELDS[idx] || ['', null]
  }
}

const ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your address?</span>,
}

const ISSUES: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_MULTI,
  choices: [
    { label: 'I need rental repairs', value: 'REPAIRS' },
    { label: 'I need a reduction in rent', value: 'RENT_REDUCTION' },
    { label: 'Some other rental issue', value: 'OTHER' },
  ],
  Prompt: <span>What do you need help with?</span>,
}

const START_DATE: Field = {
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>When did you start living at this property?</span>,
}

const IS_ON_LEASE: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Are you named as a tenant on the lease?</span>,
  Help: (
    <span>
      If you signed the lease, it is likely that you are named as a tenant.
    </span>
  ),
}

const FIELDS = [
  ['ADDRESS', ADDRESS],
  ['START_DATE', START_DATE],
  ['IS_ON_LEASE', IS_ON_LEASE],
  ['ISSUES', ISSUES],
]
