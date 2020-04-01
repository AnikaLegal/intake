// @flow
import { init } from '@rematch/core'
import { createLogger } from 'redux-logger'

import { scrollMiddleware } from './middleware'
import * as models from './models'

const logger = createLogger()
export const store = init({
  models,
  redux: {
    middlewares: [logger, scrollMiddleware],
  },
})
