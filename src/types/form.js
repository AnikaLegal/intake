//@flow
import * as React from 'react'
import type { Client, Data } from './core'
import type { Actions } from './state'

export type FieldType =
  | 'TEXT'
  | 'EMAIL'
  | 'DATE'
  | 'CHOICE_SINGLE'
  | 'CHOICE_MULTI'
  | 'UPLOAD'
  | 'DISPLAY'
  | 'PHONE'

export type Field = {
  type: FieldType,
  stage: number,
  name: string,
  effect?: (Data) => void,
  askCondition?: (Data) => boolean,
  required: boolean,
  Prompt: React.Element<'span'>,
  Help?: React.Element<'span'>,
  choices?: Array<{ label: string, value: string | boolean | null }>,
  button?: {
    text: string,
    Icon: any,
  },
}

export interface Form {
  +stage: number;
  path: string;
  client: ?Client;
  actions: Actions;

  constructor(path: string, actions: Actions, client: ?Client): void;
  onSubmit(data: Data, history: any): Promise<void>;
  toForm(): Data;
  toApi(data: Data): Data;
  getFieldCount(data: Data): number;
  getField(idx: number, data: Data): [string, Field | null];
  isRequiredFieldMissing(data: Data): boolean;
}
