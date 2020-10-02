// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { FIELDS as LANDLORD_FIELDS } from 'forms/property-landlord'
import { FIELDS as AGENT_FIELDS } from 'forms/property-agent'
import { useRedux } from 'state'
import { ROUTES } from 'consts'
import { getNextFormRoute } from 'utils'

import type { Data, Person } from 'types'

type Manager = 'agent' | 'landlord'

const FIELDS_LOOKUP = {
  landlord: LANDLORD_FIELDS,
  agent: AGENT_FIELDS,
}

export const PropertyManagerDetailsView = (managerType: Manager) => () => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const { actions, client, isLoading } = useRedux()
  const tenancy = client?.tenancySet.find((t) => t)
  const person = tenancy ? tenancy[managerType] : null
  if (client && !tenancy) {
    const route = ROUTES.build(
      ROUTES.ISSUES_FORM,
      { ':qIdx': 0 },
      { client: client.id }
    )
    history.push(route)
  }
  const fields = FIELDS_LOOKUP[managerType]
  const onSubmit = async (data: Data) => {
    if (!client) return
    if (person) {
      // Update the person
      await actions.client.updatePerson({
        personId: person.id,
        updates: toApi(data),
      })
    } else {
      // Create a person
      const create =
        managerType == 'agent'
          ? actions.client.createAgent
          : actions.client.createLandlord
      await create(toApi(data))
    }
    const route = getNextFormRoute(path, client, { data })
    history.push(route)
  }
  return (
    <>
      <IntakeNavbar current={2} />
      <Form
        fields={fields}
        onSubmit={onSubmit}
        isViewLoading={isLoading}
        initData={toForm(person)}
      />
    </>
  )
}

const toForm = (person: ?Person): Data =>
  person
    ? {
        NAME: person.fullName,
        ADDRESS: person.address,
        EMAIL: person.email,
        PHONE: person.phoneNumber,
      }
    : {}

const toApi = (data: Data) => ({
  fullName: data.NAME,
  address: data.ADDRESS,
  email: data.EMAIL,
  phoneNumber: data.PHONE,
})
