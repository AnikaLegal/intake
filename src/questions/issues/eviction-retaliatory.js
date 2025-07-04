//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

export const isRetaliatoryEvictionIssue = (data: Data) =>
  data.ISSUES.includes('EVICTION_RETALIATORY')

const isRetaliatoryReasonOther = (data: Data) =>
  isRetaliatoryEvictionIssue(data) && data.EVICTION_RETALIATORY_RETALIATORY_REASON.includes('Other')

const isEvictionIssueWithDate = (data: Data) =>
  isRetaliatoryEvictionIssue(data) && data.EVICTION_RETALIATORY_VCAT_HEARING

export const EVICTION_RETALIATORY_QUESTIONS: Array<Field> = [
  {
    name: 'EVICTION_RETALIATORY_INTRO',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Retaliatory Eviction</span>,
    Help: (
      <span>
        <p>
          Anika Legal can help you negotiate with your landlord, and
          self-represent at VCAT.
        </p>
        <p>
          Please be aware we cannot represent you at VCAT. If you need
          representation, you may wish to contact your <a
            href={LINKS.VIC_LEGAL_AID}>local community legal centres</a> who will
          be better placed to look into your matter.
        </p>
        <p>
          If you would like us to support you to self-represent at VCAT, please
          continue and make sure you have your Notice to Vacate with you.
        </p>
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'EVICTION_RETALIATORY_IS_ALREADY_REMOVED',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    effect: async (data: Data) => {
      if (data.EVICTION_RETALIATORY_IS_ALREADY_REMOVED) {
        return ROUTES.INELIGIBLE_ALREADY_REMOVED
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Have you been removed from your home?</span>,
  },
  {
    name: 'EVICTION_RETALIATORY_HAS_NOTICE',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    effect: async (data: Data) => {
      if (!data.EVICTION_RETALIATORY_HAS_NOTICE) {
        return ROUTES.INELIGIBLE_NO_EVICTIONS_NOTICE
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Have you received a Notice to Vacate from your landlord or your real
        estate agent?
      </span>
    ),
    Help: (
      <span>
        It's a specific kind of legal document that{' '}
        <a href={LINKS.NOTICE_TO_VACATE_PDF}>looks like this</a>.
      </span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_DOCUMENTS_UPLOAD',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload a copy of the Notice to Vacate that your landlord or agent
        has given you.
      </span>
    ),
    Help: (
      <span>
        If you have received multiple Notices to Vacate, please upload all that
        have not been withdrawn. Please also upload all supporting documents
        attached to the Notice to Vacate.
      </span>
    )
  },
  {
    name: 'EVICTION_RETALIATORY_DATE_RECEIVED_NTV',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>What date did you receive the Notice to Vacate?</span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_NTV_TYPE',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'You owe at least two weeks rent', value: '91ZM - Arrears' },
      { label: 'Rental Provider intends to repair or renovate the Property', value: '91ZX - Repairs' },
      { label: 'Rental Provider or their family intend to move in', value: '91ZZA - Moving in' },
      { label: 'Rental Provider intends to sell the Property', value: '91ZZB - Selling' },
      { label: 'Your lease is ending and the Rental Provider does not want to renew it', value: '91ZZD - DA - End of lease' },
      { label: 'Your lease is ending and the Rental Provider wants to move back in', value: '91ZW - Principal place of residence' },
      { label: 'Rental Provider intends to demolish the Property', value: '91ZY - Demolition' },
      { label: 'Rental Provider has deemed the Property unfit for habitation', value: '91ZL - Uninhabitable' },
      { label: 'Rental Provider claims you have threatened or intimidated them or their staff', value: '91ZK - Threats and intimidation' },
      { label: 'Rental Provider claims you have damaged the Property', value: '91ZI - Damage' },
      { label: 'Rental Provider claims you have endangered safety', value: '91ZJ - Danger' },
      { label: 'Rental Provider claims you have breached the lease or law', value: '91ZP - Breaches' },
      { label: 'Rental Provider claims you have used the Property for illegal purposes', value: '91ZQ - Illegal use' },
      { label: 'Rental Provider would like to use the Property for their business', value: '91ZZ - Business' },
      { label: "I'm not sure", value: 'Unsure' },
    ],
    Prompt: (
      <span>What is the reason given on the Notice to Vacate?</span>
    ),
    Help: (
      <span>
        If you've received multiple Notices to Vacate, please select the reason on
        the Notice to Vacate with the earliest Termination Date.
      </span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_RETALIATORY_REASON',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'I asked for repairs', value: 'Repairs' },
      { label: 'I asked for modifications', value: 'Modifications' },
      { label: 'I reported damage to the property', value: 'Damage' },
      { label: 'I challenged a rent increase', value: 'Rent Increase' },
      { label: 'I asked the rental provider or their agent to not enter the property without notice', value: 'No notice access' },
      { label: 'Something else', value: 'Other' },
    ],
    Prompt: (
      <span>Why do you believe that the Notice to Vacate is retaliatory?</span>
    ),
    Help: (
      <span>Please select all that apply.</span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_RETALIATORY_REASON_OTHER',
    stage: 2,
    askCondition: isRetaliatoryReasonOther,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>What are the other reasons that you believe that the Notice to Vacate is retaliatory?</span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_VCAT_HEARING',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Have you been given a date for an evictions hearing at VCAT?</span>
    ),
  },
  {
    name: 'EVICTION_RETALIATORY_VCAT_HEARING_DATE',
    stage: 2,
    askCondition: isEvictionIssueWithDate,
    effect: async (data: Data) => {
      var userDate = Date.parse(data.EVICTION_RETALIATORY_VCAT_HEARING_DATE)
      var currentDate = Date.now()
      var fortnightAway = currentDate + (14 * 24 * 60 * 60 * 1000) // 14 days in milliseconds.
      if (userDate <= fortnightAway) {
        return ROUTES.INELIGIBLE_VCAT_HEARING
      }
    },
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What date is the VCAT hearing?</span>,
  },
  {
    name: 'EVICTION_RETALIATORY_TERMINATION_DATE',
    stage: 2,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>
        What is the date that you are required to vacate the property?
      </span>
    ),
    Help: (
      <span>
        You will be able to find this information on the Notice to Vacate, under "Termination Date".
      </span>
    ),
  },
]
