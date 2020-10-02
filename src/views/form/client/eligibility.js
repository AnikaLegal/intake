// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { FIELDS } from 'forms/eligibility'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'
import { getNextFormRoute } from 'utils'

export const ClientEligibilityView = () => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    const route = getNextFormRoute(path, client, { data })
    history.push(route)
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
