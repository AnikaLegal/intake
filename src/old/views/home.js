// @flow
import React from 'react'
import { HomeContainer } from 'containers'
import { useParams } from 'react-router-dom'
import { NamedRedirect, VIEWS } from 'routes'
import { TOPICS } from 'consts'

const TOPIC_LIST = Object.values(TOPICS)

export const HomeView = () => {
  const { topic } = useParams()
  return <HomeContainer topic={topic ? topic.toUpperCase() : topic} />
}
