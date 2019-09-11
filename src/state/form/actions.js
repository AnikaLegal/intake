// @flow
import { events } from 'analytics'
import { api } from 'api'
import type { Action, Dispatch, GetState, Section, Submission } from 'types'

import { getBackendAnswers } from './utils'

export default {
  answer: (name: string, answer: any): Action => ({
    type: 'ANSWER_FORM',
    name,
    answer,
  }),
  create: (sections: Array<Section>) => (
    dispatch: Dispatch
  ): Promise<Submission> => {
    dispatch({ type: 'FORM_LOADING' })
    return api.questions.submission.create(sections).then(submission => {
      dispatch({
        type: 'FORM_LOADED',
        submission,
      })
      return submission
    })
  },
  load: (id: string) => (dispatch: Dispatch): Promise<Submission> => {
    dispatch({ type: 'FORM_LOADING' })
    return api.questions.submission.get(id).then(submission => {
      dispatch({
        type: 'FORM_LOADED',
        submission,
      })
      return submission
    })
  },
  next: () => (
    dispatch: Dispatch,
    getState: GetState
  ): Promise<Submission | void> => {
    const {
      form: { id, answers, validation, hasPrev },
    } = getState()
    if (!validation.valid) {
      // Form is invalid - don't submit to API
      dispatch({ type: 'FORM_NEXT_INVALID' })
      return Promise.resolve()
    } else {
      // Form is valid, submit to API
      if (!hasPrev) {
        // Dispatch analytics event if they submit the first page
        events.onFirstSave(id)
      }
      dispatch({ type: 'FORM_LOADING' })
      const backendAnswers = getBackendAnswers(answers)
      return api.questions.submission
        .update(id, backendAnswers)
        .then(submission => {
          dispatch({
            type: 'FORM_NEXT',
            submission,
          })
          return submission
        })
    }
  },
  prev: () => ({ type: 'FORM_PREV' }),
  submit: (id: string) => (dispatch: Dispatch): Promise<Submission> => {
    dispatch({ type: 'FORM_LOADING' })
    return api.questions.submission.submit(id).then(submission => {
      dispatch({
        type: 'FORM_SUBMIT',
        submission,
      })
      return submission
    })
  },
}
