import React, { Component } from 'react'
import { Button } from 'antd'

import { QUESTIONS, Q_TYPES } from 'questions'
import { Page } from 'components'

export class HomeView extends Component {

  state = {
    idx: 0,
  }

  onNext = () => {
    const { idx } = this.state
    if (idx + 1 < QUESTIONS.length) {
      this.setState({ idx: idx + 1 })
    }
  }

  render() {
    const { idx } = this.state
    return (
      <Page>
        {renderQuestion(QUESTIONS[idx])}
        <Button type="primary" onClick={this.onNext}>Next</Button>
      </Page>
    )
  }
}

const renderQuestion = ({ prompt, type, children }) => {
  if (type === Q_TYPES.FORM) {
    return (
      <div>
        <p key={prompt}>{prompt}</p>
        {children.map(renderQuestion)}
      </div>
    )
  } else {
    return <p key={prompt}>{prompt}</p>
  }
}
