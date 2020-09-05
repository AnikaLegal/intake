// @flow
import * as React from 'react'
import styled from 'styled-components'

import { IMAGES } from 'consts'
import { theme } from './theme'
import { Navbar } from './navbar'

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

const HeroImage = styled.img``
const HeroContent = styled.div`
  max-width: 589px;
`
const HeroOuterEl = styled.div`
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
  @media (max-width: ${theme.screen.half}) {
    .swoosh {
      &.desktop {
        &.left {
          left: calc(-1000px + 40vw);
        }
        &.right {
          right: calc(-600px + 30vw);
        }
      }
    }
  }

  @media (max-width: ${theme.screen.mobile}) {
    box-sizing: border-box;
    padding: 0 16px 0 16px;
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
    padding: 0 16px 0 16px;
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
const FadeBottom = styled.div`
  height: 0;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  @media (max-width: ${theme.screen.mobile}) {
    height: 76px;
  }
  @media (max-width: ${theme.screen.small}) {
    height: 40px;
  }
  background: linear-gradient(
    360deg,
    #ffffff 21.06%,
    rgba(255, 255, 255, 0) 94.14%
  );
`

const HeroInnerEl = styled.div`
  width: 86vw;
  margin: 0 auto 0;
  padding-top: calc(22vh - 64px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${theme.screen.half}) {
    ${HeroImage} {
      width: 28vw;
    }
  }
  @media (max-width: ${theme.screen.mobile}) {
    width: 100%;
    padding-top: 89px;
    flex-direction: column-reverse;
    ${theme.switch({ left: `flex-direction: column;` })}
    ${HeroImage} {
      width: calc(100% - 2 * 16px);
      margin-bottom: 76px;
      max-height: 300px;
    }
  }
  @media (max-width: ${theme.screen.small}) {
    padding-top: 40px;
    ${HeroImage} {
      margin-bottom: 44px;
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
    <Navbar />
    <HeroInnerEl left={left}>{children}</HeroInnerEl>
    <FadeBottom />
  </HeroOuterEl>
)

export const Hero = {
  Container: HeroContainer,
  Image: HeroImage,
  Content: HeroContent,
}
