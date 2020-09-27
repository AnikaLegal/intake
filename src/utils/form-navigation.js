//@flow
import { useRouteMatch } from 'react-router-dom'

import { ROUTES } from 'consts'
import type { Data, Client, Topic } from 'types'

const NEXT_ROUTE = {
  [ROUTES.CLIENT_FORM]: ROUTES.ELIGIBILITY_FORM,
  [ROUTES.LANDLORD_FORM]: ROUTES.CONTACT_FORM,
  [ROUTES.AGENT_FORM]: ROUTES.CONTACT_FORM,
  [ROUTES.CONTACT_FORM]: ROUTES.SUBMIT_FORM,
  [ROUTES.SUBMIT_FORM]: ROUTES.SUBMITTED,
}
const ISSUE_ROUTES = [
  ROUTES.ISSUES_FORM,
  ROUTES.ISSUE_REPAIRS_FORM,
  ROUTES.ISSUE_RENT_REDUCTION_FORM,
  ROUTES.ISSUE_OTHER_FORM,
]
const TOPIC_ROUTES = {
  REPAIRS: ROUTES.ISSUE_REPAIRS_FORM,
  RENT_REDUCTION: ROUTES.ISSUE_RENT_REDUCTION_FORM,
  OTHER: ROUTES.ISSUE_OTHER_FORM,
  END_ISSUE: ROUTES.PROPERTY_MANAGER_FORM,
}
const NEXT_TOPIC = {
  START_ISSUE: 'REPAIRS', // START_ISSUE is a dummy topic
  REPAIRS: 'RENT_REDUCTION',
  RENT_REDUCTION: 'OTHER',
  OTHER: 'END_ISSUE', // END_ISSUE is a dummy topic
}

type Kwargs = {
  issueTopic?: string,
  data?: Data,
}

export const getNextFormRoute = (
  path: string,
  client: ?Client,
  kwargs: Kwargs
): string => {
  console.warn('Using path', path)
  if (!client) {
    // No client, so send them to client creation
    return ROUTES.build(ROUTES.CLIENT_FORM, { ':qIdx': 0 })
  } else if (Object.keys(NEXT_ROUTE).includes(path)) {
    // Routing covered by "next route" lookup table,
    return ROUTES.build(NEXT_ROUTE[path], {
      ':id': client.id,
      ':qIdx': 0,
    })
  } else if (kwargs.issueTopic && ISSUE_ROUTES.includes(path)) {
    // Do special routing for issues.
    const topics = client.issueSet.map((i) => i.topic).concat(['END_ISSUE'])
    let thisTopic: string = kwargs.issueTopic || ''
    let nextTopic = null
    while (nextTopic == null) {
      thisTopic = NEXT_TOPIC[thisTopic]
      if (topics.includes(thisTopic)) {
        nextTopic = thisTopic
        break
      }
    }
    if (!nextTopic) {
      throw Error('Could not find a next topic.')
    }
    return ROUTES.build(TOPIC_ROUTES[nextTopic], {
      ':id': client.id,
      ':qIdx': 0,
    })
  } else if (kwargs.data && path == ROUTES.ELIGIBILITY_FORM) {
    // Route to either issues or ineliguble
    const isEligible = kwargs.data.IS_VICTORIAN && kwargs.data.IS_TENANT
    if (!isEligible) return ROUTES.INELIGIBLE
    return ROUTES.build(ROUTES.ISSUES_FORM, { ':id': client.id, ':qIdx': 0 })
  } else if (kwargs.data && path == ROUTES.PROPERTY_MANAGER_FORM) {
    // Route to either agent or landlord
    let routeName = kwargs.data.IS_AGENT
      ? ROUTES.AGENT_FORM
      : ROUTES.LANDLORD_FORM
    return ROUTES.build(routeName, { ':id': client.id, ':qIdx': 0 })
  } else {
    throw Error('No route found.')
  }
}
