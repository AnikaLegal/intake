// @flow
import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router-dom'

import { flattenArray, entries } from 'utils'
import type { Route, View as ViewType } from 'types'

type ViewModule = { [ViewType]: any }

export const buildRoutes = (
  Views: ViewModule,
  ErrorBoundary: React.ComponentType<any>,
  routeList: Array<Route>
) => {
  const routes = buildRouteList(Views, ErrorBoundary, routeList)
  const Routes = () => <Switch>{routes}</Switch>
  return Routes
}

// Transform a list of nested routes into a flat list
// which can be passed to a Switch.
// FIXME - log an error if a View is not found for a given view name
const buildRouteList = (
  Views: { [ViewType]: React.AbstractComponent<any> },
  ErrorBoundary: React.AbstractComponent<any>,
  routeList: Array<Route>,
  prefix: string = ''
): Array<?React$Element<any>> =>
  routeList
    .map(({ path, children, view }) => [
      view ? buildRoute(Views[view], ErrorBoundary, prefix + path) : null,
      ...(children
        ? buildRouteList(Views, ErrorBoundary, children, prefix + path)
        : []),
    ])
    .reduce(flattenArray)
    .filter(val => val)

// Build a single Route
const buildRoute = (
  View: React.AbstractComponent<any>,
  ErrorBoundary: React.AbstractComponent<any>,
  path: string
) => (
  <RouterRoute
    exact={true}
    key={path}
    path={path}
    render={props => {
      const {
        location: { pathname },
      } = props
      console.log(
        'Rendering Route\nmatch: ',
        path || 'NOT FOUND',
        '\nactual:',
        pathname
      )
      return renderPage(View, ErrorBoundary)(props)
    }}
  />
)

// Render the supplied view, augmented with react-router props.
// Force a re-render if parameters change
const renderPage = (
  View: React.AbstractComponent<any>,
  ErrorBoundary: React.AbstractComponent<any>
) => routerProps => (
  <ErrorBoundary>
    <View
      history={routerProps.history}
      location={routerProps.location}
      match={routerProps.match}
    />
  </ErrorBoundary>
)

// Transform a list of nested routes into a lookup table
// for NamedRedirect and NamedLink.
export const buildNameLookup = (
  routes: Array<Route>,
  prefix: string = ''
): { [ViewType]: string } =>
  routes
    .map(({ path, children, view }) => {
      const childLookup = children
        ? buildNameLookup(children, prefix + path)
        : {}
      const viewLookup = view ? { [view]: prefix + path } : {}
      return { ...childLookup, ...viewLookup }
    })
    .reduce((lookup, childLookup) => ({ ...lookup, ...childLookup }), {})

// Build a path from a template and params
// eg.
//    template = '/foo/:id/bar'
//    params = { id: 1 }
//    returns '/foo/1/bar/'
export const buildPath = (
  template: string,
  params: { [string]: string | number } = {}
) => {
  let target = template
  for (let [key, val] of entries(params)) {
    target = target.replace(`:${key}`, String(val))
  }
  return target
}
