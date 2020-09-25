// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/eligibility'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'

export const ClientEligibilityView = () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    if (!client) return
    const isEligible = data.IS_VICTORIAN && data.IS_TENANT
    await actions.client.updateClient({
      clientId: client.id,
      updates: { isEligible },
    })
    if (isEligible) {
      const route = ROUTES.ISSUES_FORM.replace(':id', client.id)
      history.push(route)
    } else {
      history.push(ROUTES.INELIGIBLE)
    }
  }
  return (
    <>
      <IntakeNavbar current={0} />
      <Form
        fields={FIELDS}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={{}}
      />
    </>
  )
}