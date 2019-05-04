import React, { Component } from 'react'

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
      <div>
        <Header />
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
      </div>
    )
  }
}
