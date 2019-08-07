// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Ref } from 'react'

import type { ImageUpload as ImageUploadType } from 'types'
import { Button } from './button'

type Props = {
  disabled: boolean,
  isLoading: boolean,
  images: Array<ImageUploadType>,
  errors: Array<string>,
  onUpload: any => any,
  onSelect: any => void,
  onDelete: ImageUploadType => () => any,
  inputRef: Ref<any>,
}

export const ImageUpload = ({
  onUpload,
  onSelect,
  disabled,
  onDelete,
  errors,
  images,
  inputRef,
}: Props) => (
  <div>
    <HiddenInput ref={inputRef} type="file" onChange={onUpload} />
    <Button disabled={disabled} styleType="secondary" onClick={onSelect}>
      Upload {images.length > 0 && 'another'} file
    </Button>
    {errors.length > 0 && errors.map(e => <ErrorMsg key={e}>{e}</ErrorMsg>)}
    {images.map(i => (
      <UploadedFile
        key={i.image}
        disabled={disabled}
        image={i}
        onDelete={onDelete(i)}
      />
    ))}
  </div>
)

type FileProps = {
  image: ImageUploadType,
  disabled: boolean,
  onDelete: () => any,
}

const UploadedFile = ({ image, disabled, onDelete }: FileProps) => (
  <UploadedFileEl>
    <img src={image.image} className="preview" />
    {!disabled && (
      <div onClick={onDelete} className="delete">
        &times;
      </div>
    )}
  </UploadedFileEl>
)

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
  .preview,
  .blank {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    height: ${IMAGE_SIZE}px;
    width: ${IMAGE_SIZE}px;
    margin-right: 2rem;
  }
  .preview {
    object-fit: cover;
  }
  .blank {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      opacity: 0.5;
      width: ${IMAGE_SIZE - 40}px;
      height: ${IMAGE_SIZE - 40}px;
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
