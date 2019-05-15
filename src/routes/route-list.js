// @flow
// All routes used by the app.
import type { Route } from 'types'

export const ROUTES: Array<Route> = [
  { path: '/', view: 'HomeView' },
  { path: '/form', view: 'FormView' },
  { path: '/review', view: 'ReviewView' },
  { path: '/not-found', view: 'NotFoundView' },
  { path: '', view: 'NotFoundView' },
]
