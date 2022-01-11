import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

const RTBA_LINK = 'https://rentalbonds.vic.gov.au/'
const VCAT_LINK = 'https://www.vcat.vic.gov.au/'

const REASONS = {
  DAMAGE: 'Damage',
  MONEY_OWED: 'Rent or other money owing',
  CLEANING: 'Cleaning',
  LOCKS: 'Locks and security devices',
  OTHER: 'Other reason',
}

const isBondsIssue = (data: Data) => data.ISSUES.includes('BONDS')
const isBondsIssueWithClaim = (data: Data) =>
  isBondsIssue(data) && data.BONDS_LANDLORD_INTENTS_TO_MAKE_CLAIM
const isClaimReason = (reason: string) => (data) =>
  isBondsIssueWithClaim(data) &&
  data.BONDS_CLAIM_REASONS &&
  data.BONDS_CLAIM_REASONS.includes(reason)

export const BONDS_QUESTIONS: Array<Field> = [
  {
    name: 'BONDS_INTRO',
    stage: 1,
    askCondition: isBondsIssue,

    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Bond recovery</span>,
    Help: (
      <span>
        Thanks for your answers so far. We have a few questions about your bond.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_MOVE_OUT_DATE',
    stage: 1,
    askCondition: isBondsIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>
        When was, or what will be, the date you move out of your rental
        property?
      </span>
    ),
  },
  {
    name: 'BONDS_LANDLORD_INTENTS_TO_MAKE_CLAIM',
    stage: 1,
    askCondition: isBondsIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Has your landlord or agent already told you they intend to make a claim
        on your bond?
      </span>
    ),
  },
  {
    name: 'BONDS_HAS_LANDLORD_MADE_RTBA_APPLICATION',
    stage: 1,
    askCondition: isBondsIssueWithClaim,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Has your landlord/real estate agent made an application to the{' '}
        <a href={RTBA_LINK} target="_blank">
          RTBA
        </a>{' '}
        or{' '}
        <a href={VCAT_LINK} target="_blank">
          VCAT
        </a>{' '}
        for your bond?
      </span>
    ),
  },
  {
    name: 'BONDS_TENANT_HAS_RTBA_APPLICATION_COPY',
    stage: 1,
    askCondition: (data) =>
      isBondsIssueWithClaim(data) &&
      data.BONDS_HAS_LANDLORD_MADE_RTBA_APPLICATION,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you have a copy of the RTBA or VCAT application?</span>,
  },
  {
    name: 'BONDS_RTBA_APPLICATION_UPLOAD',
    stage: 1,
    askCondition: (data) =>
      isBondsIssueWithClaim(data) &&
      data.BONDS_TENANT_HAS_RTBA_APPLICATION_COPY,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload the landlord/real estate agent's RTBA or VCAT application.
      </span>
    ),
  },
  {
    name: 'BONDS_CLAIM_REASONS',
    stage: 1,
    askCondition: isBondsIssueWithClaim,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: REASONS.DAMAGE, value: REASONS.DAMAGE },
      { label: REASONS.MONEY_OWED, value: REASONS.MONEY_OWED },
      { label: REASONS.CLEANING, value: REASONS.CLEANING },
      { label: REASONS.LOCKS, value: REASONS.LOCKS },
      { label: REASONS.OTHER, value: REASONS.OTHER },
    ],
    Prompt: (
      <span>
        What are the reason(s) your landlord or agent is using to claim your
        bond?
      </span>
    ),
    Help: <span>Choose as many as you need</span>,
  },
  {
    name: 'BONDS_DAMAGE_INTRO',
    stage: 1,
    askCondition: isClaimReason(REASONS.DAMAGE),
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Damage to the rental property</span>,
    Help: (
      <span>
        Let's go over the damage that your landlord is making a claim for.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_DAMAGE_CLAIM_DESCRIPTION',
    stage: 1,
    askCondition: isClaimReason(REASONS.DAMAGE),
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Tell us more about the damage the landlord is making a claim for.
      </span>
    ),
  },
  {
    name: 'BONDS_DAMAGE_CLAIM_AMOUNT',
    stage: 1,
    askCondition: isClaimReason(REASONS.DAMAGE),
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is the landlord claiming for damage?</span>,
  },
  {
    name: 'BONDS_DAMAGE_CAUSED_BY_TENANT',
    stage: 1,
    askCondition: isClaimReason(REASONS.DAMAGE),
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Did you cause the damage?</span>,
  },
  {
    name: 'BONDS_DAMAGE_QUOTE_UPLOAD',
    stage: 1,
    askCondition: (data) =>
      isClaimReason(REASONS.DAMAGE)(data) && data.BONDS_DAMAGE_CAUSED_BY_TENANT,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        If you caused the damage, have you obtained your own quote for repair?
        If so, please upload.
      </span>
    ),
  },
  {
    name: 'BONDS_MONEY_OWED_INTRO',
    stage: 1,
    askCondition: isClaimReason(REASONS.MONEY_OWED),
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Rent or other money owing</span>,
    Help: (
      <span>
        Let's go over the money owed that your landlord is making a claim for.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_MONEY_OWED_CLAIM_DESCRIPTION',
    stage: 1,
    askCondition: isClaimReason(REASONS.MONEY_OWED),
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>Tell us more about the money the landlord says you owe.</span>
    ),
  },
  {
    name: 'BONDS_MONEY_OWED_CLAIM_AMOUNT',
    stage: 1,
    askCondition: isClaimReason(REASONS.MONEY_OWED),
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is the landlord claiming for money owing?</span>,
  },
  {
    name: 'BONDS_MONEY_IS_OWED_BY_TENANT',
    stage: 1,
    askCondition: isClaimReason(REASONS.MONEY_OWED),
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you owe the money the landlord is claiming?</span>,
  },

  {
    name: 'BONDS_CLEANING_INTRO',
    stage: 1,
    askCondition: isClaimReason(REASONS.CLEANING),
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Cleaning</span>,
    Help: (
      <span>
        Let's go over the cleaning that your landlord is making a claim for.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_CLEANING_CLAIM_DESCRIPTION',
    stage: 1,
    askCondition: isClaimReason(REASONS.CLEANING),
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Tell us more about the cleaning costs the landlord is trying to claim.
      </span>
    ),
  },
  {
    name: 'BONDS_CLEANING_CLAIM_AMOUNT',
    stage: 1,
    askCondition: isClaimReason(REASONS.CLEANING),
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is the landlord claiming for cleaning costs?</span>,
  },
  {
    name: 'BONDS_CLEANING_DOCUMENT_UPLOADS',
    stage: 1,
    askCondition: isClaimReason(REASONS.CLEANING),
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload any of the following documents if you have them. It's okay
        if you don't.
        <ul>
          <li>Conditions Report at the start of your tenancy</li>
          <li>Conditions Report at the end of your tenancy</li>
          <li>Receipt for end of lease cleaning you have already paid for</li>
          <li>Quote for end of lease cleaning you have not yet paid for</li>
        </ul>
      </span>
    ),
  },
  {
    name: 'BONDS_LOCKS_INTRO',
    stage: 1,
    askCondition: isClaimReason(REASONS.LOCKS),
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Locks and security devices</span>,
    Help: (
      <span>
        Let's go over the locks and security devices that your landlord is
        making a claim for.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_LOCKS_CLAIM_AMOUNT',
    stage: 1,
    askCondition: isClaimReason(REASONS.LOCKS),
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: (
      <span>
        How much is the landlord claiming for locks and security devices?
      </span>
    ),
  },
  {
    name: 'BONDS_LOCKS_CHANGED_BY_TENANT',
    stage: 1,
    askCondition: isClaimReason(REASONS.LOCKS),
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Have you altered the locks/security devices at your property?</span>
    ),
  },
  {
    name: 'BONDS_LOCKS_CHANGE_QUOTE',
    stage: 1,
    askCondition: (data) =>
      isClaimReason(REASONS.LOCKS)(data) && data.BONDS_LOCKS_CHANGED_BY_TENANT,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        If you have altered the locks/security devices at your property and have
        obtained a quote to change it back, please upload the quote.
      </span>
    ),
  },
  {
    name: 'BONDS_OTHER_INTRO',
    stage: 1,
    askCondition: isClaimReason(REASONS.OTHER),
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Other claim reasons</span>,
    Help: (
      <span>
        Let's go over the other reasons that your landlord is making a claim.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'BONDS_OTHER_REASONS_DESCRIPTION',
    stage: 1,
    askCondition: isClaimReason(REASONS.OTHER),
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>What are the 'other' reasons that the landlord is claiming?</span>
    ),
  },
  {
    name: 'BONDS_OTHER_REASONS_AMOUNT',
    stage: 1,
    askCondition: isClaimReason(REASONS.OTHER),
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is the landlord claiming for other reasons?</span>,
  },
]
