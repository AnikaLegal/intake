import type { Store, Action, Dispatch } from 'types'

const SCROLL_ACTIONS = ['FORM_NEXT', 'FORM_PREV']

export const scrollMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action
) => {
  // Scroll to the top of the page when the user progresses through the form.
  if (SCROLL_ACTIONS.includes(action.type)) {
    window.scrollTo(0, 0)
  }
  return next(action)
}
