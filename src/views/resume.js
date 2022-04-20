// @flow
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

import { api } from 'api'
import { FORM_FIELDS } from 'comps/fields'
import { ROUTES } from 'consts'
import { QUESTIONS } from 'questions'
import { IntakeNavbar } from 'comps'
import { FadeFooter, Text, FadeInOut, ANIMATION_TIME } from 'design'
import { useScrollTop, waitSeconds, loadFormData, storeFormData } from 'utils'
import type { Field, Data } from 'types'
import { submission } from '../api/submission'

// View used to load client data from the server.
// https://intake.anikalegal.com/resume/?sub=*|SUB_ID|*
// http://localhost:3001/resume/?sub=0933d9a8-b8ad-46f5-abce-348eb586e7aa
export const ResumeView = () => {
  // Scroll to the top on page change.
  const history = useHistory()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sub = searchParams.get('sub')
  useEffect(() => {
    let promise
    if (sub) {
      promise = api.submission.get(sub).then((submission) => {
        const formData = { ...submission.answers, id: sub }
        storeFormData(formData)
      })
    } else {
      promise = Promise.resolve()
    }
    promise.then(() => {
      const route = ROUTES.build(ROUTES.FORM, { ':qIdx': 0 }, {})
      history.push(route)
    })
  }, [])
  return null
}
