// @flow
import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { logError } from 'utils'
import type {
  FileUpload as FileUploadType,
  ImageUpload,
  DocumentUpload,
} from 'types'

import { Button, FileUpload } from '../comps'

const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'pdf']
const IMAGE_FILE_TYPES = ['png', 'jpg', 'jpeg']

type Props = {
  files: Array<FileUploadType>,
  onChange: any => void,
  uploadDoc: File => Promise<DocumentUpload>,
  uploadImage: File => Promise<ImageUpload>,
}

export const FileUploadContainer = ({
  files,
  onChange,
  uploadDoc,
  uploadImage,
  disabled,
}: Props) => {
  const ref = useRef(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<string>>([])
  const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    ref.current && ref.current.click()
  }
  const onDelete = (file: FileUploadType) => () => {
    onChange(files.filter(i => i.id !== file.id))
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
    const isFileTypeOk = ALLOWED_FILE_TYPES.some(
      ext => ext === fileExtension.toLowerCase()
    )
    const isImage = IMAGE_FILE_TYPES.includes(fileExtension)
    if (!isFileTypeOk) {
      // Reject the file, spit in the eye of our user.
      const allowedList = ALLOWED_FILE_TYPES.map(t => `.${t}`).join(', ')
      const msg = `The file ${f.name} cannot be uploaded. Please attach only files of type ${allowedList}.`
      setErrors([msg])
    } else {
      // Accept the file, upload it.
      const upload = isImage ? uploadImage : uploadDoc
      setLoading(true)
      upload(f)
        .then(file => {
          setLoading(false)
          setErrors([])
          onChange([...files, file])
        })
        .catch(e => {
          logError(e)
          setLoading(false)
          setErrors([`Could not upload ${f.name}`])
        })
    }
  }
  return (
    <FileUpload
      onUpload={onUpload}
      onSelect={onSelect}
      onDelete={onDelete}
      disabled={false}
      isLoading={isLoading}
      errors={errors}
      files={files}
      inputRef={ref}
    />
  )
}
