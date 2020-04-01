//@flow
import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { createLocation } from 'history'

import { TOPICS } from 'consts'
import type { Topic } from 'types'
import { VIEWS } from 'routes'

const DEFAULT_TOPIC = TOPICS.REPAIRS
const TOPIC_LIST = Object.values(TOPICS)

// Returns a topic if it is possible to select a topic from the URL
export const useTopic = (): Topic => {
  const notFoundLoc = createLocation(VIEWS.NotFoundView)
  const history = useHistory()
  const { topic } = useParams()
  if (!topic || !TOPIC_LIST.includes(topic.toUpperCase())) {
    history.push(notFoundLoc)
    return DEFAULT_TOPIC
  }
  return topic.toUpperCase()
}
