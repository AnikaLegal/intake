// @flow
import type { Reducer, Action, Redux } from 'types'
import { init } from 'state/init'
import { SECTIONS } from 'questions'

import * as utils from './utils'

// Form operations
// This is a but of a clusterfuck right now, it could probably be simpler.
// Also tests would be cool.
export const reducer: Reducer = (state, action) => {
  let nextPage, answers, forms, nextForm, currentForm, validation
  if (!state) return init
  switch (action.type) {
    // User answers a question
    case 'ANSWER_FORM':
      answers = {
        ...state.form.answers,
        [action.name]: action.answer,
      }
      forms = utils.getForms(SECTIONS)
      currentForm = forms[state.form.page]
      validation = utils.getValidation(currentForm, answers)
      return {
        ...state,
        form: { ...state.form, answers, validation },
      }
    // Form starts loading from backend.
    case 'FORM_LOADING':
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: true,
        },
      }
    // Form finished loading from backend.
    case 'FORM_LOADED':
      nextPage = 0
      answers = utils.getFrontendAnswers(action.submission)
      forms = utils.getForms(SECTIONS)
      nextForm = forms[nextPage]
      return {
        ...state,
        form: {
          id: action.submission.id,
          answers,
          questions: SECTIONS, // "Temporary" hack.
          page: nextPage,
          hasNext: utils.getHasNext(nextPage, answers, forms),
          hasPrev: utils.getHasPrev(nextPage, answers, forms),
          validation: utils.getValidation(nextForm, answers),
          isSubmitted: false,
          isLoading: false,
          isComplete: action.submission.complete,
        },
      }
    // User requests next page.
    case 'FORM_NEXT':
      const { submission } = action
      answers = utils.getFrontendAnswers(submission)
      forms = utils.getForms(SECTIONS)
      currentForm = forms[state.form.page]
      validation = utils.getValidation(currentForm, answers)
      const { hasNext } = state.form
      nextPage =
        validation.valid && hasNext ? state.form.page + 1 : state.form.page
      nextForm = forms[nextPage]
      return {
        ...state,
        form: {
          id: submission.id,
          answers,
          questions: SECTIONS, // "Temporary" hack.
          page: nextPage,
          hasNext: utils.getHasNext(nextPage, answers, forms),
          hasPrev: utils.getHasPrev(nextPage, answers, forms),
          validation: utils.getValidation(nextForm, answers),
          isSubmitted: !validation.valid,
          isLoading: false,
          isComplete: submission.complete,
        },
      }
    // User requests previous page.
    case 'FORM_PREV':
      nextPage = state.form.page - 1
      forms = utils.getForms(SECTIONS)
      nextForm = forms[nextPage]
      validation = utils.getValidation(nextForm, state.form.answers)
      return {
        ...state,
        form: {
          ...state.form,
          page: nextPage,
          hasNext: utils.getHasNext(nextPage, state.form.answers, forms),
          hasPrev: utils.getHasPrev(nextPage, state.form.answers, forms),
          validation,
        },
      }
    // User submits the form.
    case 'FORM_SUBMIT':
      return {
        ...state,
        form: {
          ...state.form,
          isLoading: false,
          isComplete: action.submission.complete,
        },
      }
  }
  return state
}
