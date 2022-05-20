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
          requirements.
        </Text.Body>
        <Text.Body splash>
          Due to our capacity, we must prioritise people who fall within our
          eligibility criteria. We hope that you understand our capacity
          limitations.
        </Text.Body>
        <Text.Body splash>
          If you are not eligible for free legal help, you might wish to get
          legal information from&nbsp;
          <a href="https://www.consumer.vic.gov.au/contact-us">
            Consumer Affairs Victoria
          </a>
          &nbsp;or engage a&nbsp;
          <a href="https://www.liv.asn.au/Referral">private lawyer.</a>
        </Text.Body>
      </Splash.Content>
    </Splash.Container>
  )
}
