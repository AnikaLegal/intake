// @flow
import * as React from 'react'

import { FIELD_TYPES } from 'consts'

import type { Field as FieldType, Data, Validations } from 'types'
import { FormContext } from './form'

type FormFieldProps = {
  field: FieldType,
}

// TODO
export const Field = ({ field }: FormFieldProps) => {
  const { data, validation, onFieldChange, disabled } = React.useContext(
    FormContext
  )
  const {
    name,
    type,
    prompt,
    help,
    placeholder,
    label,
    when,
    options,
    fields,
  } = field
  // Select appropriate input widget based on type.
  const Input = FIELD_INPUTS[type]
  return (
    <FormItem
      valid={validation.fields[name].valid}
      errors={validation.fields[name].errors}
      label={copy ? copy.label : ''}
      tooltip={copy ? copy.tooltip : ''}
      {...(formItemProps || {})}
    >
      <Input
        disabled={isDisabled}
        value={data[name]}
        options={options}
        placeholder={copy ? copy.placeholder : ''}
        onChange={onFieldChange(name)}
        {...(inputProps || {})}
      />
    </FormItem>
  )
}
