// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import { store } from 'state'
import { buildRoutes, ROUTES } from 'routes'
import { AnalyticsRouteListener } from 'analytics'
import { ErrorBoundary } from 'features/generic'
import * as Views from 'views'

// @noflow
import 'styles/index.scss'

// Inject views into route builder.
const AppRoutes = buildRoutes(Views, ErrorBoundary, ROUTES)

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <AnalyticsRouteListener />
        <AppRoutes />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
)

export default hot(App)
