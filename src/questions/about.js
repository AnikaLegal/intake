//@flow
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { Icon } from 'design'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const ABOUT_QUESTIONS: Array<Field> = [
  // Stage 0 - client info.
  {
    name: 'INTRO',
    stage: 0,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        First of all, congratulations on taking the first step in solving your
        rental issues.
      </span>
    ),
    Help: (
      <span>
        Once you submit this form, we'll give you a phone call or email in a few
        business days to talk about how we can help you.
      </span>
    ),
    button: { text: 'Thank you', Icon: null },
  },
  {
    name: 'IS_VICTORIAN_TENANT',
    stage: 0,
    effect: async (data: Data) => {
      if (!data.IS_VICTORIAN_TENANT) {
        return ROUTES.GEOGRAPHY
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you rent a property in Victoria, Australia?</span>,
    Help: <span>We can only help renters in Victoria.</span>,
  },
  {
    name: 'FIRST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Okay, what's your <strong>first name?</strong>
      </span>
    ),
    effect: async (data: Data) => {
      events.onFirstSave()
    },
  },
  {
    name: 'LAST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        And your <strong>last name?</strong>
      </span>
    ),
  },
  {
    name: 'PREFERRED_NAME',
    stage: 0,
    required: false,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Do you have a <strong>preferred name</strong> that you would like us to
        use?
      </span>
    ),
  },
  {
    name: 'EMAIL',
    stage: 0,
    required: false,
    type: FIELD_TYPES.EMAIL,
    skipText: 'I do not have an email address',
    Prompt: (
      <span>
        What <strong>email address</strong> can we reach you at?
      </span>
    ),
    Help: (
      <span>
        Our paralegals will use this to contact you after you complete this
        questionnaire.
      </span>
    ),
    button: { text: 'OK', Icon: Icon.Tick, showLoading: true },
    effect: async (data: Data) => {
      if (!data.EMAIL) {
        return ROUTES.NO_EMAIL
      } else {
        events.onBasicDetailsComplete()
        const sub = await api.submission.create(data)
        const formData = { ...data, id: sub.id }
        storeFormData(formData)
      }
    },
  },
  {
    name: 'PHONE',
    stage: 0,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: (
      <span>
        What is the best <strong>phone number</strong> to contact you on?
      </span>
    ),
    Help: (
      <span>
        Our paralegals will use this to contact you after you complete this
        questionnaire.
      </span>
    ),
  },
  {
    name: 'AVAILABILITY',
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Weekdays (9am to 5pm)', value: 'WEEK_DAY' },
      { label: 'Weekdays (5pm to 8pm)', value: 'WEEK_EVENING' },
      { label: 'Saturday (9am to 5pm)', value: 'SATURDAY' },
      { label: 'Sunday (9am to 5pm)', value: 'SUNDAY' },
    ],
    Prompt: <span>What are the best times for us to call you?</span>,
    Help: (
      <span>
        We know you're busy: we'll try to call you during these times.
      </span>
    ),
  },
  {
    name: 'POSTCODE',
    stage: 0,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>What is your post code?</span>,
  },
  {
    name: 'ISSUES',
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'I want to claim my bond', value: 'BONDS' },
      { label: 'I need something repaired', value: 'REPAIRS' },
      {
        label: 'I am being evicted',
        value: 'EVICTION_RETALIATORY',
      },
      {
        label: 'I want compensation from my landlord',
        value: 'INELIGIBLE_COMPENSATION',
      },
    ],
    effect: async (data: Data) => {
      if (data.ISSUES === 'INELIGIBLE_COMPENSATION') {
        return ROUTES.LEGAL_SCOPE_COMPENSATION
      }
    },
    Prompt: <span>What do you need help with?</span>,
    Help: (
      <span>
        Anika can help with{' '}
        <a target="_blank" href={LINKS.BONDS_INFO}>
          bond recovery
        </a>{' '}
        {', '}
        <a target="_blank" href={LINKS.REPAIRS_INFO}>
          rental repairs
        </a>
        {' and '}
        <a target="_blank" href={LINKS.EVICTION_INFO}>
          retaliatory evictions.
        </a>{' '}
      </span>
    ),
  },
]
