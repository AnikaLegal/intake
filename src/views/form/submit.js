// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/submit'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'

export const SubmitView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()

  const onSubmit = async (data: Data) => {
    if (!client) return
    const promises = client.issueSet.map((issue) =>
      actions.client.updateIssue({
        issueId: issue.id,
        updates: { isSubmitted: true },
      })
    )
    await Promise.all<any>(promises)
    history.push(ROUTES.SUBMITTED)
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
