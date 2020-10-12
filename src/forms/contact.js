// @flow
import * as React from 'react'

import { ROUTES } from 'consts'
import { FIELD_TYPES } from 'consts'
import type { Form, Actions, Client, Data } from 'types'
import type { Field } from 'types'

import { events } from 'analytics'

import { BaseForm } from './base'

export class ContactForm extends BaseForm implements Form {
  stage = 3

  async onSubmit(data: Data, history: any) {
    if (!this.client) return
    await this.actions.client.updateClient({
      clientId: this.client.id,
      updates: this.toApi(data),
    })
    const route = ROUTES.build(ROUTES.SUBMIT_FORM, { ':qIdx': 0 }, {})
    history.push(route)
  }

  toForm() {
    if (!this.client) return {}
    return {
      PHONE: this.client.phoneNumber,
      AVAILIBILITY: this.client.callTime,
      REFERRER_TYPE: this.client.referrerType,
      REFERRER: this.client.referrer,
      DOB: this.client.dateOfBirth?.split('T')[0],
    }
  }

  toApi(data: Data) {
    return {
      dateOfBirth: `${data.DOB}T00:00`,
      phoneNumber: data.PHONE,
      callTime: data.AVAILIBILITY,
      referrerType: data.REFERRER_TYPE,
      referrer: data.REFERRER || '',
    }
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    if (idx < 5) {
      // $FlowFixMe
      return FIELDS[idx] || ['', null]
    } else if (data.REFERRER_TYPE === 'LEGAL_CENTRE') {
      // $FlowFixMe
      return FIELDS[idx][0]
    } else if (data.REFERRER_TYPE === 'CHARITY') {
      // $FlowFixMe
      return FIELDS[idx][1]
    } else if (data.REFERRER_TYPE === 'SOCIAL_MEDIA') {
      // $FlowFixMe
      return FIELDS[idx][2]
    } else {
      // $FlowFixMe
      return FIELDS[idx][3]
    }
  }
}
const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      Great job. That is all the questions we have about your property. Now we
      just need a few details about you.
    </span>
  ),
  Help: (
    <span>
      These details will help us to better understand who you are and when we
      can contact you.
    </span>
  ),
  button: { text: 'Continue', Icon: null },
}

const DOB: Field = {
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>What is your date of birth?</span>,
}

const PHONE: Field = {
  required: true,
  type: FIELD_TYPES.PHONE,
  Prompt: <span>What is the best phone number to contact you on?</span>,
}

const AVAILIBILITY: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Monday to Friday (9am to 5pm)', value: 'WEEK_DAY' },
    { label: 'Monday to Friday (5pm to 8pm)', value: 'WEEK_EVENING' },
    { label: 'Saturday (9am to 5pm)', value: 'SATURDAY' },
    { label: 'Sunday (9am to 5pm)', value: 'SUNDAY' },
  ],
  Prompt: <span>When is your preferred time for us to call you?</span>,
}

const REFERRER_TYPE: Field = {
  required: true,
  Prompt: <span>How did you hear about Anika?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    {
      label: 'Legal centre',
      value: 'LEGAL_CENTRE',
    },
    { label: 'Charity / non-profit', value: 'CHARITY' },
    { label: 'Social media', value: 'SOCIAL_MEDIA' },
    { label: 'Google search', value: 'SEARCH' },
    { label: 'Word of mouth', value: 'WORD_OF_MOUTH' },
    { label: 'Online ad', value: 'ONLINE_AD' },
  ],
}

const LEGAL_CENTER_REFERRER: Field = {
  required: true,
  Prompt: <span>Which legal centre referred you?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Tenants Victoria', value: 'Tenants Victoria' },
    { label: 'Victoria Legal Aid', value: 'Victoria Legal Aid' },
    { label: 'Housing Victoria', value: 'Housing Victoria' },
    { label: 'Justice Connect', value: 'Justice Connect' },
    { label: 'Consumer Affairs Victoria', value: 'Consumer Affairs Victoria' },
    { label: 'Other', value: 'Other' },
  ],
}

const CHARITY_REFERRER: Field = {
  required: true,
  Prompt: <span>Which charity or non-profit referred you?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    {
      label: 'Asylum Seeker Resource Centre',
      value: 'Asylum Seeker Resource Centre',
    },
    { label: 'Launch Housing', value: 'Launch Housing' },
    { label: 'Tenants Victoria', value: 'Tenants Victoria' },
    { label: 'Other', value: 'Other' },
  ],
}

const SOCIAL_REFERRER: Field = {
  required: true,
  Prompt: <span>Which social media site did you find us on?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    {
      label: 'Facebook',
      value: 'Facebook',
    },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'LinkedIn', value: 'LinkedIn' },
    { label: 'Pintrest', value: 'Pintrest' },
    { label: 'Reddit', value: 'Reddit' },
    { label: 'Other', value: 'Other' },
  ],
}

const OUTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: <span>Almost done!</span>,
  Help: (
    <span>
      Now all you need to do is submit your answers and we'll give you a call.
    </span>
  ),
  button: { text: 'Continue', Icon: null },
}

export const FIELDS = [
  ['INTRO', INTRO],
  ['DOB', DOB],
  ['PHONE', PHONE],
  ['AVAILIBILITY', AVAILIBILITY],
  ['REFERRER_TYPE', REFERRER_TYPE],
  [
    ['REFERRER', LEGAL_CENTER_REFERRER],
    ['REFERRER', CHARITY_REFERRER],
    ['REFERRER', SOCIAL_REFERRER],
    ['OUTRO', OUTRO],
  ],
]
