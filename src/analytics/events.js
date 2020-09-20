// @flow
// Facebook events should be one of the "standard events": https://www.facebook.com/business/help/402791146561655?id=1205376682832142
// gtag used for Adwords conversion tracking.
// fbq used for Facebook ads
export const events = {
  onStartIntake: (id: string) => {
    // User starts the questionnaire
    gtag('event', 'startIntake', {
      event_category: 'questionnaire',
      event_label: id,
    })
  },
  onFirstSave: (id: string) => {
    // User save the questionnaire for the 1st time
    gtag('event', 'firstSave', {
      event_category: 'questionnaire',
      event_label: id,
    })
  },
  onFinishIntake: (id: string) => {
    // User submits the questionnaire
    gtag('event', 'finishIntake', {
      event_category: 'questionnaire',
      event_label: id,
    })
    fbq('track', 'SubmitApplication')
  },
}
