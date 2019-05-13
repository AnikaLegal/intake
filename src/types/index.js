// @flow
export type FieldOption = {
  label: string,
  value: string,
}

export type Field = {
  name: string,
  type: string,
  prompt: string,
  placeholder: string,
  help: string,
  label: string,
  options: Array<FieldOption>,
  valid: boolean,
  errors: Array<string>,
}

export type Form = {
  name: string,
  fields: Array<Field>,
  prompt: string,
  help: string,
  section: string,
  when: ({ [string]: any }) => boolean,
  validations: any, // TODO
}
