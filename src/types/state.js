//@flow
import type { Data } from './form'
import type { Client, Person, Tenancy, Submission, Upload } from './core'
import type {
  ClientCreate,
  PersonCreate,
  SubmissionCreate,
  TenancyCreate,
  UploadCreate,
} from './api'

// Redux + Rematcher stuff
export type ClientState = {
  +isLoading: boolean,
  +client: Client | null,
}

export type State = { +client: ClientState }

export type ClientActions = {
  // Internal actions
  _setLoading: () => void,
  _loadClient: (client: Client) => void,
  _loadTenancy: (tenancy: Tenancy) => void,
  _loadSubmission: (sub: Submission) => void,
  _loadUpload: (upload: Upload) => void,
  // Public actions
  loadClient: (cliendId: string) => Promise<Client>,
  createClient: (client: ClientCreate) => Promise<Client>,
  updateClient: (cliendId: string, updates: Data) => Promise<Client>,
  createAgent: (person: PersonCreate) => Promise<Person>,
  createLandlord: (person: PersonCreate) => Promise<Person>,
  createSubmission: (sub: SubmissionCreate) => Promise<Submission>,
  updateSubmission: (subId: string, updates: Data) => Promise<Submission>,
  createTenancy: (tenancy: TenancyCreate) => Promise<Tenancy>,
  updateTenancy: (tenancyId: string, updates: Data) => Promise<Tenancy>,
  createUpload: (upload: UploadCreate) => Promise<Upload>,
}

// Typically called "dispatch" in Redux.
export type Actions = { client: ClientActions }
