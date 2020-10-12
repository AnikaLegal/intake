//@flow
import type { Topic, Data } from './core'

export type PersonCreate = {
  fullName: string,
  address?: string,
  email?: string,
  company?: string,
  phoneNumber?: string,
}
export type PersonUpdate = {
  personId: number,
  updates: Data,
}

export type TenancyCreate = {
  client: string,
  address: string,
  started: string,
  isOnLease: boolean,
}
export type TenancyUpdate = {
  tenancyId: number,
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

export type UploadCreate = {
  issue: string,
  file: File,
}
