// @flow
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import type { State, Actions } from 'types'

export const useRedux = () => {
  const actions: Actions = useDispatch()
  const {
    client: { client, isLoading },
  }: State = useSelector((s) => s, shallowEqual)
  return { actions, client, isLoading }
}
