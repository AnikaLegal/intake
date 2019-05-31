// @flow

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

export type FormState = {
  +answers: Data,
}

export type Redux = {
  +form: FormState,
}

export type Action = { +type: 'ANSWER_FORM', +name: string, +answer: any }

export type PromiseAction = Promise<Action>

export type GetState = () => Redux

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

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

export type Field = {
  name: string,
  type: FieldType,
  prompt?: string,
  help?: string,
  placeholder?: string,
  label?: string,
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
  when?: Data => boolean,
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

export type Submission = {
  id: string,
  complete: boolean,
  questions: { [string]: Field },
  answers: Array<{
    name: string,
    answer: mixed,
  }>,
}
