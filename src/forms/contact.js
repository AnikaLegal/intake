//@flow
// A form where we get the client's contact details.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field, Data } from 'types'

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
  buttonText: 'Continue',
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

const REFERRAL_TYPE: Field = {
  required: true,
  Prompt: <span>How did you hear about Anika?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    {
      label: 'Referral from a legal centre',
      value: 'LEGAL_CENTRE',
    },
    { label: 'Referral from a charity or non-profit', value: 'CHARITY' },
    { label: 'Social media', value: 'SOCIAL_MEDIA' },
    { label: 'Google search', value: 'SEARCH' },
    { label: 'Word of mouth', value: 'WORD_OF_MOUTH' },
    { label: 'Online ad', value: 'ONLINE_AD' },
  ],
}

const REFERRER: Field = {
  type: FIELD_TYPES.DYNAMIC,
  required: false,
  Prompt: <span />,
  dynamic: (data: Data) => {
    const refType = data.REFERRAL_TYPE
    if (refType == 'LEGAL_CENTRE') return LEGAL_CENTER_REFERRER
    if (refType == 'CHARITY_REFERRER') return CHARITY_REFERRER
    if (refType == 'SOCIAL_MEDIA') return SOCIAL_REFERRER
    return null
  },
}

const LEGAL_CENTER_REFERRER: Field = {
  required: true,
  Prompt: <span>Which legal centre referred you?</span>,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Tenants Victoria', value: 'Tenants Victoria' },
    { label: 'Victoria Legal Aid', value: 'Victoria Legal Aid' },
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

export const FIELDS = {
  INTRO,
  DOB,
  PHONE,
  AVAILIBILITY,
  REFERRAL_TYPE,
  REFERRER,
}
