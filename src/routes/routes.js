// @flow
// All routes used by the app.
import type { Route } from 'types'

export const ROUTES: Array<Route> = [
  { path: '/', view: 'HomeView' },
  { path: '/submission/:submissionId/form/', view: 'FormView' },
  { path: '/submission/:submissionId/review/', view: 'ReviewView' },
  { path: '/submitted', view: 'SubmittedView' },

  {
    path: '/messages',
    children: [{ path: '/contact-landlord', view: 'ContactLandlordView' }],
  },
  { path: '/not-found', view: 'NotFoundView' },
  { path: '', view: 'NotFoundView' },
]
