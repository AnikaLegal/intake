// @flow
import type { Redux, Action, Reducer } from 'types'

import { reducer as form } from './form/reducer'
import { init as initialState } from './init'

const pipe = (...fns: Array<Reducer>) => (state: Redux, action: Action) =>
  fns.reduce((s, f) => f(s, action), state)

// The final reducer function, which we pass to Redux.
export const reducer: Reducer = (state, action) =>
  pipe(form)(state || initialState, action)
