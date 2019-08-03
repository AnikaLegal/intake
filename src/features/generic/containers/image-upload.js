// @flow
import React, { useReducer, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

import { logError } from 'utils'
import type { ImageUpload as ImageUploadType, ImageUploader } from 'types'

import { Button, ImageUpload } from '../comps'

const ALLOWED_IMAGE_TYPES = ['png', 'jpg', 'jpeg']

type Props = {
  uploader: ImageUploader,
  disabled: boolean,
}

type UploadState = {
  isLoading: boolean,
  images: Array<ImageUploadType>,
  errors: Array<string>,
}

type UploadAction =
  | { type: 'START_LOADING' }
  | { type: 'FINISH_UPLOAD', image: ImageUploadType }
  | { type: 'FINISH_DELETE', image: ImageUploadType }
  | { type: 'FINISH_LIST', images: Array<ImageUploadType> }
  | { type: 'ERROR', error: string }

type Dispatch = UploadAction => void

const initState: UploadState = {
  isLoading: false,
  images: [],
  errors: [],
}

const reducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        errors: [...state.errors, action.error],
      }
    case 'START_LOADING':
      return { ...state, isLoading: true, errors: [] }
    case 'FINISH_UPLOAD':
      return {
        ...state,
        isLoading: false,
        images: [...state.images, action.image],
      }
    case 'FINISH_LIST':
      return { ...state, isLoading: false, images: action.images }
    case 'FINISH_DELETE':
      const { image } = action
      return {
        ...state,
        isLoading: false,
        images: state.images.filter(i => i.image !== image.image),
      }
  }
  return initState
}

const onError = (dispatch, msg) => error => {
  logError(error)
  dispatch({ type: 'ERROR', error: msg })
}

const getActions = (dispatch: Dispatch, uploader: ImageUploader) => ({
  list: () => {
    dispatch({ type: 'START_LOADING' })
    uploader
      .list()
      .then(images => dispatch({ type: 'FINISH_LIST', images }))
      .catch(onError(dispatch, `Could not fetch uploaded files`))
  },
  create: (fileList: FileList) => {
    // There will only ever be one file at a time.
    if (!fileList || fileList.length < 1) return
    const f = fileList[0]
    // Ensure only allowed files are can be uploaded.
    const fileExtension = f.name.split('.').pop()
    const isFileTypeOk = ALLOWED_IMAGE_TYPES.some(
      ext => ext === fileExtension.toLowerCase()
    )
    if (!isFileTypeOk) {
      // Reject the file, spit in the eye of our user.
      const allowedList = ALLOWED_IMAGE_TYPES.map(t => `.${t}`).join(', ')
      const msg = `The file ${f.name} cannot be uploaded. Please attach only files of type ${allowedList}.`
      dispatch({ type: 'ERROR', error: msg })
    } else {
      // Accept the file, upload it.
      dispatch({ type: 'START_LOADING' })
      uploader
        .create(f)
        .then(image => dispatch({ type: 'FINISH_UPLOAD', image }))
        .catch(onError(dispatch, `Could not upload ${f.name}`))
    }
  },
  delete: (image: ImageUploadType) => {
    dispatch({ type: 'START_LOADING' })
    uploader
      .delete(image)
      .then(() => dispatch({ type: 'FINISH_DELETE', image }))
      .catch(onError(dispatch, `Could not delete ${image.image}`))
  },
})

export const ImageUploadContainer = ({ uploader, disabled }: Props) => {
  const ref = useRef(null)
  const [state, dispatch] = useReducer<UploadState, UploadAction>(
    reducer,
    initState
  )
  const actions = getActions(dispatch, uploader)
  useEffect(actions.list, [])
  const { isLoading, images, errors } = state
  const onUpload = (e: SyntheticEvent<HTMLInputElement>) => {
    // @noflow
    const fileList: FileList = e.target.files
    actions.create(fileList)
  }
  const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    ref.current && ref.current.click()
  }
  const onDelete = (image: ImageUploadType) => () => {
    actions.delete(image)
    if (ref.current) {
      ref.current.value = null
    }
  }
  return (
    <ImageUpload
      onUpload={onUpload}
      onSelect={onSelect}
      onDelete={onDelete}
      disabled={disabled}
      isLoading={state.isLoading}
      errors={state.errors}
      images={state.images}
      inputRef={ref}
    />
  )
}
