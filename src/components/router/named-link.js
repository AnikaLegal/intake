// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { buildPath } from './utils'
// @noflow
import styles from './named-link.module.scss'

type Props = {
  to: string,
  params?: { [string]: any },
  args?: Array<any>,
}

// Use this instead of Link, so that we can keep track of linked URLs.
// and decouple route paths from their links.
const NamedLinkFactory = (ROUTE_NAMES: { [string]: string }) => {
  const NamedLink = ({ to, params = {}, ...args }: Props) => {
    let target = buildPath(to, params)
    return <Link className={styles.link} to={target} {...args} />
  }
  return NamedLink
}

export default NamedLinkFactory
