// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const GeographyView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately we are currently only able to help with the residential
          rental issues in Victoria, Australia:
        </Text.Header>
        <Text.Body splash>
          Follow the links below to find local community legal centres in your
          state or territory that may be better placed to look into your matter.
          <ul>
            <li>
              <a target="_blank" href="https://www.clcnsw.org.au/">
                NSW
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.actlawsociety.asn.au/for-the-public/legal-help/community-legal-centres"
              >
                ACT
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.communitylegalqld.org.au/">
                QLD
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.clcsa.org.au/">
                SA
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.communitylegalwa.org.au/pages/faqs/category/clc-location?Take=26"
              >
                WA
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://nt.gov.au/community/multicultural-communities/support-for-communities/community-legal-services"
              >
                NT
              </a>
            </li>
            <li>
              <a target="_blank" href="http://www.clctas.org.au/">
                TAS
              </a>
            </li>
          </ul>
        </Text.Body>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
