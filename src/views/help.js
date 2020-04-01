// @flow
import React from 'react'
import { HelpContainer } from 'containers'
import { useParams } from 'react-router-dom'
import { NamedRedirect, VIEWS } from 'routes'
import { TOPICS } from 'consts'

const TOPIC_LIST = Object.values(TOPICS)

export const HelpView = () => {
  const { topic } = useParams()
  const isNoTopic = !topic || !TOPIC_LIST.includes(topic.toUpperCase())
  if (isNoTopic) return <NamedRedirect to={VIEWS.NotFoundView} />
  return <HelpContainer topic={topic.toUpperCase()} />
}
