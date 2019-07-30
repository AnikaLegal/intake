// @flow
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { TextField } from './text'
import type { FieldProps } from './types'

const FIELD = {
  name: '',
  type: 'TEXT',
  rules: [],
}

export const DateField = ({ onChange, value }: FieldProps) => {
  const date = value ? new Date(value) : null
  const [isValid, setValid] = useState(Boolean(date))
  const [day, setDay] = useState<number | null>(date ? date.getDay() : null)
  const [month, setMonth] = useState<number | null>(
    date ? date.getMonth() + 1 : null
  )
  const [year, setYear] = useState<number | null>(
    date ? date.getFullYear() : null
  )
  const onDayChange = val => {
    const newDay = Number(val)
    const newDate = getDate(year, month, newDay)
    setDay(newDay)
    if (newDate) {
      onChange(newDate.toISOString())
      setValid(true)
    } else {
      setValid(false)
      onChange(null)
    }
  }
  const onMonthChange = val => {
    const newMonth = Number(val)
    const newDate = getDate(year, newMonth, day)
    setMonth(newMonth)
    if (newDate) {
      onChange(newDate.toISOString())
      setValid(true)
    } else {
      setValid(false)
      onChange(null)
    }
  }
  const onYearChange = val => {
    const newYear = Number(val)
    const newDate = getDate(newYear, month, day)
    setYear(newYear)
    if (newDate) {
      onChange(newDate.toISOString())
      setValid(true)
    } else {
      setValid(false)
      onChange(null)
    }
  }
  const isInvalid = !isValid && Boolean(day || month || year)
  return (
    <DateFieldEl>
      <TextField
        field={{ ...FIELD, placeholder: 'Day' }}
        errors={[]}
        valid={true}
        onChange={onDayChange}
        value={day || ''}
      />
      <Separator invalid={isInvalid}>/</Separator>
      <TextField
        field={{ ...FIELD, placeholder: 'Month' }}
        errors={[]}
        valid={true}
        onChange={onMonthChange}
        value={month || ''}
      />
      <Separator invalid={isInvalid}>/</Separator>
      <TextField
        field={{ ...FIELD, placeholder: 'Year' }}
        errors={[]}
        valid={true}
        onChange={onYearChange}
        value={year || ''}
      />
    </DateFieldEl>
  )
}

const getDate = (y: number | null, m: number | null, d: number | null) => {
  if (!d || !m || !y) return null
  const date = new Date(y, m - 1, d, 0, 0, 0, 0)
  const isValid =
    y === date.getFullYear() &&
    m === date.getMonth() + 1 &&
    d === date.getDate()
  return isValid ? date : null
}

const DateFieldEl = styled.div`
  input {
    width: 70px;
    display: inline-block;
  }
`
const Separator = styled.div`
  margin: 0 10px;
  display: inline-block;
  ${({ invalid }) =>
    invalid &&
    css`
      font-weight: bold;
      color: red;
    `})}
`
