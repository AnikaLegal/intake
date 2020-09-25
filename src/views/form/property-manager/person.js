// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS as LANDLORD_FIELDS } from 'forms/property-landlord'
import { FIELDS as AGENT_FIELDS } from 'forms/property-agent'
import { useRedux } from 'state'
import { ROUTES } from 'consts'
import type { Data, Person } from 'types'

type Manager = 'agent' | 'landlord'

const FIELDS_LOOKUP = {
  landlord: LANDLORD_FIELDS,
  agent: AGENT_FIELDS,
}

export const PropertyManagerDetailsView = (managerType: Manager) => () => {
  const history = useHistory()
  const { actions, client, isLoading } = useRedux()
  const tenancy = client?.tenancySet.find((t) => t)
  const person = tenancy ? tenancy[managerType] : null
  if (client && !tenancy) {
    history.push(ROUTES.ISSUES_FORM.replace(':id', client.id))
  }
  const fields = FIELDS_LOOKUP[managerType]
  const onSubmit = async (data: Data) => {
    history.push(ROUTES.CONTACT_FORM)
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
