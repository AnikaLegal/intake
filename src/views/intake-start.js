// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { ROUTES } from 'consts'
import { TextContainer, Navbar, Text, Button, theme } from 'design'

export const IntakeStartView = () => {
  const history = useHistory()
  const onBack = () => history.push(ROUTES.LANDING)
  const onClose = () => history.push(ROUTES.ABANDON)
  const progress = {
    current: 0,
    steps: ['About you', '1', '2', '3'],
  }
  // let progress = null
  return (
    <>
      <Navbar onBack={onBack} onClose={onClose} progress={progress} />
      <TextContainer>
        <Text.Header>
          First of all, congratulations on taking the first step in solving your
          rental issues.
        </Text.Header>

        <Button primary>Thank you</Button>
      </TextContainer>
    </>
  )
}
