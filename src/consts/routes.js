//@flow
// Route names
export const ROUTES = {
  // Splash pages
  LANDING: '/',
  LANDING_REPAIRS: '/repairs/',
  LANDING_COVID: '/covid/',
  INELIGIBLE: '/ineligible/',
  SUBMITTED: '/submitted/',
  ABANDON: '/abandon/',
  NOT_FOUND: '/not-found/',
  RESUME: '/resume/',
  // Form pages
  FORM: '/intake/form/:qIdx/',
  build: (
    route: string,
    pathArgs: { [string]: any },
    qsArgs: { [string]: any }
  ): string => {
    let r = route
    for (let k of Object.keys(pathArgs)) {
      r = r.replace(k, pathArgs[k])
    }
    const qs = new URLSearchParams(qsArgs).toString()
    if (qs) {
      r = `${r}?${qs}`
    }
    return r
  },
}
