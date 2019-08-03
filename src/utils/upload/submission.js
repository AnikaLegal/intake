// @flow
import { api } from 'api'
import type { ImageUploader, ImageUpload } from 'types'

export class SubmissionImageUploader implements ImageUploader {
  files: Array<ImageUpload>
  list(): Promise<Array<ImageUpload>> {
    return Promise.resolve([]) // FIXME: Implement
  }
  create(file: File): Promise<ImageUpload> {
    return api.questions.upload(file)
  }
  delete(file: ImageUpload): Promise<void> {
    return Promise.resolve() // FIXME: Implement
  }
}
