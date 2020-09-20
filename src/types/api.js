//@flow
import type { Topic } from './core'

export type PersonCreate = {
  fullName: string,
  address?: string,
  email?: string,
  company?: string,
  phoneNumber?: string,
}

export type UploadCreate = {
  submission: string,
  file: File,
}

export type TenancyCreate = {
  client: string,
  address: string,
}

export type SubmissionCreate = {
  client: string,
  topic: Topic,
}

export type ClientCreate = {
  firstName: string,
  lastName: string,
  email: string,
}
