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
  [ROUTES.ELIGIBILITY_FORM]: Views.ClientEligibilityView,
  [ROUTES.ISSUES_FORM]: Views.ClientIssuesView,
  [ROUTES.ISSUE_REPAIRS_FORM]: Views.ClientIssuesDetailView('REPAIRS'),
  [ROUTES.ISSUE_RENT_REDUCTION_FORM]: Views.ClientIssuesDetailView(
    'RENT_REDUCTION'
  ),
  [ROUTES.ISSUE_OTHER_FORM]: Views.ClientIssuesDetailView('OTHER'),
  [ROUTES.PROPERTY_MANAGER_FORM]: Views.PropertyManagerSelectView,
  [ROUTES.LANDLORD_FORM]: Views.PropertyManagerDetailsView('landlord'),
  [ROUTES.AGENT_FORM]: Views.PropertyManagerDetailsView('agent'),
  [ROUTES.CONTACT_FORM]: Views.ClientContactView,
  [ROUTES.SUBMIT_FORM]: Views.SubmitView,
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
