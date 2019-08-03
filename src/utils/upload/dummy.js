// @flow
import uuid from 'uuid'
import type { ImageUploader, ImageUpload } from 'types'

// Fake file uploader used for testing
export class DummyImageUploader implements ImageUploader {
  files: Array<ImageUpload>
  constructor() {
    this.files = []
  }
  delete(file: ImageUpload): Promise<void> {
    this.files = this.files.filter(f => f.image !== file.image)
    return new Promise(r => r())
  }
  list(): Promise<Array<ImageUpload>> {
    return new Promise(r => r(this.files))
  }
  create(file: File): Promise<ImageUpload> {
    return new Promise(r => {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          r({
            id: uuid(),
            image: String(reader.result),
          })
        },
        false
      )
      reader.readAsDataURL(file)
    })
  }
}
