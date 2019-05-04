import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { validate } from 'utils'
import { FormShape } from 'questions'
import { Field } from 'components'

export const Form = ({
  name,
  fields,
  prompt,
  help,
  data,
  validations,
  hasNext,
  hasBack,
  onNext,
  onBack,
  onChange,
}) => {
  const validator = validate(validations)
  const validation = validator(data)
  const [isSubmitted, setSubmitted] = useState(false)
  const onSubmit = () => {
    setSubmitted(true)
    if (validation.valid) {
      onNext()
    }
  }
  return (
    <div>
      <FormTitle>{prompt}</FormTitle>
      <AntForm>
        {fields.map(f => (
          <Field
            key={f.name}
            {...f}
            valid={isSubmitted ? validation.fields[f.name].valid : true}
            errors={isSubmitted ? validation.fields[f.name].errors : []}
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
        <Button
          type={validation.valid ? 'primary' : 'secondary'}
          onClick={onSubmit}
        >
          Next
        </Button>
      )}
    </div>
  )
}
Form.propTypes = {
  ...FormShape,
  hasNext: PropTypes.bool,
  hasBack: PropTypes.bool,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const FormTitle = styled.h1`
  margin-bottom: 2rem;
`
