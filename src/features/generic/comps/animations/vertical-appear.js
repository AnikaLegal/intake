// @flow
import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'styled-components'
import type { Node } from 'react'

type Props = {
  visible: boolean,
  children: Node,
}

const TIME = 500 // ms

export const VerticalAppear = ({ visible, children }: Props) => (
  <AnimationStyles>
    <CSSTransition
      in={visible}
      timeout={TIME}
      classNames="appear"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  </AnimationStyles>
)

const AnimationStyles = styled.div`
  .appear-enter {
    opacity: 0;
    max-height: 0;
  }

  .appear-enter-active {
    opacity: 1;
    max-height: 250px;
    transition-timing-function: linear;
    transition-property: max-height, opacity;
    transition-delay: 0s, ${TIME / 2}ms;
    transition-duration: ${TIME / 2}ms, ${TIME / 2}ms;
  }

  .appear-exit {
    opacity: 1;
    max-height: 250px;
  }

  .appear-exit-active {
    opacity: 0;
    max-height: 0;
    transition-timing-function: linear;
    transition-property: opacity;
    transition-property: opacity, max-height;
    transition-delay: 0s, ${TIME / 2}ms;
    transition-duration: ${TIME / 2}ms, ${TIME / 2}ms;
  }
`
