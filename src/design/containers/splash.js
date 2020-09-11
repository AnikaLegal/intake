// @flow
import * as React from 'react'
import styled from 'styled-components'

import { IMAGES } from 'consts'
import { theme } from '../theme'
import { Navbar } from '../navbar'

const SplashImage = styled.img``
const SplashContent = styled.div`
  max-width: 589px;
`
const SplashOuterEl = styled.div`
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

const SplashInnerEl = styled.div`
  width: 86vw;
  max-width: 1227px;
  margin: 0 auto 0;
  padding-top: calc(22vh - 64px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${theme.screen.half}) {
    ${SplashImage} {
      width: 28vw;
    }
  }
  @media (max-width: ${theme.screen.mobile}) {
    width: 100%;
    padding-top: 161px;
    flex-direction: column-reverse;
    ${theme.switch({ left: `flex-direction: column;` })}
    ${SplashImage} {
      width: calc(100% - 2 * 16px);
      margin-bottom: 76px;
      max-height: 300px;
    }
  }
  @media (max-width: ${theme.screen.small}) {
    padding-top: 89px;
    ${SplashImage} {
      margin-bottom: 44px;
    }
  }
`

type SplashProps = {
  children: React.Node,
  left: boolean,
}

const SplashContainer = ({ children, left }: SplashProps) => (
  <SplashOuterEl left={left}>
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
    <SplashInnerEl left={left}>{children}</SplashInnerEl>
    <FadeBottom />
  </SplashOuterEl>
)

export const Splash = {
  Container: SplashContainer,
  Image: SplashImage,
  Content: SplashContent,
}
