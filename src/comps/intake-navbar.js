// @flow
import React from 'react'
import { useHistory } from 'react-router-dom'

import { PROGRESS, ROUTES } from 'consts'
import { Navbar } from 'design'

type Props = {
  current: number,
}

export const IntakeNavbar = ({ current }: Props) => {
  const history = useHistory()
  const onBack = () => history.goBack()
  const onClose = () => history.push(ROUTES.ABANDON)
  const progress = { current: current, steps: PROGRESS.INTAKE }
  return <Navbar onBack={onBack} onClose={onClose} progress={progress} />
}
