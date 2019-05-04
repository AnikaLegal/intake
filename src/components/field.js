import React from 'react'
import PropTypes from 'prop-types'
import {
  Form as AntForm,
  Select,
  DatePicker,
  Button,
  Input,
  InputNumber,
  Radio,
  Upload,
  Icon,
} from 'antd'
import styled, { css } from 'styled-components'
import { FieldShape } from 'questions'
import { FIELD_TYPES } from 'consts'

export const FieldGroup = ({ prompt, children }) => (
  <FieldWrapper>
    <h3 css={'margin-bottom: 1rem;'}>{prompt}</h3>
    {children}
  </FieldWrapper>
)

export const Field = props => {
  const FieldInput = FIELD_INPUTS[props.type]
  const itemProps = {}
  if (props.label) {
    itemProps['labelCol'] = { span: 4 }
    itemProps['wrapperCol'] = { span: 17 }
    itemProps['label'] = props.label
  }
  return (
    <FieldWrapper compact={props.isCompact}>
      <h3>{props.prompt}</h3>
      {props.help && <Help>{props.help}</Help>}
      <AntForm.Item
        validateStatus={props.valid ? '' : 'error'}
        help={props.errors.join('. ')}
        style={{ margin: '0' }}
        {...itemProps}
      >
        <FieldInput {...props} />
      </AntForm.Item>
    </FieldWrapper>
  )
}
Field.propTypes = {
  ...FieldShape,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  isCompact: PropTypes.bool,
}

const Help = styled.p`
  margin: -0.6rem 0 1rem 0;
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

const DropdownField = ({ onChange, placeholder, options, value }) => (
  <Select
    size="large"
    onChange={onChange}
    defaultValue={value || undefined}
    placeholder={placeholder}
  >
    {options.map(({ label, value }) => (
      <Select.Option key={label} value={value}>
        {label}
      </Select.Option>
    ))}
  </Select>
)

const RadioField = ({ onChange, value, options }) => (
  <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
    {options.map(({ label, value }) => (
      <Radio key={label} style={radioStyle} value={value}>
        {label}
      </Radio>
    ))}
  </Radio.Group>
)

const RadioButtonField = ({ onChange, value, options }) => (
  <Radio.Group
    buttonStyle="solid"
    onChange={e => onChange(e.target.value)}
    value={value}
  >
    {options.map(({ label, value }) => (
      <Radio.Button key={label} value={value}>
        {label}
      </Radio.Button>
    ))}
  </Radio.Group>
)

const FileField = ({}) => (
  <Upload>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>
)

const DateField = ({ onChange }) => (
  <DatePicker onChange={e => onChange(e._d.toDateString())} />
)

const BooleanField = ({ prompt }) => null

const TextField = ({ placeholder, value, onChange }) => (
  <Input
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
  />
)

const TextAreaField = ({ value, placeholder, onChange }) => (
  <Input.TextArea
    rows={4}
    value={value}
    placeholder={placeholder}
    onChange={e => onChange(e.target.value)}
  />
)

const DollarField = ({ value, placeholder, onChange }) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    parser={value => value.replace(/\$\s?|(,*)/g, '')}
    placeholder={placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)

const NumberField = ({ placeholder, onChange }) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    placeholder={placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)

const FIELD_INPUTS = {
  [FIELD_TYPES.DROPDOWN]: DropdownField,
  [FIELD_TYPES.RADIO]: RadioField,
  [FIELD_TYPES.RADIO_BTN]: RadioButtonField,
  [FIELD_TYPES.FILE]: FileField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.BOOLEAN]: BooleanField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.TEXTAREA]: TextAreaField,
  [FIELD_TYPES.DOLLAR]: DollarField,
  [FIELD_TYPES.NUMBER]: NumberField,
}
