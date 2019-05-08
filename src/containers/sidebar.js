import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Steps } from 'antd'
import { connect } from 'react-redux'

import { Header, Form, Page } from 'components'

const _Sidebar = ({ className, current, sections }) => {
  let answerIdx = 0
  let sectionIdx = 0
  for (let section of sections) {
    answerIdx += section.forms.length
    if (answerIdx > current) {
      break
    }
    sectionIdx++
  }
  return (
    <div className={className}>
      <Steps direction="vertical" current={sectionIdx}>
        {sections.map(s => (
          <Steps.Step title={s.name} key={s.name} />
        ))}
      </Steps>
    </div>
  )
}

const style = c => styled(c)`
  background-color: #fff;
  padding: 1.5rem;
  min-height: calc(100vh - 84px);
  width: 300px;
  border-right: 2px solid rgba(21, 27, 38, 0.15);
  @media (max-width: 1000px) {
    display: none;
  }
`
const mapState = state => ({
  current: state.form.current,
})
const mapActions = dispatch => ({})
export const Sidebar = connect(
  mapState,
  mapActions
)(style(_Sidebar))
