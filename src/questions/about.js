//@flow
import * as React from 'react'

import { events } from 'analytics'
import { api } from 'api'
import { FIELD_TYPES, LINKS, ROUTES } from 'consts'
import { Icon } from 'design'
import type { Data, Field } from 'types'
import { storeFormData, tidyData } from 'utils'

export const ABOUT_QUESTIONS: Array<Field> = [
  {
    name: 'EMAIL',
    stage: 1,
    required: false,
    type: FIELD_TYPES.EMAIL,
    skipText: 'I do not have an email address',
    Prompt: (
      <span>
        What's the best <strong>email</strong> to reach you?
      </span>
    ),
    Help: (
      <>
        <div>
          We'll only use this to contact you about your request.
        </div>
        <div>
          We won't share your details.
        </div>
      </>
    ),
    button: { text: 'OK', Icon: Icon.Tick, showLoading: true },
    effect: async (data: Data) => {
      events.onEligibilityComplete()

      if (!data.EMAIL) {
        return ROUTES.NO_EMAIL
      } else {
        const tidy = tidyData(data)
        const submission = await api.submission.create(tidy)
        const formData = { ...tidy, id: submission.id }
        storeFormData(tidy)

        events.onFirstSave()
      }
    },
  },
  {
    name: 'FIRST_NAME',
    stage: 1,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        What's your <strong>first name?</strong>
      </span>
    ),
  },
  {
    name: 'LAST_NAME',
    stage: 1,
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
    stage: 1,
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
    name: 'PHONE',
    stage: 1,
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
    stage: 1,
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
    effect: async (data: Data) => {
      events.onBasicDetailsComplete()
    },
  },
]
