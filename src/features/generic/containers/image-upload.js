// @flow
import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { logError } from 'utils'
import type { ImageUpload as ImageUploadType } from 'types'

import { Button, ImageUpload } from '../comps'

const ALLOWED_IMAGE_TYPES = ['png', 'jpg', 'jpeg']

type Props = {
  images: Array<ImageUploadType>,
  onChange: any => void,
  upload: File => Promise<ImageUploadType>,
}

export const ImageUploadContainer = ({
  images,
  onChange,
  upload,
  disabled,
}: Props) => {
  const ref = useRef(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<string>>([])
  const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    ref.current && ref.current.click()
  }
  const onDelete = (image: ImageUploadType) => () => {
    onChange(images.filter(i => i.id !== image.id))
    if (ref.current) {
      ref.current.value = null
    }
  }
  const onUpload = (e: SyntheticEvent<HTMLInputElement>) => {
    // @noflow
    const fileList: FileList = e.target.files
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
      setErrors([msg])
    } else {
      // Accept the file, upload it.
      setLoading(true)
      upload(f)
        .then(image => {
          setLoading(false)
          setErrors([])
          onChange([...images, image])
        })
        .catch(e => {
          logError(e)
          setErrors([`Could not upload ${f.name}`])
        })
    }
  }
  return (
    <ImageUpload
      onUpload={onUpload}
      onSelect={onSelect}
      onDelete={onDelete}
      disabled={false}
      isLoading={isLoading}
      errors={errors}
      images={images}
      inputRef={ref}
    />
  )
}
