// @flow
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  current: number,
  steps: Array<string>,
}
export const StepProgress = ({ current, steps }: Props) => {
  return (
    <StepProgressEl>
      {steps.map((s, i) => (
        <Step
          key={i}
          label={s}
          current={current}
          step={i}
          length={steps.length}
        />
      ))}
    </StepProgressEl>
  )
}

type StepProps = {
  step: number,
  current: number,
  length: number,
  label: string,
}
const Step = ({ step, current, length, label }: StepProps) => {
  const isCurrent = step === current
  const isDone = step < current
  const hasNext = step < length - 1
  return (
    <React.Fragment>
      <StepLabel isActive={isDone || isCurrent}>
        <StepCircleEl isActive={isDone || isCurrent}>
          {isDone ? '✔' : step + 1}
        </StepCircleEl>
        {label}
      </StepLabel>
      <StepConnectorEl hasNext={hasNext} />
    </React.Fragment>
  )
}

const StepProgressEl = styled.div`
  padding: 2rem 1rem;
`
const StepLabel = styled.div`
  display: flex;
  align-items: center;
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 500;
    `}
`
const SIZE = 25
const StepCircleEl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin-right: 10px;
  border-radius: ${SIZE}px;
  ${({ theme }) => css`
    border: 2px solid #95b9cc;
  `}
  ${({ isActive, theme }) =>
    isActive &&
    css`
      border: none;
      color: #fff;
      border: 2px solid #fff;
      background: #95b9cc;
    `}
`
const StepConnectorEl = styled.div`
  display: none;
  ${({ hasNext, theme }) =>
    hasNext &&
    css`
      width: 1px;
      margin: 2px 0;
      display: block;
      border-left: 2px solid #297485;
      margin-left: ${SIZE / 2}px;
      height: ${SIZE / 2}px;
    `}
`
