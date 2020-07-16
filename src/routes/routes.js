// @flow
// All routes used by the app.
import type { Route } from 'types'

export const ROUTES: Array<Route> = [
  { path: '/submission/:submissionId/form/', view: 'FormView' },
  { path: '/submission/:submissionId/review/', view: 'ReviewView' },
  { path: '/submission/:submissionId/submitted', view: 'SubmittedView' },
  {
    path: '/messages',
    children: [{ path: '/contact-landlord', view: 'ContactLandlordView' }],
  },
  { path: '/not-found', view: 'NotFoundView' },

  { path: '/:topic/help', view: 'HelpView' },
  { path: '/:topic/', view: 'HomeView' },
  { path: '/', view: 'HomeView' },
  { path: '', view: 'NotFoundView' },
]
