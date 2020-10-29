// @flow
import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'styled-components'
import type { Node } from 'react'

type Props = {
  visible: boolean,
  children: any,
}

const TIME = 300 // ms

export const FadeInOut = ({ visible, children }: Props) => (
  <AnimationStyles>
    <CSSTransition
      in={visible}
      timeout={TIME}
      classNames="fade-in-out"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  </AnimationStyles>
)

const AnimationStyles = styled.div`
  .fade-in-out-enter {
    transform: translateX(100vw);
  }
  .fade-in-out-enter-active {
    transform: translateX(0px);
    transition: all ${TIME}ms ease;
  }
  .fade-in-out-exit {
    transform: translateX(0px);
  }
  .fade-in-out-exit-active {
    transform: translateX(-100vw);
    transition: all ${TIME}ms ease;
  }
`
