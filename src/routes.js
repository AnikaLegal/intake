//@flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ROUTES } from 'consts'
import * as Views from 'views'

// Route to view mapping
const ROUTE_VIEWS = {
  // Splash views
  [ROUTES.LANDING]: Views.LandingView,
  [ROUTES.INELIGIBLE]: Views.IneligibleView,
  [ROUTES.SUBMITTED]: Views.SubmittedView,
  [ROUTES.ABANDON]: Views.AbandonView,
  [ROUTES.NOT_FOUND]: Views.NotFoundView,
  // Form views
  [ROUTES.CLIENT_FORM]: Views.CreateClientView,
}

export const AppRoutes = () => (
  <Switch>
    {Object.values(ROUTES).map((path) => (
      // $FlowFixMe
      <Route exact key={path} path={path} component={ROUTE_VIEWS[path]} />
    ))}
    <Route path="" component={Views.NotFoundView} />
  </Switch>
)
