// @flow
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom'

import { FORM_FIELDS } from 'comps/fields'
import { ROUTES } from 'consts'
import { IntakeNavbar } from 'comps'
import { FadeFooter, Text, FadeInOut, ANIMATION_TIME } from 'design'
import { useScrollTop, waitSeconds } from 'utils'
import type { State, Actions, Form, Data } from 'types'

export const FormView = () => {
  useScrollTop()
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { qIdx } = useParams()
  const actions: Actions = useDispatch()
  const query = useQuery()
  const clientId = getClientId(query)
  const {
    client: { client, isLoading: isStateLoading },
  }: State = useSelector((s) => s, shallowEqual)

  useEffect(() => {
    // Try to load the client from the backend if we have a client ID.
    if (client || !clientId) return
    actions.client.loadClient(clientId).catch((e) => {
      console.error('Failed to fetch client with id', clientId)
      const route = ROUTES.build(ROUTES.FORM, { ':qIdx': 0 }, {})
      history.push(route)
      localStorage.setItem(CLIENT_KEY, '')
      actions.client._setLoaded()
    })
  }, [])

  // If the client has already submitted some issues, send them to submitted page.
  if (client?.issueSet.some((i) => i.isSubmitted)) {
    const route = ROUTES.build(
      ROUTES.SUBMITTED,
      {},
      { client: client?.id || '' }
    )
    history.push(route)
  }

  // Handle form animation transition in / out
  const [isFormVisible, setIsFormVisible] = useState(false)
  useEffect(() => {
    setIsFormVisible(true)
  }, [])

  // Form data
  const [data, setData] = useState<Data>({})
  // API loading state
  const [isLoading, setIsLoading] = useState(isStateLoading)
  // Whether the form has been submitted
  const [isSubmit, setIsSubmit] = useState(false)

  const form: Form = new FormCls(path, actions, client)
  const [fieldName, field] = form.getField(qIdx, data)
  const isFinalQuestion = qIdx >= form.getFieldCount(data) - 1

  // Load default data
  useEffect(() => {
    setIsLoading(isStateLoading)
    const isDataEmpty = Object.keys(data).length === 0
    if (!isStateLoading && isDataEmpty) {
      setData(form.toForm())
    }
  }, [isStateLoading])

  // Submit data
  useEffect(() => {
    if (isSubmit) {
      // Check that all required field have been filled.
      if (form.isRequiredFieldMissing(data)) {
        // Go back to the first question.
        setIsSubmit(false)
        const nextUrl = getNextURL(url, 0)
        history.push(nextUrl)
      } else {
        // User has finished the form.
        setIsLoading(true)
        form.onSubmit(data, history)
      }
    }
  }, [isSubmit])

  // Progress form to next question
  const onNext = (e) => {
    e?.preventDefault() // Don't submit HTML form.
    setIsFormVisible(false)
    waitSeconds(ANIMATION_TIME / 2000).then(() => {
      // User submits the current question.
      if (isFinalQuestion) {
        // Trigger submission effect.
        setIsSubmit(true)
        setIsFormVisible(true)
      } else {
        // Progress to the next question.
        const nextUrl = getNextURL(url, Number(qIdx) + 1)
        history.push(nextUrl)
        setIsFormVisible(true)
      }
    })
  }
  // User enters some data.
  const onChange = (v) => {
    // $FlowFixMe
    setData((d) => ({ ...d, [fieldName]: v }))
  }
  // User tries to upload a file
  const onUpload = (file: File) => {
    // User is uploading a file
    // $FlowFixMe
    const id = form.getIssue()?.id || ''
    return actions.client.createUpload({ issue: id, file })
  }

  const FormField = field ? FORM_FIELDS[field.type] : null
  const value = data[fieldName]
  console.log('Form data', data, url)
  if (!field || !FormField) return null
  return (
    <FormEl>
      <IntakeNavbar current={form.stage} />
      <FadeInOut visible={isFormVisible}>
        <FormField
          onNext={onNext}
          onSkip={onNext}
          field={field}
          data={data}
          value={value}
          isLoading={isLoading}
          onChange={onChange}
          onUpload={onUpload}
        >
          <Text.Header>{field && field.Prompt}</Text.Header>
          {field && field.Help && <Text.Body>{field && field.Help}</Text.Body>}
        </FormField>
      </FadeInOut>
      {isFormVisible && <FadeFooter />}
    </FormEl>
  )
}

const QUESTION_REGEX = /question\/\d+/
const getNextURL = (url: string, nextIdx: number) =>
  url.replace(QUESTION_REGEX, `question/${nextIdx}`) + window.location.search

const useQuery = () => new URLSearchParams(useLocation().search)

const CLIENT_KEY = 'clientId'

const getClientId = (query: URLSearchParams) => {
  const id = query.get('client')
  if (id) {
    localStorage.setItem(CLIENT_KEY, id)
    return id
  } else {
    return localStorage.getItem(CLIENT_KEY)
  }
}

const FormEl = styled.div`
  overflow-x: hidden;
`
