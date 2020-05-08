// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Ref } from 'react'

import type { FileUpload as FileUploadType } from 'types'
import { IMAGES } from 'consts'
import { Button } from './button'

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg']

type Props = {
  disabled: boolean,
  isLoading: boolean,
  files: Array<FileUploadType>,
  errors: Array<string>,
  onUpload: any => any,
  onSelect: any => void,
  onDelete: FileUploadType => () => any,
  inputRef: Ref<any>,
  isLoading: boolean,
}

export const FileUpload = ({
  onUpload,
  onSelect,
  disabled,
  onDelete,
  errors,
  files,
  inputRef,
  isLoading,
}: Props) => (
  <div>
    <HiddenInput ref={inputRef} type="file" onChange={onUpload} />
    <Button disabled={isLoading} secondary onClick={onSelect}>
      {isLoading ? (
        'Uploading...'
      ) : (
        <span>Upload {files.length > 0 && 'another'} file</span>
      )}
    </Button>
    {errors.length > 0 && errors.map(e => <ErrorMsg key={e}>{e}</ErrorMsg>)}
    {files.map(f => (
      <UploadedFile
        key={f.file || f.image}
        disabled={disabled}
        file={f}
        onDelete={onDelete(f)}
      />
    ))}
  </div>
)

type FileProps = {
  file: FileUploadType,
  disabled: boolean,
  onDelete: () => any,
}

const UploadedFile = ({ file, disabled, onDelete }: FileProps) => {
  if (file.image) {
    return (
      <UploadedFileEl>
        <a href={file.image} target="_blank">
          <img src={file.image} className="preview" />
        </a>
        {!disabled && (
          <div onClick={onDelete} className="delete">
            &times;
          </div>
        )}
      </UploadedFileEl>
    )
  } else {
    return (
      <UploadedFileEl>
        <a href={file.file} target="_blank">
          <img src={IMAGES.PDF} className="preview pdf" />
        </a>
        {!disabled && (
          <div onClick={onDelete} className="delete">
            &times;
          </div>
        )}
      </UploadedFileEl>
    )
  }
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
