// @flow
import form from './form/reducer'
import type { Redux } from 'types'
// Combine all our reducers into a single reducer lookup table.
const reducers = {
  ...form,
}

// The final reducer function, which we pass to Redux.
export const reducer = (state: Redux, action: { type: string }): Redux => {
  const func = reducers[action.type]
  if (!func) return { ...state }
  return func(state, action)
}
