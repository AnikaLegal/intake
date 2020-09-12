// @flow
import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar, Form } from 'comps'
import { TextContainer, Text, Button, theme } from 'design'
import { FIELDS } from 'forms/repairs'
import { ROUTES } from 'consts'
import { api } from 'api'
import type { Data } from 'types'

export const RepairsView = () => {
  const history = useHistory()
  const onSubmit = async (data: Data) => {
    history.push(ROUTES.ISSUES_FORM)
  }
  const onUpload = async (file: File) => {
    let sub = {
      id: '123456789',
      answers: null,
      topic: 'REPAIRS',
      complete: false,
      uploads: [],
    }
    sub = await api.submission.uploadFile(sub, file)
    return sub.uploads.slice(-1).pop()
  }
  return (
    <>
      <IntakeNavbar current={1} />
      <Form fields={FIELDS} onSubmit={onSubmit} onUpload={onUpload} />
    </>
  )
}
