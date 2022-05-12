// @flow
import React, { useState } from 'react'
import { TextInput, Button, Form, Icon } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import { theme } from './theme'
import type { FormFieldProps } from '../comps/fields/types'

// Need to create dropdown
// Need to create tick box

// Name
// Phone Number
// Where did you hear about us?
// Tick box
// Contact us

export const ContactForm = ({
  onNext,
  onSkip,
  field,
  value,
  onChange,
  children,
}: FormFieldProps) => {
  const [checked, setChecked] = useState(true)
  const handleClick = () => setChecked(!checked)

  return (
    <OuterContainer>
      <OuterForm>
        <form
          style={{
            boxShadow: '0px 4px 41px rgb(0 55 123 / 15%)',
            borderRadius: '12px',
            padding: '50px 55px 50px 55px',
            width: '100%',
            maxWidth: '630px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
          }}
        >
          {children}
          <TextInput
            style={{ marginBottom: '25px' }}
            placeholder="Name"
            type="text"
            value={value ? value.toLowerCase() : ''}
            onChange={onChange}
            autoFocus={false}
          />
          <TextInput
            style={{ marginBottom: '15px' }}
            placeholder="Phone Number"
            type="tel"
            value={value || ''}
            onChange={onChange}
            autoFocus={false}
          />
          <label
            style={{
              display: 'block',
              position: 'relative',
              paddingTop: '20px',
              paddingBottom: '30px',
              paddingLeft: '35px',
              userSelect: 'none',
              lineHeight: '22px',
              fontSize: '16px',
              letterSpacing: '0.02em',
              color: '3f3f3f',
            }}
          >
            I agree to share my details with Anika Legal by ticking this box.
            <input
              onClick={handleClick}
              type="checkbox"
              checked={checked}
              required
              style={{
                position: 'absolute',
                marginTop: '23px',
                cursor: 'pointer',
                top: '0',
                left: '0',
                height: '18px',
                width: '18px',
                border: '1.5px solid 505050',
              }}
            ></input>
          </label>
          <Button primary type="submit">
            Contact Us
          </Button>
        </form>
      </OuterForm>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  display: block;
  text-align: center;
  width: 500px;
`

const OuterForm = styled.div`
  padding-top: 15px;
  display: flex;
  text-align: left;
  justify-content: space-between;
  @media (max-width: 1300px) {
    flex-direction: column;
    padding-top: 30px;
  }
`
