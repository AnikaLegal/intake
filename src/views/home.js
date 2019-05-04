import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Steps } from 'antd'

import { FIELD_TYPES } from 'consts'
import { FORMS } from 'questions'
import { Header, Form, Page } from 'components'

export class HomeView extends Component {
  state = {
    idx: 0,
    data: {},
  }
  onNext = idx => () => {
    const { data } = this.state
    if (idx + 1 >= FORMS.length) return
    if (FORMS[idx + 1].when && !FORMS[idx + 1].when(data)) {
      this.onNext(idx + 1)()
    } else {
      this.setState({ idx: idx + 1 })
    }
  }
  onBack = idx => () => {
    const { data } = this.state
    if (idx - 1 < 0) return
    if (FORMS[idx - 1].when && !FORMS[idx - 1].when(data)) {
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
    const hasNext = idx + 1 < FORMS.length
    const hasBack = idx - 1 >= 0
    return (
      <Layout vertical>
        <Header />
        <Layout>
          <Sidebar forms={FORMS} idx={idx} />
          <Page>
            <Form
              {...FORMS[idx]}
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
  height: 100%;
  width: 100%;
  display: flex;
  ${props =>
    props.vertical &&
    css`
      flex-direction: column;
    `}
`

const _Sidebar = ({ className, idx, forms }) => {
  return (
    <div className={className}>
      <Steps direction="vertical" current={idx}>
        {forms.map(form => (
          <Steps.Step title={form.name} key={form.name} />
        ))}
      </Steps>
    </div>
  )
}

const Sidebar = styled(_Sidebar)`
  background-color: #fff;
  padding: 1.5rem;
  width: 300px;
  border-right: 2px solid rgba(21, 27, 38, 0.15);
  @media (max-width: 1000px) {
    display: none;
  }
`
