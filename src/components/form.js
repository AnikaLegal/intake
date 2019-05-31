// @flow
import React from 'react'
import { Button, Form as AntForm } from 'antd'
import styled from 'styled-components'

import { Field, FieldGroup } from 'components'
import { FIELD_TYPES } from 'consts'
import { NamedLink, VIEWS } from 'routes'
import type { Form as FormType, View, Data, Validations } from 'types'

type FormProps = {
  form: FormType,
  isSubmitted: boolean,
  validation: Validations,
  nextPage: number | null,
  backPage: number | null,
  isFinalForm: boolean,
  onNext: Function,
  onChange: Function,
  data: Data,
}

export const Form = ({
  form,
  data,
  validation,
  nextPage,
  backPage,
  isSubmitted,
  isFinalForm,
  onChange,
  onNext,
}: FormProps) => {
  return (
    <React.Fragment>
      <FormTitle>{form.prompt}</FormTitle>
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

      {backPage !== null && (
        <NamedLink to={VIEWS.FormView} params={{ formId: backPage }}>
          <Button style={{ marginRight: '0.5rem' }}>Back</Button>
        </NamedLink>
      )}
      {nextPage !== null && (
        <NamedLink
          to={VIEWS.FormView}
          params={{ formId: nextPage }}
          onClick={onNext}
        >
          <Button type={validation.valid ? 'primary' : 'secondary'}>
            Next
          </Button>
        </NamedLink>
      )}
      {isFinalForm && (
        <NamedLink to={VIEWS.ReviewView} disabled={!validation.valid}>
          <Button type={validation.valid ? 'primary' : 'secondary'}>
            Review
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
