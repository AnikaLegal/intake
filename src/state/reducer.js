import generic from './generic/reducer'
import form from './form/reducer'

// Combine all our reducers into a single reducer lookup table.
const reducers = {
  ...generic,
  ...form,
}

// The final reducer function, which we pass to Redux.
export const reducer = (state, action) => {
  const func = reducers[action.type]
  if (!func) return { ...state }
  return func(state, action)
}
