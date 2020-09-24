//@flow
export type Person = {
  id: number,
  fullName: string,
  address: string,
  email: string,
  company: string,
  phoneNumber: string,
}

export type Tenancy = {
  id: number,
  client: string,
  address: string,
  isClientOnLease?: boolean,
  started?: string,
  landlord?: Person,
  agent?: Person,
}

export type Upload = {
  id: string,
  issue: string,
  file: string,
}

export type Topic = 'REPAIRS' | 'RENT_REDUCTION' | 'OTHER'

export type Issue = {
  id: string,
  answers: { [string]: any },
  topic: Topic,
  client: string,
  fileuploadSet: Array<Upload>,
  isAnswered: boolean,
  isSubmitted: boolean,
}

export type Client = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  isEligible: null | boolean,
  issueSet: Array<Issue>,
  tenancySet: Array<Tenancy>,
  dateOfBirth?: string,
  phoneNumber?: string,
  callTime?: string,
}
