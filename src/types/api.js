//@flow
import type { Data } from './form'
import type { Topic } from './core'

export type PersonCreate = {
  tenancyId: string,
  personData: {
    fullName: string,
    address?: string,
    email?: string,
    company?: string,
    phoneNumber?: string,
  },
}
export type UploadCreate = {
  issue: string,
  file: File,
}

export type TenancyCreate = {
  client: string,
  address: string,
}

export type TenancyUpdate = {
  tenancyId: string,
  updates: Data,
}

export type IssueCreate = {
  client: string,
  topic: Topic,
}

export type IssueUpdate = {
  issueId: string,
  updates: Data,
}

export type ClientCreate = {
  firstName: string,
  lastName: string,
  email: string,
}
export type ClientUpdate = {
  clientId: string,
  updates: Data,
}
