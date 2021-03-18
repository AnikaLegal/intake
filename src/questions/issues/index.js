//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

import { RENT_REDUCTION_QUESTIONS } from './rent-reduction'
import { REPAIRS_QUESTIONS } from './repairs'
import { EVICTION_QUESTIONS } from './evictions'

export const ISSUE_QUESTIONS: Array<Field> = [
  ...REPAIRS_QUESTIONS,
  ...RENT_REDUCTION_QUESTIONS,
  ...EVICTION_QUESTIONS,
]
