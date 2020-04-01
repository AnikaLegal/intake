// @flow
import React from 'react'
import { HelpContainer } from 'containers'
import { useTopic } from 'utils'

export const HelpView = () => {
  const topic = useTopic()
  return <HelpContainer topic={topic} />
}
