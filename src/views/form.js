// @flow
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom'

// https://intake.anikalegal.com/resume/?sub=*|SUB_ID|*
import { api } from 'api'
import { FORM_FIELDS } from 'comps/fields'
import { ROUTES } from 'consts'
import { QUESTIONS } from 'questions'
import { IntakeNavbar } from 'comps'
import { FadeFooter, Text, FadeInOut, ANIMATION_TIME } from 'design'
import { useScrollTop, waitSeconds, loadFormData, storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const FormView = () => {
  // Scroll to the top on page change.
  useScrollTop()
  const history = useHistory()
  const { url } = useRouteMatch()
  // Form data
  const [data, setData] = useState<Data>(loadFormData() || {})

  // Handle form animation transition in / out
  const [isFormVisible, setIsFormVisible] = useState(false)
  useEffect(() => {
    setIsFormVisible(true)
  }, [])

  // Find the next valid question to ask.
  const { qIdx } = useParams()
  const [question, setQuestion] = useState<Field | null>(null)
  useEffect(() => {
    let nextQuestion = null
    const prevQs = []
    for (let q of QUESTIONS) {
      // Ignore fields that do not have their "ask condition" met.
      if (q.askCondition && !q.askCondition(data)) {
        continue
      }
      // Ignore fields that have been answered or skipped.
      if (typeof data[q.name] !== 'undefined') {
        prevQs.push(q)
        continue
      }
      nextQuestion = q
      break
    }
    if (qIdx >= 0 && qIdx < prevQs.length) {
      // User is looking at an answered question
      setQuestion(prevQs[qIdx])
    } else if (qIdx == prevQs.length && nextQuestion) {
      // User is looking at the next question
      setQuestion(nextQuestion)
    } else {
      // User is looking at some garbage qIdx, send them to next question
      const newIdx = prevQs.length
      const route = ROUTES.build(ROUTES.FORM, { ':qIdx': newIdx }, {})
      history.push(route)
    }
  }, [qIdx])

  // Handle next page event
  const [isNavigateNext, setIsNavigateNext] = useState(false)
  const [isNavigateSkip, setIsNavigateSkip] = useState(false)
  useEffect(() => {
    if ((!isNavigateNext && !isNavigateSkip) || !question) return
    const latestData = { ...data }
    // Set non-required fields to null if no answer was given.
    if (isNavigateSkip) {
      latestData[question.name] = null
      setData(latestData)
      setIsNavigateSkip(false)
    }
    // Save form data to local storage when question answered
    storeFormData(latestData)
    // Run question side effects.
    const effectPromise = question.effect
      ? question.effect(latestData)
      : Promise.resolve()
    // Trigger animation.
    effectPromise.then(async (effectNextUrl) => {
      if (effectNextUrl) {
        history.push(effectNextUrl)
      } else {
        setIsFormVisible(false)
        await waitSeconds(ANIMATION_TIME / 2000)
        const nextUrl = getNextURL(url, Number(qIdx) + 1)
        history.push(nextUrl)
        setIsNavigateNext(false)
        setIsFormVisible(true)
      }
    })
  }, [isNavigateNext, isNavigateSkip])

  const onBack = () => {
    if (qIdx > 0) {
      const route = ROUTES.build(ROUTES.FORM, { ':qIdx': qIdx - 1 }, {})
      history.push(route)
    } else {
      const route = ROUTES.build(ROUTES.LANDING, {}, {})
      history.push(route)
    }
  }
  // Progress form to next question
  const onNext = (e) => {
    e?.preventDefault() // Don't submit HTML form.
    setIsNavigateNext(true)
  }

  const onSkip = (e) => {
    e?.preventDefault()
    setIsNavigateSkip(true)
  }
  // User enters some data.
  const onChange = (v) => {
    // $FlowFixMe
    setData((d) => ({ ...d, [question.name]: v }))
  }
  // User tries to upload a file
  const onUpload = (file: File) => api.upload.create(file)

  if (!question) {
    return null
  }
  const FormField = FORM_FIELDS[question.type]
  const value = data[question.name]
  console.log('Form data', data, url)
  console.log('Current question', question.name, value)
  if (!FormField) return null
  return (
    <FormEl>
      <IntakeNavbar current={question.stage} onBack={onBack} />
      <FadeInOut visible={isFormVisible}>
        <FormField
          key={question.name}
          onNext={onNext}
          onSkip={onSkip}
          field={question}
          data={data}
          value={value}
          onChange={onChange}
          onUpload={onUpload}
        >
          <Text.Header>{question.Prompt}</Text.Header>
          {question.Help && <Text.Body>{question.Help}</Text.Body>}
        </FormField>
      </FadeInOut>
      {isFormVisible && <FadeFooter />}
    </FormEl>
  )
}

const QUESTION_REGEX = /form\/\d+/
const getNextURL = (url: string, nextIdx: number) =>
  url.replace(QUESTION_REGEX, `form/${nextIdx}`)

const FormEl = styled.div`
  overflow-x: hidden;
`
