// @flow
import React, { createContext, useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import type { Node, AbstractComponent } from 'react'

import { api } from 'api'
import { FIELD_TYPES } from 'consts'
import { NamedRedirect } from 'routes'
import { isRequiredCheck } from 'utils'
import {
  Field,
  FieldGroup,
  TextInput,
  DateInput,
  DollarInput,
  NumberInput,
  TextareaInput,
  CheckboxInput,
  MultiCheckboxInput,
  DropdownInput,
  MultiDropdownInput,
  ButtonChoiceInput,
  RadioInput,
  NoAnimation,
  ImageUploadContainer,
} from 'features/generic'
import type { Field as FieldType, Data, Validations } from 'types'

type FormContextType = {
  data: Data,
  validation: Validations,
  onChange: string => any => any,
  isSubmitted: boolean,
}
const FORM_CONTEXT_DEFAULT = {
  data: {},
  validation: { valid: true, fields: {} },
  onChange: () => () => null,
  isSubmitted: false,
}
export const FormContext = createContext<FormContextType>(FORM_CONTEXT_DEFAULT)

type Props = {
  field: FieldType,
}
export const FormField = ({ field }: Props) => {
  if (field.fields) {
    return <FormFieldGroup field={field} />
  } else {
    return <SingleFormField field={field} />
  }
}

const FormFieldGroup = ({ field }: Props) => {
  const { data } = useContext(FormContext)
  if (!field.fields) return null
  return (
    <NoAnimation visible={field.when ? field.when(data) : true}>
      <FieldGroup prompt={field.prompt} help={field.help}>
        {field.fields.map(f => (
          <FormGroupField field={f} key={f.name} />
        ))}
      </FieldGroup>
    </NoAnimation>
  )
}

const FormGroupField = ({ field }: Props) => {
  const { data, validation, onChange, isSubmitted } = useContext(FormContext)
  const [isBlur, setBlur] = useState(false)
  const isVisible = field.when ? field.when(data) : true
  const isRequired = isRequiredCheck(field.rules)
  const errors = validation.fields[field.name].errors
  const visibleErrors = isBlur || isSubmitted ? errors : []
  return (
    <NoAnimation visible={isVisible}>
      <FieldGroup.Field
        label={field.prompt}
        errors={visibleErrors}
        required={isRequired}
      >
        <FieldInput
          field={field}
          value={data[field.name]}
          onChange={onChange(field.name)}
          onFocus={() => setBlur(false)}
          onBlur={() => setBlur(true)}
        />
      </FieldGroup.Field>
    </NoAnimation>
  )
}

const SingleFormField = ({ field }: Props) => {
  const { data, validation, onChange, isSubmitted } = useContext(FormContext)
  const [isBlur, setBlur] = useState(false)
  const isVisible = field.when ? field.when(data) : true
  const isRequired = isRequiredCheck(field.rules)
  const errors = validation.fields[field.name].errors
  const visibleErrors = isBlur || isSubmitted ? errors : []
  return (
    <NoAnimation visible={isVisible}>
      <Field
        prompt={field.prompt}
        help={field.help}
        errors={visibleErrors}
        required={isRequired}
      >
        <FieldInput
          field={field}
          value={data[field.name]}
          onChange={onChange(field.name)}
          onFocus={() => setBlur(false)}
          onBlur={() => setBlur(true)}
        />
      </Field>
    </NoAnimation>
  )
}

export type FieldProps = {
  field: FieldType,
  value: any,
  onChange: any => any,
  onFocus: () => void,
  onBlur: () => void,
}
const FieldInput = ({
  field,
  value,
  onChange,
  onFocus,
  onBlur,
}: FieldProps) => {
  switch (field.type) {
    case FIELD_TYPES.EXIT:
      return <NamedRedirect push to={field.name} />
    case FIELD_TYPES.TEXT:
      return (
        <TextInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.TEXTAREA:
      return (
        <TextareaInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.DOLLAR:
      return (
        <DollarInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.NUMBER:
      return (
        <NumberInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.DATE:
      return (
        <DateInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )
    case FIELD_TYPES.DROPDOWN:
      return (
        <DropdownInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          options={field.options || []}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.MULTI_DROPDOWN:
      return (
        <MultiDropdownInput
          values={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          options={field.options || []}
          placeholder={field.placeholder}
        />
      )
    case FIELD_TYPES.MULTI_SELECT:
      return (
        <MultiCheckboxInput
          values={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          options={field.options || []}
        />
      )
    case FIELD_TYPES.RADIO:
      return (
        <RadioInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          options={field.options || []}
        />
      )
    case FIELD_TYPES.RADIO_BTN:
      return (
        <ButtonChoiceInput
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          options={field.options || []}
        />
      )
    case FIELD_TYPES.FILE:
      return (
        <ImageUploadContainer
          upload={api.image.create}
          images={value || []}
          onChange={onChange}
        />
      )
  }
  return null
}
