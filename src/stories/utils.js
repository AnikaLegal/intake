import React from 'react'
import { number } from '@storybook/addon-knobs'

export const TestBox = ({
  children,
  flex = false,
  width = null,
  height = null,
}) => {
  const w = number('Test Box Width', width, { min: 0 })
  const h = number('Test Box Height', height, { min: 0 })
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          padding: '20px',
          width: w ? `${w}px` : '',
          height: h ? `${h}px` : '',
          display: flex ? 'flex' : 'initial',
          alignItems: flex ? 'center' : 'initial',
          justifyContent: flex ? 'center' : 'initial',
        }}
      >
        {children}
      </div>
    </div>
  )
}
