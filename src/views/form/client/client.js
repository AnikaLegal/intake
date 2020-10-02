// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { FIELDS } from 'forms/client'
import { ROUTES } from 'consts'
import { useRedux } from 'state'
import { getNextFormRoute } from 'utils'

import type { Data, Client, State, Actions } from 'types'

export const CreateClientView = () => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { actions, client, isLoading } = useRedux()

  const onSubmit = async (data: Data) => {
    let newClient = client
    if (newClient) {
      await actions.client.updateClient({
        clientId: newClient.id,
        updates: toApi(data),
      })
    } else {
      newClient = await actions.client.createClient(toApi(data))
      localStorage.setItem('clientId', newClient.id)
    }
    const route = getNextFormRoute(path, newClient, {})
    history.push(route)
  }
  return (
    <>
      <IntakeNavbar current={0} />
      <Form
        fields={FIELDS}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={toForm(client)}
      />
    </>
  )
}

const toForm = (client: ?Client): Data =>
  client
    ? {
        FIRST_NAME: client.firstName,
        LAST_NAME: client.lastName,
        EMAIL: client.email,
      }
    : {}

const toApi = (data: Data) => ({
  firstName: data.FIRST_NAME,
  lastName: data.LAST_NAME,
  email: data.EMAIL,
})
