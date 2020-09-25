// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/property-manager'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'

export const PropertyManagerSelectView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    if (!client) return
    let route = data.IS_AGENT ? ROUTES.AGENT_FORM : ROUTES.LANDLORD_FORM
    history.push(route.replace(':id', client.id))
  }
  return (
    <>
      <IntakeNavbar current={2} />
      <Form
        fields={FIELDS}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={{}}
      />
    </>
  )
}
