// @flow
import * as React from 'react'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data } from 'types'
import type { Field } from 'types'

import { events } from 'analytics'

import { BaseForm } from './base'

export class EligibilityForm extends BaseForm implements Form {
  stage = 0

  async onSubmit(data: Data, history: any) {
    if (!this.client) return
    await this.actions.client.updateClient({
      clientId: this.client.id,
      updates: this.toApi(data),
    })
    // Route to either issues or ineliguble
    let route
    const isEligible = data.IS_VICTORIAN && data.IS_TENANT
    if (!isEligible) {
      route = ROUTES.INELIGIBLE
    } else {
      route = ROUTES.build(
        ROUTES.ISSUES_FORM,
        { ':qIdx': 0 },
        { client: this.client?.id }
      )
    }
    history.push(route)
  }

  toForm() {
    return {}
  }

  toApi(data: Data) {
    return {
      isEligible: data.IS_VICTORIAN && data.IS_TENANT,
    }
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    return FIELDS[idx] || ['', null]
  }
}

const IS_VICTORIAN: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Do you live in Victoria?</span>,
}

const IS_TENANT: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Do you rent the property that you are enquring about?</span>,
}

export const FIELDS = [
  ['IS_VICTORIAN', IS_VICTORIAN],
  ['IS_TENANT', IS_TENANT],
]
