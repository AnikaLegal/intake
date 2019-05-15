// @flow
import { ROUTES } from 'routes/route-list'
import NamedLinkFactory from './named-link'
import NamedRedirectFactory from './named-redirect'
import { buildNameLookup } from './utils'

const ROUTE_NAMES = buildNameLookup(ROUTES)
const NamedRedirect = NamedRedirectFactory(ROUTE_NAMES)
const NamedLink = NamedLinkFactory(ROUTE_NAMES)

export { ROUTE_NAMES, NamedRedirect, NamedLink }
