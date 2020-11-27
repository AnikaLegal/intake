// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AnalyticsRouteListener } from 'analytics'
import { AppRoutes } from 'routes'

export const App = () => (
  <BrowserRouter>
    <AnalyticsRouteListener />
    <AppRoutes />
  </BrowserRouter>
)
