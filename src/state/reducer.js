import generic from './generic/reducer'
import user from './user/reducer'

// Combine all our reducers into a single reducer lookup table.
const reducers = {
  ...generic,
  ...user,
}

// The final reducer function, which we pass to Redux.
export const reducer = (state, action) => {
  const func = reducers[action.type]
  if (!func) return { ...state }
  return func(state, action)
}
