//@flow
import type { Data, Client, Person, Tenancy, Issue, Upload } from './core'
import type {
  ClientCreate,
  PersonCreate,
  IssueCreate,
  TenancyCreate,
  PersonUpdate,
  UploadCreate,
  TenancyUpdate,
  IssueUpdate,
  ClientUpdate,
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
  _setLoaded: () => void,
  _loadClient: (client: Client) => void,
  _loadTenancy: (tenancy: Tenancy) => void,
  _loadIssue: (sub: Issue) => void,
  _loadUpload: (upload: Upload) => void,
  _loadPerson: (person: Person) => void,
  // Public actions
  loadClient: (cliendId: string) => Promise<Client>,
  createClient: (client: ClientCreate) => Promise<Client>,
  updateClient: (updates: ClientUpdate) => Promise<Client>,
  createAgent: (person: PersonCreate) => Promise<Person>,
  createLandlord: (person: PersonCreate) => Promise<Person>,
  updatePerson: (updates: PersonUpdate) => Promise<Person>,
  createIssue: (sub: IssueCreate) => Promise<Issue>,
  updateIssue: (updates: IssueUpdate) => Promise<Issue>,
  createTenancy: (tenancy: TenancyCreate) => Promise<Tenancy>,
  updateTenancy: (updates: TenancyUpdate) => Promise<Tenancy>,
  createUpload: (upload: UploadCreate) => Promise<Upload>,
}

// Typically called "dispatch" in Redux.
export type Actions = { client: ClientActions }
