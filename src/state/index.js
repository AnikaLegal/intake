// @flow
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { scrollMiddleware } from './middleware'
import { reducer } from './reducer'
import { actions } from './actions'
import { init } from './init'
export { actions }

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(
  scrollMiddleware,
  thunkMiddleware,
  loggerMiddleware
)
export const store = createStore(reducer, init, middleware)
