// @flow
import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'
import styled from 'styled-components'
import type { Node } from 'react'

type Props = {
  visible: boolean,
  children: any,
}

export const ANIMATION_TIME = 400 // ms

export const FadeInOut = ({ visible, children }: Props) => {
  const nodeRef = React.useRef(null)
  return (
    <AnimationStyles>
      <CSSTransition
        nodeRef={nodeRef}
        in={visible}
        timeout={ANIMATION_TIME}
        classNames="fade-in-out"
        unmountOnExit
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </AnimationStyles>
  )
}

const AnimationStyles = styled.div`
  .fade-in-out-enter {
    opacity: 0.6;
  }
  .fade-in-out-enter-active {
    opacity: 1;
    transition: all ${ANIMATION_TIME}ms ease-out;
  }
  .fade-in-out-exit {
    opacity: 1;
  }
  .fade-in-out-exit-active {
    opacity: 0.6;
    transition: all ${ANIMATION_TIME / 2}ms ease-in;
  }
`
