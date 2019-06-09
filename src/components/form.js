// @flow
import React from 'react'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { Field, FieldGroup } from 'components'
import { VerticalAppear } from './animations'
import { FIELD_TYPES } from 'consts'
import { NamedLink, VIEWS } from 'routes'
import type { Form as FormType, View, Data, Validations } from 'types'

type FormProps = {
  submissionId: string,
  form: FormType,
  validation: Validations,
  hasNext: boolean,
  hasPrev: boolean,
  isSubmitted: boolean,
  onNext: Function,
  onPrev: Function,
  onChange: Function,
  data: Data,
}

export const Form = ({
  submissionId,
  form,
  validation,
  hasNext,
  hasPrev,
  isSubmitted,
  onNext,
  onPrev,
  onChange,
  data,
}: FormProps) => {
  return (
    <React.Fragment>
      <FormTitle>{form.prompt}</FormTitle>
      <AntForm>
        {form.fields.map(f => {
          if (f.type === FIELD_TYPES.FIELD_GROUP) {
            return (
              <VerticalAppear
                key={f.name}
                visible={f.when ? f.when(data) : true}
              >
                <FieldGroup field={f}>
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
              </VerticalAppear>
            )
          } else {
            return (
              <VerticalAppear
                key={f.name}
                visible={f.when ? f.when(data) : true}
              >
                <Field
                  field={f}
                  valid={isSubmitted ? validation.fields[f.name].valid : true}
                  errors={isSubmitted ? validation.fields[f.name].errors : []}
                  value={data[f.name] || ''}
                  onChange={onChange(f.name)}
                />
              </VerticalAppear>
            )
          }
        })}
      </AntForm>

      <Divider />

      {hasPrev && (
        <Button onClick={onPrev} style={{ marginRight: '0.5rem' }}>
          Back
        </Button>
      )}
      {hasNext && (
        <Button
          onClick={onNext}
          type={validation.valid ? 'primary' : 'default'}
        >
          Save & Next
        </Button>
      )}
      {!hasNext && (
        <NamedLink
          to={VIEWS.ReviewView}
          params={{ submissionId }}
          onClick={onNext}
        >
          <Button type={validation.valid ? 'primary' : 'default'}>
            Save & Review
          </Button>
        </NamedLink>
      )}
    </React.Fragment>
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
