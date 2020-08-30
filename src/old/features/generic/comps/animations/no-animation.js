// @flow
import React from 'react'
import type { Node } from 'react'

type Props = {
  visible: boolean,
  children: Node,
}

export const NoAnimation = ({ visible, children }: Props) =>
  visible ? children : null
