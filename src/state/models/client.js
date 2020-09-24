// @flow
import { events } from 'analytics'
import { api } from 'api'

import type {
  Data,
  Actions,
  ClientState,
  State,
  Client,
  Person,
  Issue,
  Tenancy,
  Upload,
  IssueCreate,
  PersonCreate,
  ClientCreate,
  TenancyCreate,
  UploadCreate,
  IssueUpdate,
  ClientUpdate,
  TenancyUpdate,
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
  _setLoaded: (state: ClientState): ClientState => {
    return { ...state, isLoading: false }
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
  _loadIssue: (state: ClientState, sub: Issue): ClientState => {
    if (!state.client) return state
    return {
      ...state,
      isLoading: false,
      client: {
        ...state.client,
        issueSet: state.client.issueSet
          .filter((s) => s.id !== sub.id)
          .concat([sub]),
      },
    }
  },
  _loadUpload: (state: ClientState, upload: Upload): ClientState => {
    if (!state.client) return state
    const sub = state.client.issueSet.find((s) => s.id === upload.issue)
    if (!sub) return state
    const newSub = { ...sub, fileuploadSet: [...sub.fileuploadSet, upload] }
    return reducers._loadIssue(state, newSub)
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
  updateClient: async (updates: ClientUpdate): Promise<Client> => {
    actions.client._setLoading()
    const client = await api.client.update(updates)
    actions.client._loadClient(client)
    return client
  },
  createIssue: async (subData: IssueCreate, state: State): Promise<Issue> => {
    const { client } = state.client
    if (client) {
      // Don't create a new issue if it already for a given topic.
      const sub = client.issueSet.find((s) => s.topic == subData.topic)
      if (sub) {
        return sub
      }
    }
    actions.client._setLoading()
    const sub = await api.issue.create({ ...subData, answers: {} })
    actions.client._loadIssue(sub)
    return sub
  },
  updateIssue: async (updates: IssueUpdate): Promise<Issue> => {
    actions.client._setLoading()
    const sub = await api.issue.update(updates)
    actions.client._loadIssue(sub)
    return sub
  },
  createTenancy: async (
    tenancyData: TenancyCreate,
    state: State
  ): Promise<Tenancy> => {
    const { client } = state.client
    if (client && client.tenancySet.length > 0) {
      // Don't create a new tenancy if it already exists.
      return client.tenancySet[0]
    }
    actions.client._setLoading()
    const tenancy = await api.tenancy.create({
      ...tenancyData,
      landlord: null,
      agent: null,
    })
    actions.client._loadTenancy(tenancy)
    return tenancy
  },
  updateTenancy: async (updates: TenancyUpdate): Promise<Tenancy> => {
    actions.client._setLoading()
    const tenancy = await api.tenancy.update(updates)
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
    // FIXME
    // const tenancy = await api.tenancy.update(tenancyId, updates)
    // actions.client._loadTenancy(tenancy)
    return person
  },
  createLandlord: async (
    tenancyId: string,
    personData: PersonCreate
  ): Promise<Person> => {
    actions.client._setLoading()
    const person = await api.person.create(personData)
    const updates = { landlord: person.id }
    // FIXME
    // const tenancy = await api.tenancy.update(tenancyId, updates)
    // actions.client._loadTenancy(tenancy)
    return person
  },
})

export const client = { state, reducers, effects }
