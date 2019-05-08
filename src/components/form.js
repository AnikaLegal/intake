import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { validate } from 'utils'
import { FormShape } from 'questions'
import { Field, FieldGroup } from 'components'
import { FIELD_TYPES } from 'consts'

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
  isComplete,
  onComplete,
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
        {fields.map(f => {
          if (f.type === FIELD_TYPES.FIELD_GROUP) {
            return (
              <FieldGroup key={f.name} {...f}>
                {f.fields.map(field => (
                  <Field
                    key={field.name}
                    {...field}
                    valid={
                      isSubmitted ? validation.fields[field.name].valid : true
                    }
                    errors={
                      isSubmitted ? validation.fields[field.name].errors : []
                    }
                    value={data[field.name] || ''}
                    onChange={onChange(field.name)}
                    isCompact
                  />
                ))}
              </FieldGroup>
            )
          } else {
            return (
              <Field
                key={f.name}
                {...f}
                valid={isSubmitted ? validation.fields[f.name].valid : true}
                errors={isSubmitted ? validation.fields[f.name].errors : []}
                value={data[f.name] || ''}
                onChange={onChange(f.name)}
              />
            )
          }
        })}
      </AntForm>
      <Divider />
      {hasBack && (
        <Button onClick={onBack} style={{ marginRight: '0.5rem' }}>
          Back
        </Button>
      )}
      {hasNext && (
        <Button
          disabled={!validation.valid}
          type={validation.valid ? 'primary' : 'secondary'}
          onClick={onSubmit}
        >
          Next
        </Button>
      )}
      {isComplete && (
        <Button
          disabled={!validation.valid}
          type={validation.valid ? 'primary' : 'secondary'}
          onClick={onComplete}
        >
          Review
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

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: none;
  background-color: rgba(0, 0, 0, 0.15);
  height: 1px;
`

const FormTitle = styled.h1`
  margin-bottom: 2rem;
`
