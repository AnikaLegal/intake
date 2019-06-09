// @flow
import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'styled-components'
import type { Node } from 'react'

type Props = {
  visible: boolean,
  children: Node,
}

const TRAVEL_X = 60 // px
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
    opacity: 0;
    transform: translateX(${TRAVEL_X}px);
  }

  .fade-in-out-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: all ${TIME}ms ease-in;
  }

  .fade-in-out-exit {
    opacity: 1;
  }

  .fade-in-out-exit-active {
    opacity: 0;
    transform: translateX(-${TRAVEL_X}px);
    transition: all ${TIME}ms ease-out;
  }
`
