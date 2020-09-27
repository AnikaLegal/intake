// @flow
import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from 'consts'

import type { State, Actions } from 'types'

const CLIENT_KEY = 'clientId'

export const useRedux = () => {
  const actions: Actions = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  let clientId
  if (id) {
    localStorage.setItem(CLIENT_KEY, id)
    clientId = id
  } else {
    clientId = localStorage.getItem(CLIENT_KEY)
  }
  const {
    client: { client, isLoading },
  }: State = useSelector((s) => s, shallowEqual)
  useEffect(() => {
    if (client || !clientId) return
    actions.client.loadClient(clientId).catch((e) => {
      console.error('Failed to fetch client with id', clientId)
      const route = ROUTES.build(ROUTES.CLIENT_FORM, { ':qIdx': 0 })
      history.push(route)
      localStorage.setItem(CLIENT_KEY, '')
      actions.client._setLoaded()
    })
  }, [])
  if (client?.issueSet.some((i) => i.isSubmitted)) {
    const route = ROUTES.build(ROUTES.SUBMITTED, { ':id': client?.id || '' })
    history.push(route)
  }

  return { actions, client, isLoading }
}
