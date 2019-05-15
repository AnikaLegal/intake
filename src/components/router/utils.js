// @flow
import { entries } from 'utils'
import type { Route } from 'types'

// Converts HelloWorld to HELLO_WORLD
const camelCaseToUpper = str =>
  str
    .split('')
    .map((c, i) => {
      const isNotFirst = i > 0
      const isUpperCase = c.toUpperCase() === c
      return isNotFirst && isUpperCase ? `_${c}` : c.toUpperCase()
    })
    .join('')

const parseViewName = (str: string) =>
  str.slice(-4) === 'View' ? str.slice(0, -4) : str

// Transform a list of nested routes into a lookup table for NamedRedirect.
// This will not work if two routes have the same view
export const buildNameLookup = (
  routes: Array<Route>,
  prefix: string = ''
): { [string]: string } =>
  routes
    .filter(route => route.view)
    .map(({ path, children, view }) => {
      if (!view) return // For Flow
      const name = camelCaseToUpper(parseViewName(view))
      const childLookup = children
        ? buildNameLookup(children, prefix + path)
        : {}
      const nameLookup = name ? { [name.toUpperCase()]: prefix + path } : {}
      return { ...childLookup, ...nameLookup }
    })
    .reduce((lookup, childLookup) => ({ ...lookup, ...childLookup }), {})

// Build a path from a template and params
// eg.
//    template = '/foo/:id/bar'
//    params = { id: 1 }
//    returns '/foo/1/bar/'
export const buildPath = (template: string, params: { [string]: any } = {}) => {
  let target = template
  for (let [key, val] of entries(params)) {
    target = target.replace(`:${key}`, val)
  }
  return target
}
