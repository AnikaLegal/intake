// @flow
import React from 'react'
import styled from 'styled-components'

import { FIELD_TYPES } from 'consts'
import { NamedLink, VIEWS } from 'routes'
import { Button, Divider } from 'features/generic'
import type { Form as FormType, View, Data, Validations } from 'types'

import { FormField, FormContext } from './field'

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
  const context = { data, validation, onChange, isSubmitted }
  return (
    <React.Fragment>
      <FormTitle>{form.prompt}</FormTitle>
      {form.help && <FormSubtitle>{form.help}</FormSubtitle>}
      <FormContext.Provider value={context}>
        {form.fields.map(f => (
          <FormField key={f.name} field={f} />
        ))}
      </FormContext.Provider>
      <Divider />
      {hasPrev && (
        <Button onClick={onPrev} margin="0 0.5rem 0 0">
          Back
        </Button>
      )}
      {hasNext && (
        <Button onClick={onNext} secondary={!validation.valid}>
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

const FormTitle = styled.h1`
  margin-bottom: 2rem;
`

const FormSubtitle = styled.p`
  margin-top: -1.5rem;
  margin-bottom: 2rem;
`
