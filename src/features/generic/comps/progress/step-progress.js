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
    <StepLabel>
      <StepCircleEl isActive={isDone || isCurrent}>{step + 1}</StepCircleEl>
      <div className="label">{label}</div>
      <StepConnectorEl hasNext={hasNext} />
    </StepLabel>
  )
}

const StepProgressEl = styled.div`
  padding: 2rem 1rem;
`
const StepLabel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .label {
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    margin: 5px 0 8px 0;
  }
`
const SIZE = 50
const StepCircleEl = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE}px;
  text-align: center;
  line-height: ${SIZE + 2}px;
  font-size: 24px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  ${({ isActive }) =>
    isActive &&
    css`
      border: none;
      color: #fff;
      border: 1px solid #fff;
      background: #95b9cc;
    `}
`
const StepConnectorEl = styled.div`
  display: none;
  ${({ hasNext }) =>
    hasNext &&
    css`
      width: 0px;
      display: block;
      height: 47px;
      border-left: 2px dashed #979797;
    `}
`
