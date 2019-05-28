// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'antd'
import uuid from 'uuid'

import { api } from 'api'
import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form } from 'components'
import { NamedRedirect, VIEWS } from 'routes'
import { logError, flattenArray, entries } from 'utils'
import type { Redux, Data, Section } from 'types'

type Props = {
  complete: boolean,
  answers: Data,
  sections: Array<Section>,
}

type State = {
  isLoading: boolean,
  isSuccess: boolean,
}

class _ReviewContainer extends React.Component<Props, State> {
  state = {
    isLoading: false,
    isSuccess: false,
  }
  onSubmit = () => {
    const { answers, sections } = this.props
    // This is a bit messy because we have fields with fields inside
    // ... maybe that was a stupid choice.
    this.setState({ isLoading: true })
    const questions = sections
      .map(s => s.forms.map(form => form.fields).reduce(flattenArray, []))
      .reduce(flattenArray, [])
      .map(field => (field.fields ? field.fields : field))
      .reduce((arr, f) => {
        if (Array.isArray(f)) return [...arr, ...f]
        return [...arr, f]
      }, [])
      .reduce((obj, field) => ({ ...obj, [field.name]: field }), {})

    const submission = {
      // Preserve ordering of answers
      id: uuid.uuid4(),
      complete: true,
      answers: entries(answers).map(([k, v]) => ({ name: k, answer: v })),
      questions,
    }
    api.questions.submission
      .create(submission)
      .then(() => this.setState({ isSuccess: true }))
      .catch((e, i) => {
        logError(e, i)
        this.setState({ isLoading: false })
      })
  }
  render() {
    const { complete, answers, sections } = this.props
    const { isLoading, isSuccess } = this.state
    if (!complete) {
      return <NamedRedirect to={VIEWS.HomeView} />
    }
    if (isSuccess) {
      return <NamedRedirect to={VIEWS.SubmittedView} />
    }
    return (
      <div>
        <h1>Review your answers</h1>
        {sections.map(({ name, forms }) => (
          <div key={name}>
            <h2>{name}</h2>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={forms
                .map(f => f.fields)
                .reduce((a, f) => [...a, ...f], [])
                .filter(field => field.type !== 'FILE')
                .filter(field => answers[field.name])}
              renderItem={field => (
                <List.Item key={field.name}>
                  <List.Item.Meta title={field.prompt} />
                  {answers[field.name]}
                </List.Item>
              )}
            />
          </div>
        ))}
        <Button disabled={isLoading} onClick={this.onSubmit} type="primary">
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    )
  }
}

const mapState = (state: Redux) => ({
  answers: state.form.answers,
  complete: state.form.complete,
})
const mapActions = dispatch => ({})
export const ReviewContainer = connect(
  mapState,
  mapActions
)(_ReviewContainer)
