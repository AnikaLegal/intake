// @flow
import { buildNameLookup } from '../utils'
import { ROUTES } from '../routes'

export const VIEWS = buildNameLookup(ROUTES)
