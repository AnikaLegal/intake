// @flow
import type { FormState } from 'types'

export const form: FormState = {
  id: '', // Empty
  answers: {},
  questions: [],
  page: 0,
  hasNext: false,
  hasPrev: false,
  validation: { valid: false, fields: {} },
  isSubmitted: false,
  isComplete: false,
  isLoading: true,
}
