// @flow
import React from 'react'
// import { Button, Upload, Icon, message } from 'antd'

import { api } from 'api'
import { logError } from 'utils'
import type { ImageUpload } from 'types'

type Props = {
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
    const { onChange } = this.props
    const { fileList } = this.state
    this.setState({ isLoading: true })
    const promises: Array<Promise<any>> = []
    const images: Array<ImageUpload> = []
    for (let file of fileList) {
      promises.push(
        api.questions.upload(file).then(imageUpload => {
          images.push(imageUpload)
        })
      )
    }
    Promise.all(promises)
      .then(() => {
        this.setState({ isLoading: false })
        onChange(images)
        // message.success('Upload successful.')
      })
      .catch(error => {
        logError(error)
        // message.success('Upload failed.')
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
    this.setState({ fileList: [...fileList, file] }, this.onUpload)
    return false
  }
  render() {
    const { fileList } = this.state
    return null
    // FIXME - antd
    // return (
    // <div>
    //   <Upload
    //     fileList={fileList}
    //     beforeUpload={this.onBeforeUpload}
    //     onRemove={this.onRemove}
    //     listType="picture"
    //   >
    //     <Button>
    //       <Icon type="upload" /> Click to Upload
    //     </Button>
    //   </Upload>
    // </div>
    // )
  }
}
