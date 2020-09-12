// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/contact'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'

export const ClientContactView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    history.push(ROUTES.SUBMIT_FORM)
  }
  return (
    <>
      <IntakeNavbar current={3} />
      <Form fields={FIELDS} onSubmit={onSubmit} />
    </>
  )
}
