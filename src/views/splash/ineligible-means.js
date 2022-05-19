// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleMeansView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          After assessing the facts of your case, we have determined your issue
          is outside of Anika’s current scope. Unfortunately, we are not able to
          assist you at this time.
        </Text.Header>
        <Text.Body splash>
          Based on your responses, your income is above our eligibility
          requirements. Due to our capacity, we must prioritise people who fall
          within our eligibility criteria. We hope that you understand our
          capacity limitations. If you are not eligible for free legal help, you
          might wish to get legal information from Consumer Affairs Victoria
          [link to infoline] or engage a private lawyer [link to LIV Legal
          Referrals]
        </Text.Body>
      </Splash.Content>
    </Splash.Container>
  )
}
