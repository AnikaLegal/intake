// @flow
import * as React from 'react'

import { ROUTES, LINKS, FIELD_TYPES } from 'consts'
import { events } from 'analytics'
import { BaseForm } from './base'

import type { Form, Actions, Client, Data, Field } from 'types'

export class SubmitForm extends BaseForm implements Form {
  stage = 3

  async onSubmit(data: Data, history: any) {
    if (!this.client) return
    events.onFinishIntake()
    const promises = this.client?.issueSet.map((issue) =>
      this.actions.client.updateIssue({
        issueId: issue.id,
        updates: { isSubmitted: true },
      })
    )
    await Promise.all<any>(promises)
    const route = ROUTES.build(
      ROUTES.SUBMITTED,
      {
        ':qIdx': 0,
      },
      { client: this.client?.id }
    )
    history.push(route)
  }

  toForm() {
    return {}
  }

  toApi(data: Data) {
    return {}
  }

  getFieldCount(data: Data) {
    return FIELDS.length
  }

  getField(idx: number, data: Data) {
    return FIELDS[idx] || ['', null]
  }
}

const SUBMIT: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      By submitting this form, you are agreeing to our{' '}
      <a href={LINKS.PRIVACY_POLICY}>Privacy Policy</a>,{' '}
      <a href={LINKS.COLLECTIONS_STATEMENT}>Collections Statement</a> and
      website <a href={LINKS.TERMS_OF_USE}>Terms of Use</a>.
    </span>
  ),
  buttonText: 'Confirm',
}

export const FIELDS = [['SUBMIT', SUBMIT]]
