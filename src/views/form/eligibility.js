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

export const ClientEligibilityView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    await api.client.create({
      firstName: data.FIRST_NAME,
      lastName: data.LAST_NAME,
      email: data.EMAIL,
    })
    history.push(ROUTES.ISSUES_FORM)
  }
  return (
    <>
      <IntakeNavbar current={0} />
      <Form fields={FIELDS} onSubmit={onSubmit} />
    </>
  )
}
