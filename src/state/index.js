// @flow
import { init } from '@rematch/core'
import { createLogger } from 'redux-logger'

import * as models from './models'

const logger = createLogger()
export const store = init({ models, redux: { middlewares: [logger] } })

export * from './hooks'
