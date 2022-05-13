// @flow
import React, { useState } from 'react'
import { Splash, Text, TextInput, Button, Form, Icon, BigButton } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import { theme } from '../../design/theme'
import type { FormFieldProps } from '../../comps/fields/types'
import type { Data } from 'types'

export const NoEmailView = ({
  onNext,
  onSkip,
  field,
  value,
  children,
}: FormFieldProps) => {
  useScrollTop()
  const [checked, setChecked] = useState(true)
  const handleClick = () => setChecked(!checked)
  const [data, setData] = useState()
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const onChange = (v) => {
    // $FlowFixMe
    setData((d) => ({ ...d, v }))
  }

  // Need to ensure form is valid before submitting
  // Once form is submitted reset values and pop up
  // With "Contact request submitted"

// index.js src\questions - for the api call when submitting form
// but also need to look inside intake code to see what api

  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash style={{ width: '500px' }}>
          Anika Legal is an online service, with the majority of communication
          and advice sent via email.
        </Text.Header>
        <Text.Body splash style={{ width: '500px' }}>
          If you don't have an email address, please complete the form below and
          we'll call you to see if we're able to help. If not then we'll be able
          to direct you to another organisation.
        </Text.Body>
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
              <input
                style={{ marginBottom: '25px' }}
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={false}
              />
              <input
                style={{ marginBottom: '15px' }}
                placeholder="Phone Number"
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
                I agree to share my details with Anika Legal by ticking this
                box.
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
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
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
