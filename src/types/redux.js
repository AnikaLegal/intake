// @flow
import type { Data, Section, Validations, Submission, Topic } from './base'

export type FormState = {
  +id: string, // Loaded Submission ID
  +topic: Topic,
  +answers: Data, // Answers provided by the user.
  +page: number, // Current page number.
  +hasNext: boolean,
  +hasPrev: boolean,
  +validation: Validations, // Validation for the current page.
  +isSubmitted: boolean, // Has the user tried to submit the current page.
  +isLoading: boolean, // Is data loading from the server.
  +isComplete: boolean, // Is the form complete, and ready to review + submit.
}

type FormDispatch = {
  setAnswer: (payload: { +name: string, +answer: any }) => void,
  createSubmission: (payload: {
    sections: Array<Section>,
    topic: Topic,
  }) => Promise<Submission>,
  loadSubmission: (id: string) => Promise<Submission>,
  submitSubmission: (id: string) => Promise<Submission>,
  setNextPage: () => Promise<Submission | void>,
  setPrevPage: () => void,
  _setLoading: () => void,
  _setSubmitted: (submission: Submission) => void,
  _setLoaded: (submission: Submission) => void,
  _setNextPage: (submission: Submission) => void,
  _setNextPageInvalid: () => void,
}

export type State = {
  +form: FormState,
}

export type Dispatch = {
  form: FormDispatch,
}
