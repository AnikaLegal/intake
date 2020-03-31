// @flow
import { TOPICS } from 'consts'
import { getTopic } from 'utils'

import { REPAIRS_SECTIONS } from './repairs'
import { COVID_SECTIONS } from './covid'

const topic = getTopic()

let topicSections = []
if (topic === TOPICS.REPAIRS) {
  topicSections = REPAIRS_SECTIONS
} else if (topic === TOPICS.COVID) {
  topicSections = COVID_SECTIONS
}

export const SECTIONS = topicSections
