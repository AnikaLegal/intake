//@flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ErrorBoundary } from 'comps'
import { ROUTES } from 'consts'
import * as Views from 'views'

import {
  ClientForm,
  ContactForm,
  EligibilityForm,
  IssueForm,
  RepairsIssueForm,
  RentReductionIssueForm,
  OtherIssueForm,
  PropertyManagerForm,
  SubmitForm,
} from 'forms'
import { FormView } from 'views/form'

// Route to view mapping
const ROUTE_VIEWS = {
  // Splash views
  [ROUTES.LANDING]: Views.LandingView,
  [ROUTES.INELIGIBLE]: Views.IneligibleView,
  [ROUTES.SUBMITTED]: Views.SubmittedView,
  [ROUTES.ABANDON]: Views.AbandonView,
  [ROUTES.NOT_FOUND]: Views.NotFoundView,
  // Form views
  [ROUTES.CLIENT_FORM]: FormView(ClientForm),
  [ROUTES.ELIGIBILITY_FORM]: FormView(EligibilityForm),
  [ROUTES.ISSUES_FORM]: FormView(IssueForm),
  [ROUTES.ISSUE_REPAIRS_FORM]: FormView(RepairsIssueForm),
  [ROUTES.ISSUE_RENT_REDUCTION_FORM]: FormView(RentReductionIssueForm),
  [ROUTES.ISSUE_OTHER_FORM]: FormView(OtherIssueForm),
  [ROUTES.PROPERTY_MANAGER_FORM]: FormView(PropertyManagerForm),
  [ROUTES.CONTACT_FORM]: FormView(ContactForm),
  [ROUTES.SUBMIT_FORM]: FormView(SubmitForm),
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
