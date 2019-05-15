// @flow
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { reducer } from './reducer'
import { actions } from './actions'
import { init } from './init'
export { actions }

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)
export const store = createStore(reducer, init, middleware)
