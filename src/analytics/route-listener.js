// @flow
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// Sets up a listener for changes in the React Router history,
// and log them to Google Analytics.
export const AnalyticsRouteListener = withRouter(({ history, location }) => {
  useEffect(() => {
    history.listen((location, action) => {
      console.log('Logging path in analytics:', location.pathname)
      if (GA_ID) {
        console.log('Logging path to Google Analytics:', GA_ID)
        gtag('config', GA_ID, {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
        })
      }
    })
  }, [])
  return null
})
