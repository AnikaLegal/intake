import React, { Component } from 'react'
import { Form as AntForm, Button } from 'antd'
import { InputNumber } from 'antd';

import { FIELD_TYPES } from 'consts'
import { FORMS } from 'questions'
import { Page } from 'components'

export class HomeView extends Component {

  state = {
    idx: 0,
  }

  onNext = () => {
    const { idx } = this.state
    if (idx + 1 < FORMS.length) {
      this.setState({ idx: idx + 1 })
    }
  }

  render() {
    const { idx } = this.state
    return (
      <Page>
        <Form {...FORMS[idx]} />
        <Button type="primary" onClick={this.onNext}>Next</Button>
      </Page>
    )
  }
}

const Form = ({ name, fields, prompt, help }) => (
  <AntForm>
    <h2>{prompt}</h2>
    {fields.map(f => <Field key={f.name} {...f} />)}
  </AntForm>
)

const Field = ({
  name,
  type,
  prompt,
  placeholder,
  help,
  options,
}) => {
  // AntForm.Item
  switch (type) {
    case FIELD_TYPES.MULTICHOICE:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.TEXTAREA:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.FILE:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.DATE:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.BOOLEAN:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.TEXT:
      return (
        <p>{prompt}</p>
      )
    case FIELD_TYPES.NUMBER:
      return (
        <Form.Item>
          <p>{prompt}</p>
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={() => {}}
          />
        </Form.Item>
      )
  }
}
