// @flow
import React from 'react'
import {
  Form as AntForm,
  Select,
  DatePicker,
  Button,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Upload,
  Icon,
} from 'antd'
import styled, { css } from 'styled-components'
import type { Node, AbstractComponent } from 'react'

import { UploadField } from 'containers'
import { FIELD_TYPES } from 'consts'
import { NamedRedirect } from 'routes'
import type { Field as FieldType } from 'types'

type FieldGroupProps = {
  field: FieldType,
  children: Node,
}

export const FieldGroup = ({ field, children }: FieldGroupProps) => (
  <FieldWrapper>
    <h3 css={'margin-bottom: 1rem;'}>{field.prompt}</h3>
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
  return (
    <FieldWrapper compact={isCompact}>
      <h3>{field.prompt}</h3>
      {field.help && <Help>{field.help}</Help>}
      <AntForm.Item
        validateStatus={valid ? '' : 'error'}
        help={errors ? errors.join('. ') : ''}
        style={{ margin: '0' }}
        {...itemProps}
      >
        <FieldInput
          field={field}
          valid={valid}
          errors={errors}
          value={value}
          onChange={onChange}
        />
      </AntForm.Item>
    </FieldWrapper>
  )
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

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

const MultiSelectField = ({ onChange, field }: FieldProps) => (
  <Checkbox.Group onChange={onChange} options={field.options} />
)

const DropdownField = ({ onChange, field, value }: FieldProps) => (
  <Select
    size="large"
    onChange={onChange}
    defaultValue={value || undefined}
    placeholder={field.placeholder}
  >
    {field.options &&
      field.options.map(({ label, value }) => (
        <Select.Option key={label} value={value}>
          {label}
        </Select.Option>
      ))}
  </Select>
)

const RadioField = ({ onChange, field, value }: FieldProps) => (
  <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
    {field.options &&
      field.options.map(({ label, value }) => (
        <Radio key={label} style={radioStyle} value={value}>
          {label}
        </Radio>
      ))}
  </Radio.Group>
)

const RadioButtonField = ({ onChange, field, value }: FieldProps) => (
  <Radio.Group
    buttonStyle="solid"
    onChange={e => onChange(e.target.value)}
    value={value}
  >
    {field.options &&
      field.options.map(({ label, value }) => (
        <Radio.Button key={label} value={value}>
          {label}
        </Radio.Button>
      ))}
  </Radio.Group>
)

const FileField = ({ onChange }: FieldProps) => (
  <UploadField onChange={onChange} />
)

const DateField = ({ onChange }: FieldProps) => (
  <DatePicker onChange={e => onChange(e._d.toDateString())} />
)

const TextField = ({ field, onChange, value }: FieldProps) => (
  <Input
    value={value}
    placeholder={field.placeholder}
    // @noflow
    onChange={e => onChange(e.target.value)}
  />
)

const TextAreaField = ({ field, onChange, value }: FieldProps) => (
  <Input.TextArea
    rows={4}
    value={value}
    placeholder={field.placeholder}
    onChange={e => onChange(e.target.value)}
  />
)

const DollarField = ({ field, onChange, value }: FieldProps) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    formatter={value =>
      `$ ${String(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    parser={value => value.replace(/\$\s?|(,*)/g, '')}
    placeholder={field.placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)

const NumberField = ({ field, onChange }: FieldProps) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    placeholder={field.placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)

const ExitField = ({ field }: FieldProps) => <NamedRedirect to={field.name} />

const FIELD_INPUTS: { [string]: AbstractComponent<FieldProps> } = {
  [FIELD_TYPES.EXIT]: ExitField,
  [FIELD_TYPES.MULTI_SELECT]: MultiSelectField,
  [FIELD_TYPES.DROPDOWN]: DropdownField,
  [FIELD_TYPES.RADIO]: RadioField,
  [FIELD_TYPES.RADIO_BTN]: RadioButtonField,
  [FIELD_TYPES.FILE]: FileField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.TEXTAREA]: TextAreaField,
  [FIELD_TYPES.DOLLAR]: DollarField,
  [FIELD_TYPES.NUMBER]: NumberField,
}
