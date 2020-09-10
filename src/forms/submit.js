//@flow
// A form where the client submits their submissions.
import * as React from 'react'

import { FIELD_TYPES, LINKS } from 'consts'
import type { Field } from 'types'

const SUBMIT: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      By submitting this form, you are agreeing to our
      <a href={LINKS.PRIVACY_POLICY}>Privacy Policy</a>,
      <a href={LINKS.COLLECTIONS_STATEMENT}>Collections Statement</a>
      and website
      <a href={LINKS.TERMS_OF_USE}>Terms of Use</a>.
    </span>
  ),
  buttonText: 'Confirm',
}

export const FIELDS = {
  SUBMIT,
}
