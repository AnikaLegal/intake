// @flow
import React, { useState, useEffect } from 'react'
import {
  Splash,
  Text,
  TextInput,
  Button,
  Form,
  ErrorMessage,
  Icon,
  BigButton,
} from 'design'
import { IMAGES } from 'consts'
import { api } from 'api'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import { theme } from '../../design/theme'
import type { FormFieldProps } from '../../comps/fields/types'
import type { Field, Data } from 'types'

export const NoEmailView = ({
  onNext,
  onSkip,
  field,
  value,
  children,
}: FormFieldProps) => {
  useScrollTop()
  const [checked, setChecked] = useState(true)
  const [data, setData] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [formState, setFormState] = useState(false)
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({})

  const useForm = (initialValues) => {
    const handleSubmit = (e) => {
      if (e) {
        e.preventDefault()
      }
      console.log(inputs)
    }
    const handleInputChange = (e) => {
      e.persist()
      setInputs((inputs) => ({
        ...inputs,
        [e.target.name]: e.target.value,
      }))
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs,
    }
  }

  const validate = (inputs) => {
    const cond = '[0-9]'
    const cond2 = '[a-z, A-Z]'

    // Name Errors
    const errors = {}
    if (!inputs.name) {
      errors.name = 'Hold on, a name is required'
    } else if (!inputs.name.match(cond2)) {
      errors.name = "Hold on, that name doesn't look valid"
    }
    if (!inputs.phone_number) {
      // Phone Number Errors
      errors.phone_number = 'Hold on, a phone number is required'
    } else if (inputs.phone_number.trim().length < 12) {
      errors.phone_number = "Hold on, that phone number doesn't look valid"
    } else if (!inputs.phone_number.match(cond)) {
      errors.phone_number = "Hold on, that phone number doesn't look valid"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(inputs)
    const noErrors = Object.keys(validationErrors).length === 0
    setErrors(validationErrors)
    if (noErrors) {
      const finalData = { ...inputs }
      const subId = 1
      let sub
      sub = await api.submission.create(finalData)
      await api.submission.submit(sub.id)
      setFormState(true)
      console.log('Authenticated', inputs)
      handleReset()
    } else {
      console.log('errors try again', validationErrors)
    }
  }

  const handleReset = () => {
    setInputs({
      name: '',
      phone_number: '',
    })
  }

  const { handleInputChange } = useForm({
    name: '',
    phone_number: '',
    validate,
  })

  const handleClick = () => setChecked(!checked)

  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Anika Legal is an online service, with the majority of communication
          and advice sent via email.
        </Text.Header>
        <Text.Body splash>
          If you don't have an email address, please complete the form below and
          we'll call you to see if we're able to help. If not then we'll be able
          to direct you to another organisation.
          <OuterContainer>
            <OuterForm>
              <form
                onSubmit={handleSubmit}
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
                <InputEl
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputChange}
                  autoFocus={false}
                  required=""
                />
                {errors.name && (
                  <p className="error_wrapper">
                    <ErrorMessage>{errors.name}</ErrorMessage>
                  </p>
                )}
                <InputEl
                  placeholder="Phone Number"
                  name="phone_number"
                  type="tel"
                  value={inputs.phone_number}
                  onChange={handleInputChange}
                  autoFocus={false}
                  required=""
                />
                {errors.phone_number && (
                  <p className="error_wrapper">
                    <ErrorMessage>{errors.phone_number}</ErrorMessage>
                  </p>
                )}
                <Checkbox>
                  I agree to share my details with Anika Legal by ticking this
                  box.
                  <input
                    className="input"
                    onClick={handleClick}
                    type="checkbox"
                    checked={checked}
                    required
                  ></input>
                  <Checkmark className="check"></Checkmark>
                </Checkbox>
                <Button
                  primary
                  type="submit"
                  onClick={() => setModalShow(true)}
                >
                  Contact Us
                </Button>
                {formState && (
                  <p className="modal" show={modalShow}>
                    Contact request submitted
                  </p>
                )}
              </form>
            </OuterForm>
          </OuterContainer>
        </Text.Body>
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
  width: 100%;
`

const Checkbox = styled.label`
  display: block;
  position: relative;
  padding-top: 25px;
  padding-bottom: 40px;
  padding-left: 35px;
  user-select: none;
  line-height: 22px;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: #3f3f3f;

  @media (max-width: 350px) {
    font-size: 13px;
  }

  .input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked {
      ~ {
        .check {
          &:after {
            display: block;
          }
        }
      }
    }
  }
`

const Checkmark = styled.span`
  position: absolute;
  margin-top: 28px;
  cursor: pointer;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  border: 1.5px solid #505050;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: -13px;
    width: 8px;
    height: 22px;
    border: solid #438fef;
    border-width: 0 7px 7px 0;
    transform: rotate(45deg);
  }
`

const OuterForm = styled.div`
  padding-top: 15px;
  display: flex;
  flex-flow: column;
  text-align: left;
  justify-content: space-between;
  @media (max-width: 1300px) {
    flex-direction: column;
    padding-top: 30px;
  }
  .error_wrapper {
    margin-top: -25px;
    margin-bottom: 10px;
  }

  .modal {
    padding: 20px;
    border-radius: 14px;
    line-height: 100%;
    margin-top: 20px;
    color: #ebb900;
    font-weight: bold;
    background: #fff9e8;
    border: 2px solid #ebb900;
    display: flex;

    @media (max-width: 398px) {
      font-size: 15px;
    }
    @media (max-width: 385px) {
      font-size: 14px;
    }
    @media (max-width: 371px) {
      font-size: 13px;
    }
    @media (max-width: 359px) {
      font-size: 12px;
    }
    @media (max-width: 346px) {
      font-size: 11px;
    }
    @media (max-width: 333px) {
      font-size: 10px;
    }
  }
`

const InputEl = styled.input`
  font-size: ${theme.text.subtitle};
  margin-bottom: 25px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  color: ${theme.color.teal.primary};
  width: 100%;
  height: 40px;
  display: block;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  border-bottom: 2px solid ${theme.color.teal.quaternary};
  padding: 0;
  border-radius: 0;

  &::placeholder {
    color: ${theme.color.teal.quaternary};
  }
  &:focus {
    border-bottom: 2px solid ${theme.color.teal.primary};
  }
  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
  }

  @media (max-width: 350px) {
    font-size: 13px;
  }
`
