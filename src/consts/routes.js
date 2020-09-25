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
  ISSUE_REPAIRS_FORM: '/intake/:id/issues/repairs/',
  ISSUE_RENT_REDUCTION_FORM: '/intake/:id/issues/rent-reduction/',
  ISSUE_OTHER_FORM: '/intake/:id/issues/other/',
  PROPERTY_MANAGER_FORM: '/intake/:id/property-manager/',
  LANDLORD_FORM: '/intake/:id/property-manager/landlord/',
  AGENT_FORM: '/intake/:id/property-manager/agent/',
  CONTACT_FORM: '/intake/:id/client/contact/',
  SUBMIT_FORM: '/intake/:id/submit/',
}
