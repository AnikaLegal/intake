//@flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ErrorBoundary } from 'comps'
import { ROUTES } from 'consts'
import * as Views from 'views'

import { FormView } from 'views/form'

// Route to view mapping
const ROUTE_VIEWS = {
  // Splash views
  [ROUTES.LANDING]: Views.LandingView,
  [ROUTES.LANDING_REPAIRS]: Views.LandingView,
  [ROUTES.LANDING_COVID]: Views.LandingView,
  [ROUTES.INELIGIBLE]: Views.IneligibleView,
  [ROUTES.SUBMITTED]: Views.SubmittedView,
  [ROUTES.ABANDON]: Views.AbandonView,
  [ROUTES.NOT_FOUND]: Views.NotFoundView,
  // Form views
  [ROUTES.FORM]: FormView,
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
