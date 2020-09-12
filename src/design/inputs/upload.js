// @flow
import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import type { Upload } from 'types'
import { IMAGES } from 'consts'
import { logError } from 'utils'

import { Button } from './button'

const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'pdf']
const IMAGE_FILE_TYPES = ['png', 'jpg', 'jpeg']
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg']

type Props = {
  values: Array<Upload>,
  onChange: (any) => void,
  onUpload: (File) => Promise<Upload>,
  disabled: boolean,
}

export const UploadInput = ({
  values,
  onChange,
  onUpload,
  disabled,
}: Props) => {
  const ref = useRef(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Array<string>>([])
  const onSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    ref.current && ref.current.click()
  }
  const onDelete = (file: Upload) => () => {
    onChange(values.filter((i) => i.id !== file.id))
    if (ref.current) {
      ref.current.value = null
    }
  }
  const onInputChange = async (e: SyntheticInputEvent<HTMLInputElement>) => {
    const fileList: FileList = e.target.files
    // There will only ever be one file at a time.
    if (!fileList || fileList.length < 1) return
    const f = fileList[0]
    // Ensure only allowed files are can be uploaded.
    const fileExtension = f.name.split('.').pop()
    const isFileTypeOk = ALLOWED_FILE_TYPES.some(
      (ext) => ext === fileExtension.toLowerCase()
    )
    const isImage = IMAGE_FILE_TYPES.includes(fileExtension)
    if (!isFileTypeOk) {
      // Reject the file, spit in the eye of our user.
      const allowedList = ALLOWED_FILE_TYPES.map((t) => `.${t}`).join(', ')
      const msg = `The file ${f.name} cannot be uploaded. Please attach only files of type ${allowedList}.`
      setErrors([msg])
    } else {
      // Accept the file, upload it.
      setLoading(true)
      try {
        const file = await onUpload(f)
        setLoading(false)
        setErrors([])
        onChange([...values, file])
      } catch {
        logError(e)
        setLoading(false)
        setErrors([`Could not upload ${f.name}`])
      }
    }
  }

  return (
    <div>
      <HiddenInput ref={ref} type="file" onChange={onInputChange} />
      <Button disabled={isLoading} secondary onClick={onSelect}>
        {isLoading ? (
          'Uploading...'
        ) : (
          <span>Upload {values.length > 0 && 'another'} file</span>
        )}
      </Button>
      {errors.length > 0 && errors.map((e) => <ErrorMsg key={e}>{e}</ErrorMsg>)}
      {values.map((f) => (
        <UploadedFile
          key={f.file}
          disabled={disabled}
          file={f}
          onDelete={onDelete(f)}
        />
      ))}
    </div>
  )
}

type FileProps = {
  file: Upload,
  disabled: boolean,
  onDelete: () => any,
}

const UploadedFile = ({ file, disabled, onDelete }: FileProps) => {
  return (
    <UploadedFileEl>
      <a href={file.file} target="_blank">
        <img src={file.file} className="preview" />
      </a>
      {!disabled && (
        <div onClick={onDelete} className="delete">
          &times;
        </div>
      )}
    </UploadedFileEl>
  )
}

const HiddenInput = styled.input`
  display: none;
`

const IMAGE_SIZE = 200

const UploadedFileEl = styled.div`
  position: relative;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  height: ${IMAGE_SIZE}px;
  .preview {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.6);
    border-radius: 6px;
    height: ${IMAGE_SIZE}px;
    width: ${IMAGE_SIZE}px;
    margin-right: 2rem;
    object-fit: cover;
    &.pdf {
      opacity: 0.4;
      padding: 15px;
      box-sizing: border-box;
    }
  }
  .delete {
    position: absolute;
    cursor: pointer;
    background: #d52b1e;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    color: white;
    font-size: 15px;
    line-height: 15px;
    text-align: center;
    font-weight: bold;
    top: -6px;
    left: ${IMAGE_SIZE - 8}px;
  }
`
const ErrorMsg = styled.div`
  margin: 10px 0;
  font-weight: 500;
  color: #d52b1e;
`
