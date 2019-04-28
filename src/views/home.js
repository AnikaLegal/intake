import React, { Component } from 'react'
import { Button, Container} from 'semantic-ui-react'

import { QUESTIONS, Q_TYPES } from 'questions'

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
      <Container>
        {renderQuestion(QUESTIONS[idx])}
        <Button onClick={this.onNext}>Next</Button>
      </Container>
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
