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
import styled from 'styled-components'
import { FieldShape } from 'questions'
import { FIELD_TYPES } from 'consts'

export const Field = props => {
  const {
    name,
    type,
    prompt,
    placeholder,
    help,
    options,
    onChange,
    value,
    valid,
    errors,
  } = props
  const FieldInput = FIELD_INPUTS[type]
  return (
    <FieldWrapper>
      <h3>{prompt}</h3>
      <AntForm.Item
        validateStatus={valid ? '' : 'error'}
        help={errors.join('. ')}
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
}

const FieldWrapper = styled.div`
  margin-bottom: 1.5rem;
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

const MultichoiceField = ({ onChange, value, options }) => (
  <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
    {options.map(({ label, value }) => (
      <Radio key={label} style={radioStyle} value={value}>
        {label}
      </Radio>
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
    defaultValue={0}
    min={0}
    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    parser={value => value.replace(/\$\s?|(,*)/g, '')}
    placeholder={placeholder}
    onChange={onChange}
  />
)

const NumberField = ({ placeholder, onChange }) => (
  <InputNumber
    defaultValue={0}
    min={0}
    placeholder={placeholder}
    onChange={onChange}
  />
)

const FIELD_INPUTS = {
  [FIELD_TYPES.DROPDOWN]: DropdownField,
  [FIELD_TYPES.MULTICHOICE]: MultichoiceField,
  [FIELD_TYPES.FILE]: FileField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.BOOLEAN]: BooleanField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.TEXTAREA]: TextAreaField,
  [FIELD_TYPES.DOLLAR]: DollarField,
  [FIELD_TYPES.NUMBER]: NumberField,
}
