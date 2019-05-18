// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'

import { buildPath } from './utils'

type Props = {
  to: string,
  params?: { [string]: any },
  args?: Array<any>,
}

// Use this instead of Redirect, so that we can keep track of our redirects,
// and decouple route paths from their redirects.
const NamedRedirectFactory = (ROUTE_NAMES: { [string]: string }) => {
  const NamedRedirect = ({ to, params = {}, ...args }: Props) => {
    let target = buildPath(to, params)
    console.warn(`Redirect on ${window.location.href} to ${to} as ${target}`)
    return <Redirect to={target} {...args} />
  }
  return NamedRedirect
}

export default NamedRedirectFactory
