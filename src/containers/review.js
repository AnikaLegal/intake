import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

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
          <h3>{name}</h3>
          {forms
            .map(f => f.fields)
            .reduce((a, f) => [...a, ...f], [])
            .filter(field => answers[field.name])
            .map(field => (
              <div key={field.name}>
                {field.prompt}
                <br />
                {answers[field.name]}
              </div>
            ))}
        </div>
      ))}
      <Button type="primary">Submit</Button>
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
