//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'
import { Icon } from 'design'

import { ABOUT_QUESTIONS } from './about'
import { ISSUE_QUESTIONS } from './issues'
import { LANDLORD_QUESTIONS } from './landlord'
import { IMPACT_QUESTIONS } from './impact'
import { PROPERTY_QUESTIONS } from './property'
import { ELIGIBILITY_QUESTIONS } from './eligibility'

export const QUESTIONS: Array<Field> = [
  ...ABOUT_QUESTIONS,
  ...ELIGIBILITY_QUESTIONS,
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
    const finalData = { ...data }
    // Set all unasked questions to null.
    for (let q of QUESTIONS) {
      const isUndef = typeof data[q.name] === 'undefined'
      const isFailCondition = q.askCondition && !q.askCondition(data)
      if (isUndef || isFailCondition) {
        finalData[q.name] = null
      }
    }
    const subId = data['id']
    let sub
    if (subId) {
      // We have already created this submission
      sub = await api.submission.update(subId, finalData)
    } else {
      // This is a new submission
      sub = await api.submission.create(finalData)
    }
    await api.submission.submit(sub.id)
    // Wipe stored data.
    storeFormData('')
    events.onFinishIntake()
    return ROUTES.SUBMITTED
  },
}

QUESTIONS.push(SUBMIT_QUESTIONS)
