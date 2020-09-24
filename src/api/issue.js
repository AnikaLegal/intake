// @flow
import { http } from './http'
import type { Issue, IssueCreate, IssueUpdate } from 'types'

export const issue = {
  // Create a new issue.
  create: async (issue: IssueCreate): Promise<Issue> => {
    const url = '/api/issue/'
    return await http.post(url, issue)
  },
  // Update an existing issue
  update: async (update: IssueUpdate): Promise<Issue> => {
    const url = `/api/issue/${update.issueId}/`
    return await http.patch(url, update.updates)
  },
}
