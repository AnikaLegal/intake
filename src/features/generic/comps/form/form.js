// @flow
import * as React from 'react'

import type { Field as FieldType, Data, Validations } from 'types'

type FormProps = {
  data: Data,
  validation: Validations,
  onFieldChange: any => void,
  disabled: boolean,
}

const FORM_DEFAULT: FormProps = {
  data: {},
  validation: { valid: true, fields: {} },
  onFieldChange: () => {},
  disabled: false,
}

export const FormContext = React.createContext<FormProps>(FORM_DEFAULT)

export const Form = ({
  data,
  validation,
  onFieldChange,
  disabled,
  children,
}: FormProps & { children: React.Node }) => {
  const context = {
    data,
    validation,
    onFieldChange,
    disabled,
  }
  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}
