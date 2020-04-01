// @flow
const SCROLL_ACTIONS = [
  'form/setNextPage',
  'form/setPrevPage',
  'form/submitSubmission',
]

export const scrollMiddleware = (store: any) => (next: Function) => (
  action: any
) => {
  // Scroll to the top of the page when the user progresses through the form.
  if (SCROLL_ACTIONS.includes(action.type)) {
    window.scrollTo(0, 0)
  }
  return next(action)
}
