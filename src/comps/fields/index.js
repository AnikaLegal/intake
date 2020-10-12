// @flow
import React, { useEffect, useState } from 'react'
import { FIELD_TYPES } from 'consts'
import { Text } from 'design'

import { TextField } from './text'
import { DisplayField } from './display'
import { EmailField } from './email'
import { ChoiceSingleField } from './choice-single'
import { ChoiceMultiField } from './choice-multi'
import { DateField } from './date'
import { UploadField } from './upload'
import { PhoneField } from './phone'
import type { FormFieldProps } from './types'

// A field which conditionally renders other fields
const DynamicField = (props: FormFieldProps) => {
  const [field, setField] = useState(null)
  useEffect(() => {
    const dynamic = props.field.dynamic
    if (!dynamic) throw 'DynamicField does not have dynamic function.'
    const dynamicField = dynamic(props.data)
    if (!dynamicField) {
      props.onNext()
    } else {
      setField(dynamicField)
    }
  }, [])
  if (field) {
    const FormField = FORM_FIELDS[field.type]
    const fieldProps = { ...props, field }
    return (
      <FormField {...fieldProps}>
        {' '}
        <Text.Header>{field && field.Prompt}</Text.Header>
        {field && field.Help && <Text.Body>{field && field.Help}</Text.Body>}
      </FormField>
    )
  } else {
    return null
  }
}

export const FORM_FIELDS = {
  [FIELD_TYPES.PHONE]: PhoneField,
  [FIELD_TYPES.DISPLAY]: DisplayField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.EMAIL]: EmailField,
  [FIELD_TYPES.CHOICE_SINGLE]: ChoiceSingleField,
  [FIELD_TYPES.CHOICE_MULTI]: ChoiceMultiField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.UPLOAD]: UploadField,
  [FIELD_TYPES.DYNAMIC]: DynamicField,
}
