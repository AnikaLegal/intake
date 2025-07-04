//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

import { REPAIRS_QUESTIONS } from './repairs'
import { EVICTION_ARREARS_QUESTIONS } from './eviction-arrears'
import { EVICTION_RETALIATORY_QUESTIONS } from './eviction-retaliatory'
import { BONDS_QUESTIONS } from './bonds'

export const ISSUE_QUESTIONS: Array<Field> = [
  ...REPAIRS_QUESTIONS,
  ...EVICTION_ARREARS_QUESTIONS,
  ...EVICTION_RETALIATORY_QUESTIONS,
  ...BONDS_QUESTIONS,
]
