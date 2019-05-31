// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import * as Forms from 'questions/forms'
import { Form } from 'components'

export const stories = storiesOf('Forms', module)

const FORMS = [
  Forms.DEFECT,
  Forms.HAS_QUOTE,
  Forms.QUOTE_COST,
  Forms.PERSONAL_PREFERENCES,
  Forms.LANDLORD_COMMS_CHECK,
  Forms.LANDLORD_COMMS_DETAILS,
  Forms.LANDLORD_DETAILS,
  Forms.VCAT_AVOID_REASON,
]

const FormStory = ({ form }) => {
  const [data, setData] = useState({})
  const onChange = k => v => {
    console.warn('onChange', k, v)
    setData({ ...data, [k]: v })
  }
  return (
    <TestBox flex width={900}>
      <Form
        form={form}
        rules={{}}
        onChange={onChange}
        data={data}
        hasNext
        hasBack
        isComplete={false}
        onNext={() => alert('next')}
        onBack={() => alert('back')}
        onComplete={() => alert('complete')}
      />
    </TestBox>
  )
}

for (let form of FORMS) {
  stories.add(form.name, () => <FormStory form={form} />)
}
