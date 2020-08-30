// @flow
import React from 'react'

type Props = {
  size?: number,
  color?: string,
}

// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
export const LoadingSpinnerSVG = ({ size = 120, color = '#008897' }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="2">
        <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
)
