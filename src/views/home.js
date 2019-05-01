import React, { Component } from 'react'
import { Form as AntForm, Button } from 'antd'
import { Input, InputNumber, Radio,   Upload, Icon } from 'antd'

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
    <h1>{prompt}</h1>
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
        <AntForm.Item>
          <Prompt>{prompt}</Prompt>
          <Radio.Group
            onChange={() => {}}
            value=""
          >
            {options.map(o => (
              <Radio key={o} value={o}>{o}</Radio>
            ))}
          </Radio.Group>
        </AntForm.Item>
      )
    case FIELD_TYPES.TEXTAREA:
      return (
        <AntForm.Item>
          <Prompt>{prompt}</Prompt>
          <Input.TextArea
            value=""
            rows={4}
            placeholder={placeholder}
            onChange={() => {}}
          />
        </AntForm.Item>
      )

    case FIELD_TYPES.FILE:
      return (
        <AntForm.Item>
          <Prompt>{prompt}</Prompt>
          <Upload>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </AntForm.Item>
      )
    case FIELD_TYPES.DATE:
      return (
        <Prompt>{prompt}</Prompt>
      )
    case FIELD_TYPES.BOOLEAN:
      return (
        <Prompt>{prompt}</Prompt>
      )
    case FIELD_TYPES.TEXT:
      return (
        <AntForm.Item>
          <Prompt>{prompt}</Prompt>
          <Input
            value=""
            placeholder={placeholder}
            onChange={() => {}}
          />
        </AntForm.Item>
      )
    case FIELD_TYPES.NUMBER:
      return (
        <AntForm.Item>
          <Prompt>{prompt}</Prompt>
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            placeholder={placeholder}
            onChange={() => {}}
          />
        </AntForm.Item>
      )
  }
}

const Prompt = ({ children }) => <h3>{children}</h3>
