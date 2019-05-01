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

import { FieldShape } from 'questions'
import { FIELD_TYPES } from 'consts'

export const Field = ({
  name,
  type,
  prompt,
  placeholder,
  help,
  options,
  onChange,
  value,
}) => {
  switch (type) {
    case FIELD_TYPES.DROPDOWN:
      return (
        <FormItem prompt={prompt}>
          <Select
            size="large"
            defaultValue=""
            onChange={onChange}
            placeholder={placeholder}
          >
            {options.map(o => (
              <Select.Option key={o} value={o}>
                {o}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      )
    case FIELD_TYPES.MULTICHOICE:
      return (
        <FormItem prompt={prompt}>
          <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
            {options.map(o => (
              <Radio key={o} style={radioStyle} value={o}>
                {o}
              </Radio>
            ))}
          </Radio.Group>
        </FormItem>
      )
    case FIELD_TYPES.FILE:
      return (
        <FormItem prompt={prompt}>
          <Upload>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </FormItem>
      )
    case FIELD_TYPES.DATE:
      return (
        <FormItem prompt={prompt}>
          <DatePicker onChange={e => onChange(e._d.toDateString())} />
        </FormItem>
      )
    case FIELD_TYPES.BOOLEAN:
      return <FormItem prompt={prompt} />
    case FIELD_TYPES.TEXT:
      return (
        <FormItem prompt={prompt}>
          <Input
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
          />
        </FormItem>
      )
    case FIELD_TYPES.TEXTAREA:
      return (
        <FormItem prompt={prompt}>
          <Input.TextArea
            rows={4}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
          />
        </FormItem>
      )
    case FIELD_TYPES.DOLLAR:
      return (
        <FormItem prompt={prompt}>
          <InputNumber
            defaultValue={0}
            min={0}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={placeholder}
            onChange={onChange}
          />
        </FormItem>
      )
    case FIELD_TYPES.NUMBER:
      return (
        <FormItem prompt={prompt}>
          <InputNumber
            defaultValue={0}
            min={0}
            placeholder={placeholder}
            onChange={onChange}
          />
        </FormItem>
      )
  }
}
Field.propTypes = {
  ...FieldShape,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
}

const FormItem = ({ prompt, children }) => (
  <div>
    <h3>{prompt}</h3>
    <AntForm.Item>{children}</AntForm.Item>
  </div>
)

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}
