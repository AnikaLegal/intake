// @flow
import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { NumberInput } from './number'
import { theme } from '../theme'

type Props = {
  value: string | void,
  onChange: (string) => void,
  disabled?: boolean,
  onFocus?: Function,
  onBlur?: Function,
}

export const DateInput = ({
  onChange,
  value,
  disabled,
  onFocus,
  onBlur,
}: Props) => {
  const date = value ? new Date(value) : null
  const [isValid, setValid] = useState(Boolean(date))
  const [day, setDay] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [year, setYear] = useState<number | null>(null)
  useEffect(() => {
    if (date) {
      setDay(date.getDate())
      setMonth(date.getMonth() + 1)
      setYear(date.getFullYear())
    }
  }, [value])

  const onDayChange = (val) => {
    const newDay = Number(val)
    const newDate = getDate(year, month, newDay)
    setDay(newDay)
    if (newDate) {
      onChange(getDateString(newDate))
      setValid(true)
    } else {
      setValid(false)
      onChange('')
    }
  }
  const onMonthChange = (val) => {
    const newMonth = Number(val)
    const newDate = getDate(year, newMonth, day)
    setMonth(newMonth)
    if (newDate) {
      onChange(getDateString(newDate))
      setValid(true)
    } else {
      setValid(false)
      onChange('')
    }
  }
  const onYearChange = (val) => {
    const newYear = Number(val)
    if (newYear > new Date().getFullYear()) return
    const newDate = getDate(newYear, month, day)
    setYear(newYear)
    if (newDate) {
      onChange(getDateString(newDate))
      setValid(true)
    } else {
      setValid(false)
      onChange('')
    }
  }
  const isInvalid = !isValid && Boolean(day || month || year)
  return (
    <DateFieldEl>
      <NumberInput
        placeholder="DD"
        disabled={disabled}
        onChange={onDayChange}
        value={day || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: '50px' }}
      />
      <Separator invalid={isInvalid}>/</Separator>
      <NumberInput
        placeholder="MM"
        disabled={disabled}
        onChange={onMonthChange}
        value={month || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: '59px' }}
      />
      <Separator invalid={isInvalid}>/</Separator>
      <NumberInput
        placeholder="YYYY"
        disabled={disabled}
        onChange={onYearChange}
        value={year || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: '80px' }}
      />
    </DateFieldEl>
  )
}

const getDateString = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
    display: inline-block;
    text-align: center;
    font-size: 30px;
    padding-bottom: 12px;
  }
  &:not(:hover) {
    input:first-child {
      border-bottom: 2px solid ${theme.color.teal.primary};
    }
  }
`
const Separator = styled.div`
  margin: 0 3px;
  display: inline-block;
  font-size: 30px;
  color: ${theme.color.teal.primary};
`
