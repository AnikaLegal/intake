// @flow
import React, { useEffect } from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'

const CLIENT_KEY = 'clientId'

export const SubmittedView = () => {
  useEffect(() => {
    localStorage.setItem(CLIENT_KEY, '')
  })
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
        <SplashButton primary>Continue</SplashButton>
        <a href={LINKS.HOME}>
          <SplashButton>Abandon case</SplashButton>
        </a>
      </Splash.Content>
    </Splash.Container>
  )
}
const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
