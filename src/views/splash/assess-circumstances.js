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
            <form
              className="form"
              onSubmit={handleSubmit}
              action="http://localhost:3001/intake/form/14/"
            >
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
              <ButtonLink
                primary
                type="submit"
                href="http://localhost:3001/intake/form/14/"
              >
                Proceed
              </ButtonLink>
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

const ButtonLink = styled.a`
  height: 48px;
  font-size: ${theme.text.title};
  line-height: 32px;
  font-weight: 700;
  border-radius: 20px;
  outline: none;
  text-decoration: none;
  text-align: center;

  /* Default is secondary button */
  padding: 6px 38px 10px 38px;
  color: ${theme.color.teal.secondary};
  background-color: ${theme.color.white};
  border: 2px solid ${theme.color.teal.secondary};
  box-sizing: border-box;
  &:hover {
    box-shadow: ${theme.shadow};
  }
  ${theme.switch({
    primary: `
      color: ${theme.color.white};
      border: none;
      background-color: ${theme.color.teal.primary};
      padding: 8px 40px;
      &:active {
        outline: none;
        box-shadow: 0 0 0 1px ${theme.color.teal.primary};
        border: solid 1px ${theme.color.white};
        padding: 7px 39px;

      }
      `,
  })}
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.2;
  }
  & + & {
    margin-left: 30px;
  }
  @media (max-width: ${theme.screen.mobile}) {
    width: 100%;
    & + & {
      margin-left: 0px;
      margin-top: 16px;
    }
  }
  @media (max-width: ${theme.screen.small}) {
    height: 40px;
    line-height: 27px;
    padding: 4px 38px 6px 38px;
  }
`

const OuterForm = styled.div`
  display: flex;
  flex-flow: column;

  .modal {
    padding: 10px;
    text-align: center;
    border-radius: 14px;
    line-height: 100%;
    margin-top: 20px;
    color: #ebb900;
    font-weight: bold;
    background: #fff9e8;
    border: 2px solid #ebb900;
  }

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
