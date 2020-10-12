// @flow
import * as React from 'react'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data, Person } from 'types'
import type { Field } from 'types'

import { events } from 'analytics'

import { BaseForm } from './base'

export class PropertyManagerForm extends BaseForm implements Form {
  stage = 2

  getPeople(): [Person | void, Person | void] {
    const tenancy = this.client?.tenancySet.find((t) => t)
    return [tenancy?.landlord, tenancy?.agent]
  }

  async onSubmit(data: Data, history: any) {
    if (!this.client) return
    if (this.client && this.client.tenancySet.length < 1) {
      // Send them back to issues form
      const route = ROUTES.build(
        ROUTES.ISSUES_FORM,
        { ':qIdx': 0 },
        { client: this.client.id }
      )
      history.push(route)
    } else {
      const [landlord, agent] = this.getPeople()
      const person = data.IS_AGENT ? agent : landlord
      if (person) {
        // Update the person
        await this.actions.client.updatePerson({
          personId: person.id,
          updates: this.toApi(data),
        })
      } else {
        // Create a person
        const create = data.IS_AGENT
          ? this.actions.client.createAgent
          : this.actions.client.createLandlord
        await create(this.toApi(data))
      }
      const route = ROUTES.build(ROUTES.CONTACT_FORM, { ':qIdx': 0 }, {})
      history.push(route)
    }
  }

  toForm() {
    const [landlord, agent] = this.getPeople()
    if (landlord) {
      return {
        IS_AGENT: false,
        NAME: landlord.fullName,
        ADDRESS: landlord.address,
        EMAIL: landlord.email,
        PHONE: landlord.phoneNumber,
      }
    } else if (agent) {
      return {
        IS_AGENT: true,
        NAME: agent.fullName,
        ADDRESS: agent.address,
        EMAIL: agent.email,
        PHONE: agent.phoneNumber,
      }
    } else {
      return {}
    }
  }

  toApi(data: Data) {
    return {
      fullName: data.NAME,
      address: data.ADDRESS,
      email: data.EMAIL,
      phoneNumber: data.PHONE,
    }
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    let field
    if (idx < 2) {
      //$FlowFixMe
      return FIELDS[idx] || ['', null]
    } else if (data.IS_AGENT) {
      //$FlowFixMe
      return FIELDS[idx][1]
    } else {
      //$FlowFixMe
      return FIELDS[idx][0]
    }
  }
}

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>Almost done! Now just a few questions about your landlord.</span>
  ),
  button: { text: 'Continue', Icon: null },
}

const IS_AGENT: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: (
    <span>
      Does your landlord use a <strong>real estate agent</strong> to manage the
      property?
    </span>
  ),
}

const AGENT_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's full name?</span>,
}

const AGENT_ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's address?</span>,
}

const AGENT_EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.EMAIL,
  Prompt: <span>What is your landlord's agent's email?</span>,
}
const AGENT_PHONE: Field = {
  required: true,
  type: FIELD_TYPES.PHONE,
  Prompt: <span>What is your landlord's agent's phone number?</span>,
}

const LANDLORD_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's full name?</span>,
}

const LANDLORD_ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's address?</span>,
}

const LANDLORD_EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.EMAIL,
  Prompt: <span>What is your landlord's email?</span>,
}
const LANDLORD_PHONE: Field = {
  required: true,
  type: FIELD_TYPES.PHONE,
  Prompt: <span>What is your landlord's phone number?</span>,
}

export const FIELDS = [
  ['INTRO', INTRO],
  ['IS_AGENT', IS_AGENT],
  [
    ['NAME', LANDLORD_NAME],
    ['NAME', AGENT_NAME],
  ],
  [
    ['ADDRESS', LANDLORD_ADDRESS],
    ['ADDRESS', AGENT_ADDRESS],
  ],
  [
    ['EMAIL', LANDLORD_EMAIL],
    ['EMAIL', AGENT_EMAIL],
  ],
  [
    ['PHONE', LANDLORD_PHONE],
    ['PHONE', AGENT_PHONE],
  ],
]
