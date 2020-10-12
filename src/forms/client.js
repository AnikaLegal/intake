// @flow
import * as React from 'react'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data } from 'types'
import type { Field } from 'types'

import { events } from 'analytics'

import { BaseForm } from './base'

export class ClientForm extends BaseForm implements Form {
  stage = 0

  async onSubmit(data: Data, history: any) {
    let client = this.client
    if (client) {
      await this.actions.client.updateClient({
        clientId: client.id,
        updates: this.toApi(data),
      })
    } else {
      events.onFirstSave()
      client = await this.actions.client.createClient(this.toApi(data))
      localStorage.setItem('clientId', client.id)
    }
    const route = ROUTES.build(ROUTES.ELIGIBILITY_FORM, { ':qIdx': 0 }, {})
    history.push(route)
  }

  toForm() {
    if (!this.client) return {}
    return {
      FIRST_NAME: this.client.firstName,
      LAST_NAME: this.client.lastName,
      EMAIL: this.client.email,
    }
  }

  toApi(data: Data) {
    return {
      firstName: data.FIRST_NAME,
      lastName: data.LAST_NAME,
      email: data.EMAIL,
    }
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    return FIELDS[idx] || ['', null]
  }
}

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      First of all, congratulations on taking the first step in solving your
      rental issues.
    </span>
  ),
  button: { text: 'Thank you', Icon: null },
}

const FIRST_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      Let's start with your <strong>first name.</strong>
    </span>
  ),
}

const LAST_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      And your <strong>last name?</strong>
    </span>
  ),
}

const EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.EMAIL,
  Prompt: (
    <span>
      What <strong>email address</strong> can we reach you at?
    </span>
  ),
  Help: (
    <span>
      Our paralegals will use this address to contact you once you complete the
      questionnaire.
    </span>
  ),
}

const FIELDS = [
  ['INTRO', INTRO],
  ['FIRST_NAME', FIRST_NAME],
  ['LAST_NAME', LAST_NAME],
  ['EMAIL', EMAIL],
]
