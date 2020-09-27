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
  ELIGIBILITY_FORM: '/intake/:id/eligibility/question/:qIdx/',
  ISSUES_FORM: '/intake/:id/issues/question/:qIdx/',
  ISSUE_REPAIRS_FORM: '/intake/:id/issues/repairs/question/:qIdx/',
  ISSUE_RENT_REDUCTION_FORM:
    '/intake/:id/issues/rent-reduction/question/:qIdx/',
  ISSUE_OTHER_FORM: '/intake/:id/issues/other/question/:qIdx/',
  PROPERTY_MANAGER_FORM: '/intake/:id/property-manager/question/:qIdx/',
  LANDLORD_FORM: '/intake/:id/property-manager/landlord/question/:qIdx/',
  AGENT_FORM: '/intake/:id/property-manager/agent/question/:qIdx/',
  CONTACT_FORM: '/intake/:id/client/contact/question/:qIdx/',
  SUBMIT_FORM: '/intake/:id/submit/question/:qIdx/',

  build: (route: string, kwargs: { [string]: any }): string => {
    let r = route
    for (let k of Object.keys(kwargs)) {
      r = r.replace(k, kwargs[k])
    }
    return r
  },
}
