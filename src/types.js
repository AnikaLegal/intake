// @flow
import type {
  Store as ReduxStore,
  Reducer as ReduxReducer,
  DispatchAPI,
} from 'redux'

export type View =
  | 'HomeView'
  | 'FormView'
  | 'ReviewView'
  | 'SubmittedView'
  | 'ContactLandlordView'
  | 'NotFoundView'

export type Route = {
  // URL path to get to route
  path: string,
  // view function to be rendered)
  view?: View,
  // child routes to be rendered under path
  children?: Array<Route>,
}

export type FieldType =
  | 'FIELD_GROUP'
  | 'DROPDOWN'
  | 'MULTI_SELECT'
  | 'RADIO'
  | 'RADIO_BTN'
  | 'TEXTAREA'
  | 'FILE'
  | 'DATE'
  | 'BOOLEAN'
  | 'TEXT'
  | 'NUMBER'
  | 'DOLLAR'

export type Data = { [string]: any }

export type Validation = {
  valid: boolean,
  errors: Array<string>,
}
export type Rule = (Data, string) => Validation

export type Validations = {
  valid: boolean,
  fields: { [string]: Validation },
}

export type FieldOption = {
  label: string,
  value: string,
}

export type Condition = Data => boolean

export type Field = {
  name: string,
  type: FieldType,
  prompt?: string,
  help?: string,
  placeholder?: string,
  label?: string,
  when?: Condition,
  options?: Array<FieldOption>,
  fields?: Array<Field>,
  rules: Array<Rule>,
}

export type Form = {
  name: string,
  fields: Array<Field>,
  prompt: string,
  rules: { [string]: Array<Rule> },
  help?: string,
  when?: Condition,
  getRedirect?: Data => View | null,
}

export type Section = {
  name: string,
  forms: Array<Form>,
}

export type ImageUpload = {
  id: string,
  image: string,
}

type Answer = {
  name: string,
  answer: mixed,
}

export type Submission = {
  id: string,
  complete: boolean,
  questions: Array<Section>,
  answers: Array<Answer>,
}

export type FormState = {
  +id: string, // Loaded Submission ID
  +answers: Data, // Answers provided by the user.
  +questions: Array<Section>,
  +page: number, // Current page number.
  +hasNext: boolean,
  +hasPrev: boolean,
  +validation: Validations, // Validation for the current page.
  +isSubmitted: boolean, // Has the user tried to submit the current page.
  +isLoading: boolean, // Is data loading from the server.
  +isComplete: boolean, // Is the form complete, and ready to review + submit.
}

export type Redux = {
  +form: FormState,
}

export type Action =
  | { +type: 'ANSWER_FORM', +name: string, +answer: any }
  | { +type: 'FORM_LOADING' }
  | { +type: 'FORM_LOADED', +submission: Submission }
  | { +type: 'FORM_NEXT', +submission: Submission }
  | { +type: 'FORM_SUBMIT', +submission: Submission }
  | { +type: 'FORM_PREV' }

export type GetState = () => Redux
export type Thunk = (dispatch: Dispatch, getState: GetState) => void
export type Dispatch = DispatchAPI<Action | Thunk>
export type Store = ReduxStore<Redux, Action, Dispatch>
export type Reducer = ReduxReducer<Redux, Action>
