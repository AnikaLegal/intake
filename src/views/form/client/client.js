// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/client'
import { ROUTES } from 'consts'
import { useRedux } from 'state'

import type { Data, Client, State, Actions } from 'types'

export const CreateClientView = () => {
  const history = useHistory()
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
    const route = ROUTES.ELIGIBILITY_FORM.replace(':id', newClient.id)
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
