// @flow
import * as React from 'react'
import styled from 'styled-components'

import { Icon } from './icons'
import { theme } from './theme'
import { IMAGES } from 'consts'

type Props = {
  onClose?: () => void,
  onBack?: () => void,
}

export const Navbar = ({ onClose, onBack }: Props) => {
  return (
    <NavbarEl>
      <div>{onBack && <Icon.Back onClick={onBack} />}</div>
      <img className="logo" src={IMAGES.LOGO.TEXT.COLOR.SVG} />
      <div>{onClose && <Icon.Close onClick={onClose} />}</div>
    </NavbarEl>
  )
}

const NavbarEl = styled.div`
  /* Default to small mobile screen */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 21.3px;
  .logo {
    height: 27.4px;
  }
  svg {
    height: 20.5px;
  }
  @media (min-width: ${theme.screen.small}) {
    /* Larger than small mobile screen */
    padding-top: 40px;
    .logo {
      height: 32px;
    }
    svg {
      height: 24px;
    }
  }

  @media (min-width: ${theme.screen.mobile}) {
    /* Larger than mobile */
    padding: 35px 60px 0 60px;
    height: 29px;
    .logo {
      display: none;
    }
    svg {
      height: 29px;
    }
  }
`
