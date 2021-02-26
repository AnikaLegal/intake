//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

import { ABOUT_QUESTIONS } from './about'
import { ISSUE_QUESTIONS } from './issues'
import { LANDLORD_QUESTIONS } from './landlord'
import { PREFERENCE_QUESTIONS } from './preferences'

export const QUESTIONS: Array<Field> = [
  ...ABOUT_QUESTIONS,
  ...ISSUE_QUESTIONS,
  ...LANDLORD_QUESTIONS,
  ...PREFERENCE_QUESTIONS,
  {
    name: 'SUBMIT',
    required: true,
    stage: 3,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        By submitting this form, you are agreeing to our{' '}
        <a href={LINKS.PRIVACY_POLICY}>Privacy Policy</a>,{' '}
        <a href={LINKS.COLLECTIONS_STATEMENT}>Collections Statement</a> and
        website <a href={LINKS.TERMS_OF_USE}>Terms of Use</a>.
      </span>
    ),
    buttonText: 'Confirm',
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
      console.log('Submitting data:', finalData)
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
  },
]
