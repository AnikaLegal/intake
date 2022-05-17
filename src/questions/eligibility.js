import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const ELIGIBILITY_QUESTIONS: Array<Field> = [{
    name: 'ELIGIBILITY_INTRO',
    stage: 1,
}]
