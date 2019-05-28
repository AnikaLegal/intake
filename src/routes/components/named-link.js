// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'

import { buildPath } from '../utils'

type Props = {
  to: string,
  params?: { [string]: string },
  className?: string,
  children: React.Node,
}
// Use this instead of Link, so that we can keep track of linked URLs.
// and decouple route paths from their links.
export const NamedLink = ({ to, params = {}, children, className }: Props) => {
  let target = buildPath(to, params)
  return (
    <Link
      to={{
        pathname: target,
        search: window.location.search,
      }}
      style={{ textDecoration: 'none' }}
      className={className}
      children={children}
      onClick={() => window.scrollTo(0, 0)}
    />
  )
}
