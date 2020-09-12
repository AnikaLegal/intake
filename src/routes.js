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
  [ROUTES.REPAIR_ISSUE_FORM]: Views.RepairsView,
  [ROUTES.COVID_ISSUE_FORM]: Views.RentReductionView,
  [ROUTES.OTHER_ISSUE_FORM]: Views.OtherIssuesView,
  [ROUTES.LANDLORD_FORM]: Views.LandlordView,
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
