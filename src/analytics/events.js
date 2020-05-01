// @flow
// Facebook events should be one of the "standard events": https://www.facebook.com/business/help/402791146561655?id=1205376682832142
// gtag used for Adwords conversion tracking.
// fbq used for Facebook ads
export const events = {
  onStartIntake: (submissionId: string) => {
    // User starts the questionnaire
    gtag('event', 'startIntake', {
      event_category: 'questionnaire',
      event_label: submissionId,
    })
  },
  onFirstSave: (submissionId: string) => {
    // User save the questionnaire for the 1st time
    gtag('event', 'firstSave', {
      event_category: 'questionnaire',
      event_label: submissionId,
    })
  },
  onFinishIntake: (submissionId: string) => {
    // User submits the questionnaire
    gtag('event', 'finishIntake', {
      event_category: 'questionnaire',
      event_label: submissionId,
    })
    fbq('track', 'SubmitApplication')
  },
}
