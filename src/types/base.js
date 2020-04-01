// @flow
export type View =
  | 'HelpView'
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
  | 'MULTI_DROPDOWN'
  | 'MULTI_SELECT'
  | 'RADIO'
  | 'RADIO_BTN'
  | 'TEXTAREA'
  | 'FILE'
  | 'DATE'
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
  value: any,
}

export type Condition = Data => boolean

export type Field = {
  name: string,
  type: FieldType,
  prompt: string,
  help?: string,
  placeholder?: string,
  when?: Condition,
  options?: Array<FieldOption>,
  fields?: Array<Field>,
  rules: Array<Rule>,
}

export type Form = {
  name: string,
  fields: Array<Field>,
  prompt: string,
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

export type Topic = 'REPAIRS' | 'COVID'
export type Submission = {
  id: string,
  complete: boolean,
  topic: Topic,
  questions: Array<Section>,
  answers: Array<Answer>,
}
