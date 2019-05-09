import React from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'antd'

import { actions } from 'state'
import { FIELD_TYPES } from 'consts'
import { Form } from 'components'
import { NamedRedirect, ROUTE_NAMES } from 'components/router'

export const _ReviewContainer = ({ complete, answers, sections }) => {
  if (!complete) {
    return <NamedRedirect to={ROUTE_NAMES.HOME} />
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
      <Button
        onClick={() => alert('Pretend this did something!')}
        type="primary"
      >
        Submit
      </Button>
    </div>
  )
}

const mapState = state => ({
  answers: state.form.answers,
  complete: state.form.complete,
})
const mapActions = dispatch => ({})
export const ReviewContainer = connect(
  mapState,
  mapActions
)(_ReviewContainer)
