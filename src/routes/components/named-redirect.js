// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'

import { buildPath } from '../utils'

type Props = {
  to: string,
  params?: { [string]: string },
}

// Use this instead of Redirect, so that we can keep track of our redirects,
// and decouple route paths from their redirects.
export const NamedRedirect = ({ to, params = {} }: Props) => {
  let target = buildPath(to, params)
  console.log(
    'Redirecting Route\nfrom:  ',
    window.location.pathname,
    '\nmatch: ',
    to,
    '\nto:    ',
    target
  )
  return (
    <Redirect
      to={{
        pathname: target,
      }}
    />
  )
}
