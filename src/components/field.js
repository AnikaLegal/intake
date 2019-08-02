// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Node, AbstractComponent } from 'react'

import { UploadField } from 'containers'
import { FIELD_TYPES } from 'consts'
import { NamedRedirect } from 'routes'
import type { Field as FieldType } from 'types'

import {
  ExitField,
  MultiSelectField,
  DropdownField,
  MultiDropdownField,
  RadioField,
  RadioButtonField,
  FileField,
  DateField,
  TextField,
  TextAreaField,
  DollarField,
  NumberField,
} from './fields'

type FieldGroupProps = {
  field: FieldType,
  children: Node,
}

export const FieldGroup = ({ field, children }: FieldGroupProps) => (
  <FieldWrapper>
    <h3 css={'margin-bottom: 1rem;'}>{field.prompt}</h3>
    {field.help && <Help style={{ marginTop: '-0.7rem' }}>{field.help}</Help>}
    {children}
  </FieldWrapper>
)

type FieldProps = {
  field: FieldType,
  valid: boolean,
  errors: Array<string>,
  value: string | any,
  onChange: Function,
  isCompact?: boolean,
}

export const Field = ({
  field,
  valid,
  errors,
  value,
  onChange,
  isCompact,
}: FieldProps) => {
  const FieldInput = FIELD_INPUTS[field.type]
  const itemProps = {}
  if (field.label) {
    itemProps['labelCol'] = { span: 4 }
    itemProps['wrapperCol'] = { span: 17 }
    itemProps['label'] = field.label
  }
  // FIXME: antd
  return null
  // return (
  //   <FieldWrapper compact={isCompact}>
  //     <h3>{field.prompt}</h3>
  //     {field.help && <Help>{field.help}</Help>}
  //     <AntForm.Item
  //       validateStatus={valid ? '' : 'error'}
  //       help={errors ? errors.join('. ') : ''}
  //       style={{ margin: '0' }}
  //       {...itemProps}
  //     >
  //       <FieldInput
  //         field={field}
  //         valid={valid}
  //         errors={errors}
  //         value={value}
  //         onChange={onChange}
  //       />
  //     </AntForm.Item>
  //   </FieldWrapper>
  // )
}

const Help = styled.p`
  margin: -0.2rem 0 1rem 0;
  font-weight: 300;
`

const FieldWrapper = styled.div`
  margin-bottom: 2.5rem;
  ${props =>
    props.compact &&
    css`
      margin-bottom: 0;
    `}
`

const FIELD_INPUTS: { [string]: AbstractComponent<FieldProps> } = {
  [FIELD_TYPES.EXIT]: ExitField,
  [FIELD_TYPES.MULTI_SELECT]: MultiSelectField,
  [FIELD_TYPES.DROPDOWN]: DropdownField,
  [FIELD_TYPES.MULTI_DROPDOWN]: MultiDropdownField,
  [FIELD_TYPES.RADIO]: RadioField,
  [FIELD_TYPES.RADIO_BTN]: RadioButtonField,
  [FIELD_TYPES.FILE]: FileField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.TEXTAREA]: TextAreaField,
  [FIELD_TYPES.DOLLAR]: DollarField,
  [FIELD_TYPES.NUMBER]: NumberField,
}
