// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import * as Fields from 'questions/fields'
import { Form } from 'components'

export const stories = storiesOf('Form fields', module)

const FORM_FIELDS = [
  Fields.DEFECT_TYPE,
  Fields.DEFECT_DESCRIPTION,
  Fields.DEFECT_PHOTO,
  Fields.HAS_CONTACTED_LANDLORD,
  Fields.LANDLORD_CONTACT_METHOD,
  Fields.LANDLORD_CONTACT_DATE,
  Fields.LANDLORD_CONTACT_ATTEMPTS,
  Fields.LANDLORD_CONTACT_RECORDS,
  Fields.LANDLORD_HAS_AGENT,
  Fields.LANDLORD_NAME,
  Fields.LANDLORD_EMAIL,
  Fields.LANDLORD_PHONE,
  Fields.IS_VCAT_OK,
  Fields.VCAT_AVOID_REASON,
  Fields.LETTER_PERMISSION,
  Fields.CLIENT_NAME,
  Fields.CLIENT_RENTAL_ADDRESS,
  Fields.CLIENT_PERSONAL_ADDRESS,
  Fields.CLIENT_EMAIL,
  Fields.CLIENT_BUSINESS_PHONE,
  Fields.CLIENT_EVENING_PHONE,
  Fields.CLIENT_CONTACT_METHOD,
  Fields.CLIENT_REFERRAL,
  Fields.HAS_QUOTE,
  Fields.QUOTE_COST,
  Fields.CAN_PAY_QUOTE,
]

const FieldStory = ({ field }) => {
  const [data, setData] = useState({})
  const onChange = k => v => {
    console.warn('onChange', k, v)
    setData({ ...data, [k]: v })
  }
  return (
    <TestBox flex width={900} height={400}>
      <Form
        form={{
          name: 'TEST_FORM',
          fields: [{ ...field, valid: true, value: data[field.name] }],
          prompt: 'Test Field',
          validations: { [field.name]: [] },
        }}
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

for (let field of FORM_FIELDS) {
  stories.add(field.name, () => <FieldStory field={field} />)
}
