//@flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ErrorBoundary } from 'comps'
import { ROUTES } from 'consts'
import * as Views from 'views'

// Route to view mapping
const ROUTE_VIEWS = {
  // Splash views
  [ROUTES.LANDING]: Views.LandingView,
  [ROUTES.LANDING_REPAIRS]: Views.LandingView,
  [ROUTES.LANDING_COVID]: Views.LandingView,
  [ROUTES.LANDING_EVICTIONS]: Views.LandingView,
  [ROUTES.INELIGIBLE]: Views.IneligibleView,
  [ROUTES.INELIGIBLE_NO_EVICTIONS_NOTICE]: Views.IneligibleNoNoticeView,
  [ROUTES.INELIGIBLE_NOT_UNPAID_RENT]: Views.IneligibleNotUnpaidRentView,
  [ROUTES.INELIGIBLE_ALREADY_REMOVED]: Views.IneligibleAlreadyRemovedView,
  [ROUTES.SUBMITTED]: Views.SubmittedView,
  [ROUTES.NO_EMAIL]: Views.NoEmailView,
  [ROUTES.GEOGRAPHY]: Views.GeographyView,
  [ROUTES.LEGAL_SCOPE]: Views.LegalScopeView,
  [ROUTES.ABANDON]: Views.AbandonView,
  [ROUTES.NOT_FOUND]: Views.NotFoundView,
  [ROUTES.DOWNLOAD]: Views.DownloadQuestionsView,
  // Form views
  [ROUTES.FORM]: Views.FormView,
  [ROUTES.RESUME]: Views.ResumeView,
}

export const AppRoutes = () => (
  <ErrorBoundary>
    <Switch>
      {Object.keys(ROUTES)
        .filter((k) => k !== 'build')
        .map((k) => ROUTES[k])
        .map((p) => String(p))
        .map((path) => (
          <Route exact key={path} path={path} component={ROUTE_VIEWS[path]} />
        ))}
      <Route path="" component={Views.NotFoundView} />
    </Switch>
  </ErrorBoundary>
)
