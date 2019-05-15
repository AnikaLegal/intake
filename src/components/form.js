// @flow
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { validate } from 'utils'
import { Field, FieldGroup } from 'components'
import { FIELD_TYPES } from 'consts'
import type { Form as FormType, Data } from 'types'

type FormProps = {
  form: FormType,
  hasNext: boolean,
  hasBack: boolean,
  isComplete: boolean,
  onNext: Function,
  onBack: Function,
  onChange: Function,
  onComplete: Function,
  data: Data,
}

export const Form = ({
  form,
  data,
  hasNext,
  hasBack,
  isComplete,
  onNext,
  onBack,
  onChange,
  onComplete,
}: FormProps) => {
  const validator = validate(form.validations)
  const validation = validator(data)
  const [isSubmitted, setSubmitted] = useState(false)
  const onSubmit = () => {
    setSubmitted(true)
    if (validation.valid) {
      onNext()
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <FormTitle>{prompt}</FormTitle>
      <AntForm>
        {form.fields.map(f => {
          if (f.type === FIELD_TYPES.FIELD_GROUP) {
            return (
              <FieldGroup key={f.name} field={f}>
                <div>
                  {f.fields &&
                    f.fields.map(field => (
                      <Field
                        key={field.name}
                        field={field}
                        valid={
                          isSubmitted
                            ? validation.fields[field.name].valid
                            : true
                        }
                        errors={
                          isSubmitted
                            ? validation.fields[field.name].errors
                            : []
                        }
                        value={data[field.name] || ''}
                        onChange={onChange(field.name)}
                        isCompact
                      />
                    ))}
                </div>
              </FieldGroup>
            )
          } else {
            return (
              <Field
                key={f.name}
                field={f}
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

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: none;
  background-color: rgba(0, 0, 0, 0.15);
  height: 1px;
`

const FormTitle = styled.h1`
  margin-bottom: 2rem;
`
