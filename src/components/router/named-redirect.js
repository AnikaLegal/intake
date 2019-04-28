import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { buildPath } from './utils'

// Use this instead of Redirect, so that we can keep track of our redirects,
// and decouple route paths from their redirects.
const NamedRedirectFactory = ROUTE_NAMES => {
  const NamedRedirect = ({ to, params = {}, ...args }) => {
    let target = buildPath(to, params)
    console.warn(`Redirect on ${window.location.href} to ${to} as ${target}`)
    return <Redirect to={target} {...args} />
  }
  NamedRedirect.propTypes = {
    to: PropTypes.oneOf(Object.values(ROUTE_NAMES)).isRequired,
    params: PropTypes.object,
  }
  return NamedRedirect
}

export default NamedRedirectFactory
