import React, { Component } from 'react'

import { FIELD_TYPES } from 'consts'
import { FORMS } from 'questions'
import { Form, Page } from 'components'

export class HomeView extends Component {
  state = {
    idx: 0,
    data: {},
  }
  onNext = () => {
    const { idx } = this.state
    if (idx + 1 < FORMS.length) {
      this.setState({ idx: idx + 1 })
    }
  }
  onBack = () => {
    const { idx } = this.state
    if (idx - 1 >= 0) {
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
      <Page>
        <Form
          {...FORMS[idx]}
          data={data}
          hasNext={hasNext}
          hasBack={hasBack}
          onNext={this.onNext}
          onBack={this.onBack}
          onChange={this.onChange}
        />
      </Page>
    )
  }
}
