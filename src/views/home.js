// @flow
import React from 'react'
import { HomeContainer } from 'containers'
import { useTopic } from 'utils'

export const HomeView = () => {
  const topic = useTopic()
  return <HomeContainer topic={topic} />
}
