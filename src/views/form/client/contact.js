// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/contact'
import { ROUTES } from 'consts'
import { useRedux } from 'state'
import type { Data, Client } from 'types'

export const ClientContactView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    if (!client) return
    await actions.client.updateClient({
      clientId: client.id,
      updates: toApi(data),
    })
    history.push(ROUTES.SUBMIT_FORM.replace(':id', client.id))
  }
  return (
    <>
      <IntakeNavbar current={3} />
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
        DOB: client.dateOfBirth?.split('T')[0],
        PHONE: client.phoneNumber,
        AVAILIBILITY: client.callTime,
      }
    : {}

const toApi = (data: Data) => ({
  dateOfBirth: `${data.DOB}T00:00`,
  phoneNumber: data.PHONE,
  callTime: data.AVAILIBILITY,
})
