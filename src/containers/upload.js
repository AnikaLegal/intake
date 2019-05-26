// @flow
import React from 'react'
import { Button, Upload, Icon, message } from 'antd'

import { api } from 'api'
import { logError } from 'utils'

type Props = {
  value: string,
  onChange: any => void,
}

type State = {
  isLoading: boolean,
  fileList: Array<File>,
}

export class UploadField extends React.Component<Props, State> {
  state = {
    fileList: [],
    isLoading: false,
  }
  onUpload = () => {
    const { fileList } = this.state
    this.setState({ isLoading: true })
    const promises = []
    for (let file of fileList) {
      promises.push(api.questions.upload(file))
    }
    Promise.all(promises)
      .then(() => {
        this.setState({ fileList: [], isLoading: false })
        message.success('Upload successful.')
      })
      .catch((error, info) => {
        logError(error, info)
        message.success('Upload failed.')
        this.setState({ isLoading: false })
      })
  }
  onRemove = (file: File) => {
    const { fileList } = this.state
    const index = fileList.indexOf(file)
    this.setState({
      fileList: fileList.slice().splice(index, 1),
    })
  }
  onBeforeUpload = (file: File) => {
    const { fileList } = this.state
    this.setState({ fileList: [...fileList, file] })
    return false
  }
  render() {
    const { value, onChange } = this.props
    const { fileList, isLoading } = this.state
    return (
      <div>
        <Upload
          fileList={fileList}
          beforeUpload={this.onBeforeUpload}
          onRemove={this.onRemove}
          listType="picture"
        >
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.onUpload}
          disabled={fileList.length === 0}
          loading={isLoading}
        >
          {isLoading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    )
  }
}
