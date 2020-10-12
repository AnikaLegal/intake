// @flow
import type { Actions, Client, Data, Field } from 'types'

export class BaseForm {
  path: string
  actions: Actions
  client: ?Client

  constructor(path: string, actions: Actions, client: ?Client) {
    this.path = path
    this.actions = actions
    this.client = client
  }
  async onUpload(file: File) {
    return { id: '', issue: '', file: '' }
  }

  getFieldCount(data: Data) {
    return 0
  }

  getField(idx: number, data: Data): [string, Field | null] {
    return ['', null]
  }

  isRequiredFieldMissing(data: Data) {
    return Array(this.getFieldCount(data))
      .fill(0)
      .map((_, i) => this.getField(i, data))
      .some(
        ([fn, field]) =>
          // $FlowFixMe
          field.type !== 'DISPLAY' &&
          // $FlowFixMe
          field.required &&
          typeof data[fn] == 'undefined'
      )
  }
}
