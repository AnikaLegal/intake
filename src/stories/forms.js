// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import * as Fields from 'questions/fields'
import { Form } from 'components'

export const stories = storiesOf('Forms', module)

const FORMS = [
  Fields.DEFECT_FORM,
  Fields.HAS_QUOTE_FORM,
  Fields.QUOTE_COST_FORM,
  Fields.PERSONAL_PREFERENCES_FORM,
  Fields.LANDLORD_COMMS_CHECK_FORM,
  Fields.LANDLORD_COMMS_DETAILS_FORM,
  Fields.LANDLORD_DETAILS_FORM,
  Fields.VCAT_AVOID_REASON_FORM,
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
