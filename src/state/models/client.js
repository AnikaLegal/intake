// @flow
import { events } from 'analytics'
import { api } from 'api'

import type {
  Data,
  Actions,
  ClientState,
  Client,
  Person,
  Submission,
  Tenancy,
  Upload,
  SubmissionCreate,
  PersonCreate,
  ClientCreate,
  TenancyCreate,
  UploadCreate,
} from 'types'

// Application state.
const state: ClientState = {
  isLoading: false,
  client: null,
}

// Functionally pure state changes (no side effects, only data changes).
const reducers = {
  // Start loading data from the backend.
  _setLoading: (state: ClientState): ClientState => {
    return { ...state, isLoading: true }
  },
  _loadClient: (state: ClientState, client: Client): ClientState => {
    return { ...state, isLoading: false, client }
  },
  _loadTenancy: (state: ClientState, tenancy: Tenancy): ClientState => {
    if (!state.client) return state
    return {
      ...state,
      isLoading: false,
      client: {
        ...state.client,
        tenancySet: state.client.tenancySet
          .filter((t) => t.id !== tenancy.id)
          .concat([tenancy]),
      },
    }
  },
  _loadSubmission: (state: ClientState, sub: Submission): ClientState => {
    if (!state.client) return state
    return {
      ...state,
      isLoading: false,
      client: {
        ...state.client,
        submissionSet: state.client.submissionSet
          .filter((s) => s.id !== sub.id)
          .concat([sub]),
      },
    }
  },
  _loadUpload: (state: ClientState, upload: Upload): ClientState => {
    if (!state.client) return state
    const sub = state.client.submissionSet.find(
      (s) => s.id === upload.submission
    )
    if (!sub) return state
    const newSub = { ...sub, fileuploadSet: [...sub.fileuploadSet, upload] }
    return reducers._loadSubmission(state, newSub)
  },
}

// Impure state changes (async or side effects).
const effects = (actions: Actions) => ({
  // Load a client from the backend.
  loadClient: async (clientId: string): Promise<Client> => {
    actions.client._setLoading()
    const client = await api.client.get(clientId)
    actions.client._loadClient(client)
    return client
  },
  createClient: async (clientData: ClientCreate): Promise<Client> => {
    actions.client._setLoading()
    const client = await api.client.create(clientData)
    actions.client._loadClient(client)
    // Dispatch analytics event if user creates a client
    events.onFirstSave(client.id)
    return client
  },
  updateClient: async (cliendId: string, updates: Data): Promise<Client> => {
    actions.client._setLoading()
    const client = await api.client.update(cliendId, updates)
    actions.client._loadClient(client)
    return client
  },
  createSubmission: async (subData: SubmissionCreate): Promise<Submission> => {
    actions.client._setLoading()
    const sub = await api.submission.create(subData)
    actions.client._loadSubmission(sub)
    return sub
  },
  updateSubmission: async (
    subId: string,
    updates: Data
  ): Promise<Submission> => {
    actions.client._setLoading()
    const sub = await api.submission.update(subId, updates)
    actions.client._loadSubmission(sub)
    return sub
  },
  createTenancy: async (tenancyData: TenancyCreate): Promise<Tenancy> => {
    actions.client._setLoading()
    const tenancy = await api.tenancy.create(tenancyData)
    actions.client._loadTenancy(tenancy)
    return tenancy
  },
  updateTenancy: async (tenancyId: string, updates: Data): Promise<Tenancy> => {
    actions.client._setLoading()
    const tenancy = await api.tenancy.update(tenancyId, updates)
    actions.client._loadTenancy(tenancy)
    return tenancy
  },
  createUpload: async (uploadData: UploadCreate): Promise<Upload> => {
    actions.client._setLoading()
    const upload = await api.upload.create(uploadData)
    actions.client._loadUpload(upload)
    return upload
  },
  createAgent: async (
    tenancyId: string,
    personData: PersonCreate
  ): Promise<Person> => {
    actions.client._setLoading()
    const person = await api.person.create(personData)
    const updates = { agent: person.id }
    const tenancy = await api.tenancy.update(tenancyId, updates)
    actions.client._loadTenancy(tenancy)
    return person
  },
  createLandlord: async (
    tenancyId: string,
    personData: PersonCreate
  ): Promise<Person> => {
    actions.client._setLoading()
    const person = await api.person.create(personData)
    const updates = { landlord: person.id }
    const tenancy = await api.tenancy.update(tenancyId, updates)
    actions.client._loadTenancy(tenancy)
    return person
  },
})

export const client = { state, reducers, effects }
