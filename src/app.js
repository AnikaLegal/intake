// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'state'
import { AnalyticsRouteListener } from 'analytics'
import { AppRoutes } from 'routes'
import { AppContainer } from 'design'

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AnalyticsRouteListener />
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)
