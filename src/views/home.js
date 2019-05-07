import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Steps } from 'antd'

import { FIELD_TYPES } from 'consts'
import { SECTIONS } from 'questions'
import { Header, Form, Page } from 'components'

export class HomeView extends Component {
  state = {
    idx: 0,
    data: {},
  }
  getForms = () => {
    return SECTIONS.map(s => s.forms).reduce((arr, fs) => [...arr, ...fs], [])
  }
  onNext = idx => () => {
    const { data } = this.state
    const forms = this.getForms()
    if (idx + 1 >= forms.length) return
    if (forms[idx + 1].when && !forms[idx + 1].when(data)) {
      this.onNext(idx + 1)()
    } else {
      this.setState({ idx: idx + 1 })
    }
  }
  onBack = idx => () => {
    const { data } = this.state
    const forms = this.getForms()
    if (idx - 1 < 0) return
    if (forms[idx - 1].when && !forms[idx - 1].when(data)) {
      this.onBack(idx - 1)()
    } else {
      this.setState({ idx: idx - 1 })
    }
  }
  onChange = key => value => {
    this.setState({ data: { ...this.state.data, [key]: value } })
  }
  render() {
    const { idx, data } = this.state
    const forms = this.getForms()
    const hasNext = idx + 1 < forms.length
    const hasBack = idx - 1 >= 0
    return (
      <Layout vertical>
        <Header />
        <Layout>
          <Sidebar sections={SECTIONS} idx={idx} />
          <Page>
            <Form
              {...forms[idx]}
              key={idx}
              data={data}
              hasNext={hasNext}
              hasBack={hasBack}
              onNext={this.onNext(idx)}
              onBack={this.onBack(idx)}
              onChange={this.onChange}
            />
          </Page>
        </Layout>
      </Layout>
    )
  }
}

const Layout = styled.div`
  min-height: calc(100vh - 84px);
  width: 100%;
  display: flex;
  ${props =>
    props.vertical &&
    css`
      flex-direction: column;
    `}
`

const _Sidebar = ({ className, idx, sections }) => {
  let i = 0
  let j = 0
  for (let section of sections) {
    i += section.forms.length
    if (i > idx) {
      break
    }
    j++
  }
  return (
    <div className={className}>
      <Steps direction="vertical" current={j}>
        {sections.map(s => (
          <Steps.Step title={s.name} key={s.name} />
        ))}
      </Steps>
    </div>
  )
}

const Sidebar = styled(_Sidebar)`
  background-color: #fff;
  padding: 1.5rem;
  min-height: calc(100vh - 84px);
  width: 300px;
  border-right: 2px solid rgba(21, 27, 38, 0.15);
  @media (max-width: 1000px) {
    display: none;
  }
`
