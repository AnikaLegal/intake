//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { events } from 'analytics'
import { api } from 'api'
import { FIELD_TYPES, LINKS, ROUTES } from 'consts'
import { Icon } from 'design'
import type { Data, Field } from 'types'
import { storeFormData, tidyData } from 'utils'

import { ABOUT_QUESTIONS } from './about'
import { ELIGIBILITY_QUESTIONS } from './eligibility'
import { IMPACT_QUESTIONS } from './impact'
import { ISSUE_QUESTIONS } from './issues'
import { LANDLORD_QUESTIONS } from './landlord'
import { PROPERTY_QUESTIONS } from './property'

export const QUESTIONS: Array<Field> = [
  ...ELIGIBILITY_QUESTIONS,
  ...ABOUT_QUESTIONS,
  ...ISSUE_QUESTIONS,
  ...PROPERTY_QUESTIONS,
  ...LANDLORD_QUESTIONS,
  ...IMPACT_QUESTIONS,
]


const SUBMIT_QUESTIONS: Field = {
  name: 'SUBMIT',
  required: true,
  stage: Math.max(...QUESTIONS.map((question) => question.stage)),
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      By submitting this form, you are agreeing to our{' '}
      <a href={LINKS.PRIVACY_POLICY}>Privacy Policy</a>,{' '}
      <a href={LINKS.COLLECTIONS_STATEMENT}>Collections Statement</a> and
      website <a href={LINKS.TERMS_OF_USE}>Terms of Use</a>.
    </span>
  ),
  button: { text: 'Confirm', Icon: Icon.Tick, showLoading: true },
  effect: async (data: Data) => {
    const tidy = tidyData(data)
    const id = tidy['id']
    const submission = id ? await api.submission.update(id, tidy) : await api.submission.create(tidy)
    await api.submission.submit(submission.id)
    events.onFinishIntake()

    // Clean up & finish
    storeFormData({})
    return ROUTES.SUBMITTED
  },
}

QUESTIONS.push(SUBMIT_QUESTIONS)
