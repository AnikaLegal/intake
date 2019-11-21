// @flow
import React, { useState } from 'react'
import styled from 'styled-components'

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
        <Button onClick={onPrev} secondary margin="0 0.5rem 0 0">
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
      <p style={{ margin: '1.5rem 0 0 0' }}>
        If you have are having trouble, you can call our support staff on 0451
        618 383 between 9am to 5pm during weekdays, or you can email us at
        contact@anikalegal.com
      </p>
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
