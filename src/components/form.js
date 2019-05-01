import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { FormShape } from 'questions'
import { Field } from 'components'

export const Form = ({
  name,
  fields,
  prompt,
  help,
  data,
  hasNext,
  hasBack,
  onNext,
  onBack,
  onChange,
}) => (
  <div>
    <h1>{prompt}</h1>
    <AntForm>
      {fields.map(f => (
        <Field
          key={f.name}
          {...f}
          value={data[f.name] || ''}
          onChange={onChange(f.name)}
        />
      ))}
    </AntForm>
    {hasBack && (
      <Button onClick={onBack} style={{ marginRight: '0.5rem' }}>
        Back
      </Button>
    )}
    {hasNext && (
      <Button type="primary" onClick={onNext}>
        Next
      </Button>
    )}
  </div>
)
Form.propTypes = {
  ...FormShape,
  hasNext: PropTypes.bool,
  hasBack: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}
