// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/issues'
import { api } from 'api'
import type { Data } from 'types'

export const ClientIssuesView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    await api.client.create({
      firstName: data.FIRST_NAME,
      lastName: data.LAST_NAME,
      email: data.EMAIL,
    })
    history.push('/')
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form fields={FIELDS} onSubmit={onSubmit} />
    </>
  )
}
