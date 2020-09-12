// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/other-issues'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'

export const OtherIssuesView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    history.push(ROUTES.ISSUES_FORM)
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form fields={FIELDS} onSubmit={onSubmit} />
    </>
  )
}
