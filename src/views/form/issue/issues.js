// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { ROUTES } from 'consts'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/issues'
import { api } from 'api'
import { useRedux } from 'state'
import type { Data, Client } from 'types'

import { getNextIssueRoute } from './issue-detail'

export const ClientIssuesView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    if (!client) return
    const address = data.ADDRESS
    const clientIssues = data.ISSUES
    const promises = []
    const tenancy = client.tenancySet.find((t) => t)
    if (tenancy) {
      // Change the tenancy address
      promises.push(
        actions.client.updateTenancy({
          tenancyId: tenancy.id,
          updates: { address },
        })
      )
    } else {
      // Create the tenancy
      promises.push(
        actions.client.createTenancy({ client: client.id, address })
      )
    }
    for (let topic of clientIssues) {
      promises.push(actions.client.createIssue({ client: client.id, topic }))
    }
    const results = await Promise.all<any>(promises)
    const issues = results.slice(1)
    const route = getNextIssueRoute('', client.id, issues)
    history.push(route)
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form
        fields={FIELDS}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={toForm(client)}
      />
    </>
  )
}

const toForm = (client: ?Client): Data => {
  const formData = {}
  if (!client) return formData
  const tenancy = client.tenancySet.find((t) => t)
  if (tenancy) {
    formData['ADDRESS'] = tenancy.address
  }
  formData['ISSUES'] = client.issueSet.map((i) => i.topic)
  return formData
}
