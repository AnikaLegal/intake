// @flow
import { TOPICS } from 'consts'

import { REPAIRS_SECTIONS } from './repairs'
import { COVID_SECTIONS } from './covid'
import type { Topic } from 'types'

export const getQuestions = (topic: Topic) => {
  if (topic === TOPICS.COVID) {
    return COVID_SECTIONS
  } else {
    return REPAIRS_SECTIONS
  }
}
