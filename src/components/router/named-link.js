import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { buildPath } from './utils'
import styles from './named-link.module.scss'

// Use this instead of Link, so that we can keep track of linked URLs.
// and decouple route paths from their links.
const NamedLinkFactory = ROUTE_NAMES => {
  const NamedLink = ({ to, params = {}, ...args }) => {
    let target = buildPath(to, params)
    return <Link className={styles.link} to={target} {...args} />
  }
  NamedLink.propTypes = {
    to: PropTypes.oneOf(Object.values(ROUTE_NAMES)).isRequired,
    params: PropTypes.object,
  }
  return NamedLink
}

export default NamedLinkFactory
