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
      history.push(ROUTES.CLIENT_FORM)
      localStorage.setItem(CLIENT_KEY, '')
      actions.client._setLoaded()
    })
  }, [])
  return { actions, client, isLoading }
}
