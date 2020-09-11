// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'

export const AbandonView = () => {
  const history = useHistory()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.DESK_LADY} />
      <Splash.Content>
        <Text.Header>Are you sure you want to abandon your case?</Text.Header>
        <Text.Body>
          Life can get busy quick and we appreciate the effort you have taken to
          start your journey with Anika. You are only a few steps away from
          creating a case and then we will take care of everthing else.
        </Text.Body>
        <SplashButton className="top" primary onClick={() => history.goBack()}>
          Continue
        </SplashButton>
        <a href={LINKS.HOME}>
          <SplashButton>Abandon case</SplashButton>
        </a>
      </Splash.Content>
    </Splash.Container>
  )
}
const SplashButton = styled(BigButton)`
  margin-top: 16px;
  &.top {
    margin-top: 50px;
  }
`

const LogoEl = styled.img`
  height: 122px;
  margin-bottom: 39px;
`
