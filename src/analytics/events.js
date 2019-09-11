// @flow
export const events = {
  // User's first save of the questionnaire.
  // Use for Adwords conversion tracking.
  onFirstSave: (submissionId: string) => {
    gtag('event', 'firstSave', {
      event_category: 'questionnaire',
      event_label: submissionId,
    })
  },
}
