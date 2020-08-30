// @flow
import * as React from 'react'
import styled from 'styled-components'

import { IMAGES } from 'consts'
import { theme } from './theme'

export const TextContainerOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const TextContainerInner = styled.div`
  max-width: 700px;
  padding-left: 16px;
  padding-right: 16px;
`

type Props = {
  children: React.Node,
}

export const TextContainer = ({ children }: Props) => (
  <TextContainerOuter>
    <TextContainerInner>{children}</TextContainerInner>
  </TextContainerOuter>
)

export const HeroImage = styled.img``
export const HeroContent = styled.div`
  max-width: 589px;
`
export const HeroOuterEl = styled.div`
  width: 100%;
  .swoosh {
    position: absolute;
    z-index: -1;
    top: 0;
    &.desktop {
      height: 100%;
      bottom: 0;
    }
    &.mobile {
      display: none;
    }
    &.mobile-small {
      display: none;
    }
    &.right {
      right: 0;
    }
    &.left {
      left: 0;
    }
  }
  @media (max-width: ${theme.screen.mobile}) {
    box-sizing: border-box;
    padding: 0 16px 76px 16px;
    .swoosh {
      &.mobile {
        display: block;
      }
      &.desktop {
        display: none;
      }
    }
  }
  @media (max-width: ${theme.screen.small}) {
    padding: 0 16px 40px 16px;
    .swoosh {
      &.mobile {
        display: none;
      }
      &.mobile-small {
        display: block;
      }
    }
  }
`
export const HeroInnerEl = styled.div`
  width: 86vw;
  margin: 0 auto 0;
  padding-top: 22vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${theme.screen.mobile}) {
    width: 100%;
    flex-direction: column-reverse;
    ${theme.switch({ left: `flex-direction: column;` })}
    ${HeroImage} {
      width: calc(100% - 2 * 16px);
    }
  }
`

type HeroProps = {
  children: React.Node,
  left: boolean,
}

const HeroContainer = ({ children, left }: HeroProps) => (
  <HeroOuterEl left={left}>
    {left ? (
      <>
        <img className="swoosh left desktop" src={IMAGES.SWOOSH.LEFT} />
        <img className="swoosh left mobile" src={IMAGES.SWOOSH.LEFT_MOBILE} />
        <img
          className="swoosh left mobile-small"
          src={IMAGES.SWOOSH.LEFT_MOBILE_SMALL}
        />
      </>
    ) : (
      <>
        <img className="swoosh right desktop" src={IMAGES.SWOOSH.RIGHT} />
        <img className="swoosh right mobile" src={IMAGES.SWOOSH.RIGHT_MOBILE} />
        <img
          className="swoosh right mobile-small"
          src={IMAGES.SWOOSH.RIGHT_MOBILE_SMALL}
        />
      </>
    )}
    <HeroInnerEl left={left}>{children}</HeroInnerEl>
  </HeroOuterEl>
)

export const Hero = {
  Container: HeroContainer,
  Image: HeroImage,
  Content: HeroContent,
}
