// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// import { store } from 'state'
import { AnalyticsRouteListener } from 'analytics'
import { ErrorBoundary } from 'comps'
import { AppRoutes } from 'routes'
import { AppContainer } from 'design'

// <Provider store={store}>
export const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <AnalyticsRouteListener />
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </BrowserRouter>
  </ErrorBoundary>
)

// </Provider>
