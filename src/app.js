// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'state'
import { buildRoutes, ROUTES } from 'routes'
import { AnalyticsRouteListener } from 'analytics'
import { ErrorBoundary } from 'features/generic'
import * as Views from 'views'


// Inject views into route builder.
const AppRoutes = buildRoutes(Views, ErrorBoundary, ROUTES)

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <>
        <AnalyticsRouteListener />
        <AppRoutes />
      </>
    </BrowserRouter>
  </Provider>
)
