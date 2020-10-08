// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { FIELDS } from 'forms/property-manager'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'
import { useRedux } from 'state'
import { getNextFormRoute, useScrollTop } from 'utils'

export const PropertyManagerSelectView = () => {
  useScrollTop()
  const history = useHistory()
  const { path } = useRouteMatch()

  const { actions, client, isLoading } = useRedux()
  const onSubmit = async (data: Data) => {
    const route = getNextFormRoute(path, client, { data })
    history.push(route)
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
