// @flow
import React, { useState, useEffect } from 'react'
import { Splash, Text, TextInput, Button, Form, Icon, BigButton } from 'design'
import { IMAGES } from 'consts'
import { api } from 'api'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import { theme } from '../../design/theme'
import type { FormFieldProps } from '../../comps/fields/types'
import type { Field, Data } from 'types'

// Improvement - Move the form functionality out into it's own file and then call it here.

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

  const useForm = (initialValues) => {
    const [inputs, setInputs] = useState(initialValues)
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
    // Name Errors
    const errors = {}
    if (!inputs.name) {
      errors.name = 'Name is required'
    }
    // Phone Number Errors
    const cond = '[0-9]'
    if (!inputs.phone_number) {
      errors.phone_number = 'Phone number is required'
    } else if (inputs.phone_number.trim().length < 12) {
      errors.phone_number = "Phone number isn't enough numbers"
    } else if (!inputs.phone_number.match(cond)) {
      errors.phone_number = 'Phone number is not valid'
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
      setInputs.name = ''
      inputs.phone_number = ''
    } else {
      console.log('errors try again', validationErrors)
    }
  }

  const { inputs, handleInputChange } = useForm({
    name: '',
    phone_number: '',
    validate,
  })

  const handleClick = () => setChecked(!checked)

  // const [inputValue, setInputValue] = useState({
  //   name: '',
  //   phone_number: '',
  // })

  // const [validation, setValidation] = useState({
  //   name: '',
  //   phone_number: '',
  // })

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setInputValue({ ...inputValue, [name]: value })
  // }

  // // Keeping track of the input values
  // const inputsHandler = (e) => {
  //   setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  // }

  // const checkValidation = () => {
  //   console.log('blah')
  //   let errors = validation

  //   // Name validation
  //   if (!inputValue.name.trim()) {
  //     errors.name = 'Name is required'
  //   } else {
  //     errors.name = ''
  //   }

  //   // Phone number validation
  //   const cond = '[0-9]'
  //   const phone_number = inputValue.phone_number
  //   if (!phone_number) {
  //     errors.phone_number = 'Phone number is required'
  //   } else if (phone_number.trim().length < 12) {
  //     errors.phone_number = "Phone number isn't enough characters"
  //   } else if (!phone_number.match(cond)) {
  //     errors.phone_number = 'Phone number is not valid'
  //   } else {
  //     console.log('blah')
  //     errors.phone_number = ''
  //   }
  //   console.log(errors)
  //   setValidation(errors)
  // }

  // useEffect(() => {
  //   checkValidation()
  // }, [inputValue])

  // Submitting the form data to Clerk
  // const handleSubmit = async (e) => {
  //   if (validation) {
  //     e.preventDefault()
  //     const finalData = { ...inputValue }
  //     const subId = 1
  //     let sub
  //     sub = await api.submission.create(finalData)
  //     await api.submission.submit(sub.id)
  //     setFormState(true)
  //     console.log('ubh')
  //     setInputValue({ name: '', phone_number: '' }) // Should this be placed before the await api.submission.submit(sub.id) ??? Or will it erase the data?
  //   } else {
  //     e.preventDefault()
  //     checkValidation()
  //   }
  // }

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
              <TextEl
                placeholder="Name"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                autoFocus={false}
                required=""
              />
              {errors.name && <p>{errors.name}</p>}
              <TextEl
                placeholder="Phone Number"
                name="phone_number"
                type="tel"
                value={inputs.phone_number}
                onChange={handleInputChange}
                autoFocus={false}
                required=""
              />
              {errors.phone_number && <p>{errors.phone_number}</p>}
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
              <Button primary type="submit" onClick={() => setModalShow(true)}>
                Contact Us
              </Button>
            </form>
            {formState && (
              <div
                show={modalShow}
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  lineHeight: '100%',
                  marginTop: '20px',
                  color: '#ebb900',
                  fontWeight: 'bold',
                  background: '#fff9e8',
                  border: '2px solid #ebb900',
                  display: 'block',
                }}
              >
                Contact request submitted
              </div>
            )}
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
`

const TextEl = styled.input`
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
`
