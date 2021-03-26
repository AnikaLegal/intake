//@flow
// Route names
export const ROUTES = {
  // Splash pages
  LANDING: '/',
  LANDING_REPAIRS: '/repairs/',
  LANDING_COVID: '/covid/',
  LANDING_EVICTIONS: '/evictions/',
  INELIGIBLE: '/ineligible/',
  INELIGIBLE_NO_EVICTIONS_NOTICE: '/ineligible/no-notice/',
  INELIGIBLE_NOT_UNPAID_RENT: '/ineligible/not-unpaid/',
  INELIGIBLE_ALREADY_REMOVED: '/ineligible/already-removed/',
  SUBMITTED: '/submitted/',
  ABANDON: '/abandon/',
  NOT_FOUND: '/not-found/',
  RESUME: '/resume/',
  DOWNLOAD: '/download/',
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
