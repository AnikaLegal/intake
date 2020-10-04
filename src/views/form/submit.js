// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { events } from 'analytics'
import { IntakeNavbar, Form } from 'comps'
import { FIELDS } from 'forms/submit'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'
import { getNextFormRoute } from 'utils'

export const SubmitView = () => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { actions, client, isLoading } = useRedux()

  const onSubmit = async (data: Data) => {
    if (!client) return
    events.onFinishIntake()
    const promises = client.issueSet.map((issue) =>
      actions.client.updateIssue({
        issueId: issue.id,
        updates: { isSubmitted: true },
      })
    )
    await Promise.all<any>(promises)
    const route = getNextFormRoute(path, client, {})
    history.push(route)
  }
  return (
    <>
      <IntakeNavbar current={3} />
      <Form
        fields={FIELDS}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={{}}
      />
    </>
  )
}
