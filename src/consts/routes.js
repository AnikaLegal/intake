//@flow
// Route names
export const ROUTES = {
  // Splash pages
  LANDING: '/',
  INELIGIBLE: '/ineligible/',
  SUBMITTED: '/submitted/',
  ABANDON: '/abandon/',
  NOT_FOUND: '/not-found/',
  // Form pages
  CLIENT_FORM: '/intake/client/question/:qIdx/',
  ELIGIBILITY_FORM: '/intake/eligibility/question/:qIdx/',
  ISSUES_FORM: '/intake/issues/question/:qIdx/',
  ISSUE_REPAIRS_FORM: '/intake/issues/repairs/question/:qIdx/',
  ISSUE_RENT_REDUCTION_FORM: '/intake/issues/rent-reduction/question/:qIdx/',
  ISSUE_OTHER_FORM: '/intake/issues/other/question/:qIdx/',
  PROPERTY_MANAGER_FORM: '/intake/property-manager/question/:qIdx/',
  CONTACT_FORM: '/intake/client/contact/question/:qIdx/',
  SUBMIT_FORM: '/intake/submit/question/:qIdx/',

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
