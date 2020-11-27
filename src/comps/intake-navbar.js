// @flow
import React from 'react'
import { useHistory } from 'react-router-dom'

import { PROGRESS, ROUTES } from 'consts'
import { Navbar } from 'design'

type Props = {
  current: number,
  onBack?: () => void,
}

export const IntakeNavbar = ({ current, onBack }: Props) => {
  const history = useHistory()
  const _onBack = () => (onBack ? onBack() : history.goBack())
  const onClose = () => history.push(ROUTES.ABANDON)
  const progress = { current: current, steps: PROGRESS.INTAKE }
  return <Navbar onBack={_onBack} onClose={onClose} progress={progress} />
}
