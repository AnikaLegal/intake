import React from 'react'
import { Route, Switch } from 'react-router-dom'

import * as views from 'views'
import { ErrorBoundary } from 'components/generic'
import ROUTES from './route-list'

// Transform a list of nested routes into a flat list which can be passed to Switch.
const buildRouteList = (routes, prefix = '') =>
  routes
    .map(({ path, children, view }) => [
      view ? buildRoute(view, prefix + path) : null,
      ...(children ? buildRouteList(children, prefix + path) : []),
    ])
    .reduce((list, vals) => [...list, ...vals], [])
    .filter(val => val)

// Build a single Route
const buildRoute = (view, path) => (
  <Route
    exact
    key={path}
    path={path}
    render={props => {
      console.log('ROUTE:', path)
      return renderPage(views[view])(props)
    }}
  />
)

// Render the supplied view, augmented with react-router props.
const renderPage = View => routerProps => (
  <ErrorBoundary>
    <View
      history={routerProps.history}
      location={routerProps.location}
      match={routerProps.match}
    />
  </ErrorBoundary>
)

const routeList = buildRouteList(ROUTES)

const Routes = () => <Switch>{routeList}</Switch>

export default Routes
