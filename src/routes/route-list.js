// All routes used by the app.
//
//    path: URL path to get to route
//    children: child routes to be rendered under path (optional)
//    view: view function to be rendered (optional)
//
// `buildNameLookup` will fail if two routes share a view.
const ROUTES = [
  { path: '/', view: 'HomeView' },
  { path: '/not-found', view: 'NotFoundView' },
  { path: '', view: 'NotFoundView' },
]

export default ROUTES
