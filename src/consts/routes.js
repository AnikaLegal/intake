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
  CLIENT_FORM: '/intake/client/',
  ELIGIBILITY_FORM: '/intake/:id/eligibility/',
  ISSUES_FORM: '/intake/:id/issues/',
  ISSUE_DETAIL_FORM: '/intake/:id/issues/:issueId/',
  LANDLORD_FORM: '/intake/:id/landlord/',
  CONTACT_FORM: '/intake/:id/client/contact/',
  SUBMIT_FORM: '/intake/:id/submit/',
}
