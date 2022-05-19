// @flow
import React, { useState, useEffect } from 'react'
import {
  Splash,
  Text,
  BigButton,
  Button,
  TextInput,
  ErrorMessage,
  Form,
} from 'design'
import { IMAGES, ROUTES, LINKS } from 'consts'
import { theme } from '../../design/theme'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import { api } from 'api'
import type { FormFieldProps } from '../../comps/fields/types'
import type { Field, Data } from 'types'

export const AssessCircumstancesView = ({
  onNext,
  onChange,
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
    // Name Errors
    const errors = {}
    if (!inputs.text) {
      errors.name = 'Hold on, no text has been entered'
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
      text: '',
    })
  }

  const { handleInputChange } = useForm({
    text: '',
    validate,
  })

  const handleClick = () => setChecked(!checked)
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <OuterContainer>
          <OuterForm>
            <Text.Header splash>
              So that we can assess your circumstances holistically, please tell
              us if you have any other special circumstances that you would like
              us to consider.
            </Text.Header>
            <form className="form" onSubmit={handleSubmit}>
              <InputText
                contenteditable="true"
                placeholder="Type response here..."
                type="text"
                name="text"
                value={inputs.text}
                onChange={handleInputChange}
                autoFocus={false}
                required=""
              />
              {errors.name && (
                <p className="error_wrapper">
                  <ErrorMessage>{errors.text}</ErrorMessage>
                </p>
              )}
              <Button
                primary
                type="submit"
                style={{ cursor: 'pointer' }}
                onClick={() => setModalShow(true)}
              >
                Submit
              </Button>
              <Splash.ButtonGroup className="home">
                <a href={LINKS.HOME}>
                  <Splash.Button last className="home_button">
                    Return home
                  </Splash.Button>
                </a>
              </Splash.ButtonGroup>
              {formState && (
                <p className="modal" show={modalShow}>
                  Contact request submitted
                </p>
              )}
            </form>
          </OuterForm>
        </OuterContainer>
      </Splash.Content>
    </Splash.Container>
  )
}

const OuterContainer = styled.div`
  display: block;
  width: 100%;
`

const OuterForm = styled.div`
  display: flex;
  flex-flow: column;
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

  .home {
    margin-top: 20px;
  }

  .home_button {
    font-size: 20px;
    @media (max-width: 380px) {
      font-size: 19px;
    }
    @media (max-width: 375px) {
      font-size: 18px;
    }
    @media (max-width: 350px) {
      font-size: 15px;
    }
    @media (max-width: 347px) {
      font-size: 14px;
    }
    @media (max-width: 340px) {
      font-size: 13px;
    }
    @media (max-width: 333px) {
      font-size: 12px;
    }
    @media (max-width: 325px) {
      font-size: 11px;
    }
  }

  .form {
    box-shadow: 0px 4px 41px rgb(0 55 123 / 15%);
    border-radius: 12px;
    padding: 50px 55px 50px 55px;
    width: 90%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`

const InputText = styled.textarea`
  font-size: ${theme.text.subtitle};
  margin-bottom: 25px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  color: ${theme.color.teal.primary};
  width: 100%;
  max-width: 100%;
  max-height: 300px;
  min-height: 30px;
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
