// @flow
import { events } from 'analytics'
import { api } from 'api'
import { TOPICS } from 'consts'
import { getQuestions } from 'questions'
import * as utils from './utils'

import type {
  Dispatch,
  FormState,
  Submission,
  State,
  Section,
  Topic,
} from 'types'

const state: FormState = {
  id: '', // Empty
  topic: TOPICS.REPAIRS,
  answers: {},
  page: 0,
  hasNext: false,
  hasPrev: false,
  validation: { valid: false, fields: {} },
  isSubmitted: false,
  isComplete: false,
  isLoading: true,
}

const reducers = {
  // User answers a question on the form.
  setAnswer: (
    state: FormState,
    answer: { +name: string, +answer: any }
  ): FormState => {
    const answers = {
      ...state.answers,
      [answer.name]: answer.answer,
    }
    const questions = getQuestions(state.topic)
    const forms = utils.getForms(questions)
    const currentForm = forms[state.page]
    const validation = utils.getValidation(currentForm, answers)
    return {
      ...state,
      answers,
      validation,
    }
  },
  // Form starts loading data from backend.
  _setLoading: (state: FormState): FormState => {
    return { ...state, isLoading: true }
  },
  // Form is submitted.
  _setSubmitted: (state: FormState, submission: Submission): FormState => {
    return { ...state, isLoading: false, isComplete: submission.complete }
  },
  // Form finished loading from backend.
  _setLoaded: (state: FormState, submission: Submission): FormState => {
    const nextPage = 0
    const answers = utils.getFrontendAnswers(submission)
    const questions = getQuestions(submission.topic)
    const forms = utils.getForms(questions)
    const nextForm = forms[nextPage]
    return {
      id: submission.id,
      answers,
      topic: submission.topic,
      page: nextPage,
      hasNext: utils.getHasNext(nextPage, answers, forms),
      hasPrev: utils.getHasPrev(nextPage, answers, forms),
      validation: utils.getValidation(nextForm, answers),
      isSubmitted: false,
      isLoading: false,
      isComplete: submission.complete,
    }
  },
  // User navigates to next page
  _setNextPage: (state: FormState, submission: Submission): FormState => {
    const answers = utils.getFrontendAnswers(submission)
    const questions = getQuestions(state.topic)
    const forms = utils.getForms(questions)
    const currentForm = forms[state.page]
    const validation = utils.getValidation(currentForm, answers)
    const { hasNext } = state
    const nextPage = validation.valid && hasNext ? state.page + 1 : state.page
    const nextForm = forms[nextPage]
    return {
      ...state,
      id: submission.id,
      answers,
      page: nextPage,
      hasNext: utils.getHasNext(nextPage, answers, forms),
      hasPrev: utils.getHasPrev(nextPage, answers, forms),
      validation: utils.getValidation(nextForm, answers),
      isSubmitted: false,
      isLoading: false,
      isComplete: submission.complete,
    }
  },
  // User requests next page but their answers are invalid.
  _setNextPageInvalid: (state: FormState): FormState => {
    return {
      ...state,
      isSubmitted: true,
    }
  },
  // User navigates to previous page.
  setPrevPage: (state: FormState): FormState => {
    const nextPage = state.page - 1
    const questions = getQuestions(state.topic)
    const forms = utils.getForms(questions)
    const nextForm = forms[nextPage]
    const validation = utils.getValidation(nextForm, state.answers)
    return {
      ...state,
      page: nextPage,
      hasNext: utils.getHasNext(nextPage, state.answers, forms),
      hasPrev: utils.getHasPrev(nextPage, state.answers, forms),
      validation,
    }
  },
}

const effects = (dispatch: Dispatch) => ({
  // Create a new submission in the backend
  createSubmission: ({
    sections,
    topic,
  }: {
    sections: Array<Section>,
    topic: Topic,
  }): Promise<Submission> => {
    dispatch.form._setLoading()
    return api.questions.submission.create(sections, topic).then(submission => {
      dispatch.form._setLoaded(submission)
      return submission
    })
  },
  // Load an existing submission from the backend
  loadSubmission: (id: string): Promise<Submission> => {
    dispatch.form._setLoading()
    return api.questions.submission.get(id).then(submission => {
      dispatch.form._setLoaded(submission)
      return submission
    })
  },
  // Confirm the submission of an existing submission from the backend
  submitSubmission: (id: string): Promise<Submission> => {
    dispatch.form._setLoading()
    return api.questions.submission.submit(id).then(submission => {
      dispatch.form._setSubmitted(submission)
      return submission
    })
  },
  // Go to the next page
  setNextPage: (_: void, state: State): Promise<Submission | void> => {
    const {
      form: { id, answers, validation, hasPrev },
    } = state
    if (!validation.valid) {
      // Form is invalid - don't submit to API
      dispatch.form._setNextPageInvalid()
      return Promise.resolve()
    } else {
      // Form is valid, submit to API
      if (!hasPrev) {
        // Dispatch analytics event if they submit the first page
        events.onFirstSave(id)
      }
      dispatch.form._setLoading()
      const backendAnswers = utils.getBackendAnswers(answers)
      return api.questions.submission
        .update(id, backendAnswers)
        .then(submission => {
          dispatch.form._setNextPage(submission)
          return submission
        })
    }
  },
})

export const form = { state, reducers, effects }
