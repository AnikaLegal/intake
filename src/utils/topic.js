//@flow
// Tools to determine which topic we should use
import { TOPICS } from 'consts'
import { getQueryParams } from './querystring'
import type { Topic } from 'types'

export const getTopic = (): Topic => {
  const qsData = getQueryParams()
  // Use the topic set by the querystring
  for (let key of Object.keys(TOPICS)) {
    const topic = TOPICS[key]
    if (qsData.topic && qsData.topic.toLowerCase() === topic.toLowerCase())
      return topic
  }
  // Otherwise check whether the topic is in the domain name.
  const hostname: string = window.location.hostname
  for (let key of Object.keys(TOPICS)) {
    const topic = TOPICS[key]
    if (hostname.includes(topic.toLowerCase())) return topic
  }
  // Default to repairs
  return TOPICS.REPAIRS
}
