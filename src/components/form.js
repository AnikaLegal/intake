// @flow
import React from 'react'
import styled from 'styled-components'

import { Field, FormContext } from 'components'
import { Button } from 'features/generic'
import { FadeInOut } from './animations'
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
  const context = { data, validation, onChange }
  return (
    <React.Fragment>
      <FormTitle>{form.prompt}</FormTitle>
      {form.help && <FormSubtitle>{form.help}</FormSubtitle>}
      <FormContext.Provider value={context}>
        {form.fields.map(f => (
          <Field field={f} />
        ))}
      </FormContext.Provider>
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
          <Button secondary={!validation.valid}>Save & Review</Button>
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

const FormSubtitle = styled.p`
  margin-top: -1.5rem;
  margin-bottom: 2rem;
`
