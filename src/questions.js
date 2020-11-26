//@flow
import * as React from 'react'
import { createBrowserHistory } from 'history'

import { FIELD_TYPES, ROUTES } from 'consts'
import { events } from 'analytics'
import type { Field, Data } from 'types'

const isRepairIssue = (data: Data) => data.ISSUES.includes('REPAIRS')
const isRentReductionIssue = (data: Data) =>
  data.ISSUES.includes('RENT_REDUCTION')
const isOtherIssue = (data: Data) => data.ISSUES.includes('OTHER')
const isManagerAgent = (data: Data) => data.PROPERTY_MANAGER_IS_AGENT

const isManagerLandlord = (data: Data) => !data.PROPERTY_MANAGER_IS_AGENT

export const QUESTIONS: Array<Field> = [
  // Stage 0 - client info.
  {
    name: 'INTRO',
    stage: 0,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        First of all, congratulations on taking the first step in solving your
        rental issues.
      </span>
    ),
    button: { text: 'Thank you', Icon: null },
  },
  {
    name: 'FIRST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Let's start with your <strong>first name.</strong>
      </span>
    ),
  },
  {
    name: 'LAST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        And your <strong>last name?</strong>
      </span>
    ),
  },
  {
    name: 'EMAIL',
    stage: 0,
    required: true,
    type: FIELD_TYPES.EMAIL,
    effect: (data: Data) => {
      events.onFirstSave()
    },
    Prompt: (
      <span>
        What <strong>email address</strong> can we reach you at?
      </span>
    ),
    Help: (
      <span>
        Our paralegals will use this address to contact you once you complete
        the questionnaire.
      </span>
    ),
  },

  // Stage 0 - eligibility
  {
    name: 'IS_VICTORIAN',
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you live in Victoria?</span>,
  },
  {
    name: 'IS_TENANT',
    stage: 0,
    effect: (data: Data) => {
      const isEligible = data.IS_VICTORIAN && data.IS_TENANT
      if (!isEligible) {
        const history = createBrowserHistory()
        history.push(ROUTES.INELIGIBLE)
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you rent the property that you are enquring about?</span>,
  },

  // Stage 1 - Issues
  {
    name: 'ADDRESS',
    stage: 1,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your address?</span>,
  },
  {
    name: 'ISSUES',
    stage: 1,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'I need rental repairs', value: 'REPAIRS' },
      { label: 'I need a reduction in rent', value: 'RENT_REDUCTION' },
      { label: 'Some other rental issue', value: 'OTHER' },
    ],
    Prompt: <span>What do you need help with?</span>,
  },
  {
    name: 'START_DATE',
    stage: 1,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did you start living at this property?</span>,
  },
  {
    name: 'IS_ON_LEASE',
    stage: 1,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Are you named as a tenant on the lease?</span>,
    Help: (
      <span>
        If you signed the lease, it is likely that you are named as a tenant.
      </span>
    ),
  },
  // Stage 1 - Repairs issues.
  {
    name: 'REPAIRS_INTRO',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Rental repairs</span>,
    Help: (
      <span>
        Thank you for your responses so far. We will now ask a few questions
        around your rental repairs.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'REPAIRS_REQUIRED',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Water', value: 'Water' },
      { label: 'Roof', value: 'Roof' },
      { label: 'Heating or cooling', value: 'Heating or cooling' },
      { label: 'Toilet', value: 'Toilet' },
      { label: 'Cooking', value: 'Cooking' },
      { label: 'Electricity', value: 'Electricity' },
      { label: 'Fire', value: 'Fire' },
      { label: 'Gas', value: 'Gas' },
      { label: 'Laundry', value: 'Laundry' },
      { label: 'Other', value: 'Other' },
    ],
    Prompt: <span>What do your rental repairs relate to?</span>,
    Help: <span>Choose as many as you like</span>,
  },
  {
    name: 'REPAIRS_ISSUE_DESCRIPTION',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Please provide a short description of the problems at your rental
        property.
      </span>
    ),
  },
  {
    name: 'REPAIRS_ISSUE_START',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did these problems arise?</span>,
    Help: (
      <span>
        If you don't know the exact date, that's okay. An approximate date is
        fine.
      </span>
    ),
  },
  {
    name: 'REPAIRS_ISSUE_PHOTO',
    stage: 1,
    askCondition: isRepairIssue,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Do you have any photos of the problem(s) that you could upload?
      </span>
    ),
    Help: (
      <span>
        If you do not have any photos of the problem(s) to upload, that’s
        completely okay.
      </span>
    ),
  },
  {
    name: 'REPAIRS_OUTRO',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>Thanks. That is all the questions about rental repairs.</span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  // Stage 1 - Rend reduction issues.
  {
    name: 'RENT_REDUCTION_INTRO',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Rent reduction</span>,
    Help: (
      <span>
        Thank you for your responses so far. We will now ask you some questions
        about your rental situation.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'RENT_REDUCTION_ISSUES',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Reduced income', value: 'Reduced income' },
      { label: 'Unable to work', value: 'Unable to work' },
      { label: 'Emotional distress', value: 'Emotional distress' },
      {
        label: 'Another tenant moved out',
        value: 'Another tenant moved out',
      },
      { label: 'Other', value: 'Other' },
    ],
    Prompt: <span>How have you been affected by COVID-19?</span>,
    Help: <span>Choose as many as you like</span>,
  },
  {
    name: 'RENT_REDUCTION_ISSUE_DESCRIPTION',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Please provide a short description of how you have been affected.
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_ISSUE_START',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did these problems arise?</span>,
    Help: (
      <span>
        If you don't know the exact date, that's okay. An approximate date is
        fine.
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_ISSUE_PHOTO',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload a photo of any evidence of how you have been affected.
      </span>
    ),
    Help: (
      <span>
        For example, if you have lost your job and have received a letter of
        termination, please upload the a photo letter of termination. Providing
        evidence will increase your chance of obtaining a rent reduction but if
        you don't have any right now that is ok.
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_IS_NOTICE_TO_VACATE',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Has the landlord tried to evict you by providing you with a Notice to
        Vacate?
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_NOTICE_TO_VACATE_DOCUMENT',
    stage: 1,
    askCondition: (data: Data) =>
      isRentReductionIssue(data) && data.RENT_REDUCTION_IS_NOTICE_TO_VACATE,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: <span>Please upload a photo of your Notice to Vacate.</span>,
  },
  {
    name: 'RENT_REDUCTION_OUTRO',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        Thank you. That is all the questions about COVID-19 rental assistance.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  // Stage 1 - Other issues.
  {
    name: 'OTHER_INTRO',
    stage: 1,
    askCondition: isOtherIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Other rental issues.</span>,
    Help: (
      <span>
        We will now ask you a few questions around your other issues with your
        rental property.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'OTHER_ISSUE_DESCRIPTION',
    stage: 1,
    askCondition: isOtherIssue,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Please provide a short description of how you have been affected.
      </span>
    ),
  },
  {
    name: 'OTHER_OUTRO',
    stage: 1,
    askCondition: isOtherIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        Thank you. That is all the questions about other issues with your rental
        property.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },

  // Stage 2 - Landlord details.
  {
    name: 'PROPERTY_MANAGER_INTRO',
    stage: 2,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>Almost done! Now just a few questions about your landlord.</span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'PROPERTY_MANAGER_IS_AGENT',
    stage: 2,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Does your landlord use a <strong>real estate agent</strong> to manage
        the property?
      </span>
    ),
  },
  {
    name: 'AGENT_NAME',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's full name?</span>,
  },
  {
    name: 'AGENT_ADDRESS',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's address?</span>,
  },
  {
    name: 'AGENT_EMAIL',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's agent's email?</span>,
  },
  {
    name: 'AGENT_PHONE',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's agent's phone number?</span>,
  },
  {
    name: 'LANDLORD_NAME',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's full name?</span>,
  },
  {
    name: 'LANDLORD_ADDRESS',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's address?</span>,
  },
  {
    name: 'LANDLORD_EMAIL',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's email?</span>,
  },
  {
    name: 'LANDLORD_PHONE',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's phone number?</span>,
  },
  {
    name: 'CONTACT_INTRO',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        Great job. That is all the questions we have about your property. Now we
        just need a few details about you.
      </span>
    ),
    Help: (
      <span>
        These details will help us to better understand who you are and when we
        can contact you.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'POSTCODE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your post code?</span>,
  },
  {
    name: 'SUBURB',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What suburb do you live in?</span>,
  },
  {
    name: 'DOB',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What is your date of birth?</span>,
  },

  {
    name: 'GENDER',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Self-described', value: 'other' },
      { label: 'Prefer not to say', value: 'omitted' },
    ],
    Prompt: <span>What gender do you identify as?</span>,
  },
  {
    name: 'GENDER_DETAILS',
    stage: 3,
    required: true,
    askCondition: (data: Data) => data.GENDER == 'other',
    type: FIELD_TYPES.TEXT,
    Prompt: <span>Please describe your gender.</span>,
  },
  {
    name: 'IS_ABORIGINAL_OR_TORRES_STRAIT_ISLANDER',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Are you of Aboriginal or Torres Strait Islander origin?</span>
    ),
  },
  {
    name: 'CAN_SPEAK_NON_ENGLISH',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you speak a language other than English?</span>,
  },
  {
    name: 'PHONE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is the best phone number to contact you on?</span>,
  },
  {
    name: 'AVAILIBILITY',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Monday to Friday (9am to 5pm)', value: 'WEEK_DAY' },
      { label: 'Monday to Friday (5pm to 8pm)', value: 'WEEK_EVENING' },
      { label: 'Saturday (9am to 5pm)', value: 'SATURDAY' },
      { label: 'Sunday (9am to 5pm)', value: 'SUNDAY' },
    ],
    Prompt: <span>When is your preferred time for us to call you?</span>,
  },
  {
    name: 'REFERRER_TYPE',
    stage: 3,
    required: true,
    Prompt: <span>How did you hear about Anika?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Legal centre',
        value: 'LEGAL_CENTRE',
      },
      { label: 'Housing service', value: 'HOUSING_SERVICE' },
      { label: 'Charity / non-profit', value: 'CHARITY' },
      { label: 'Social media', value: 'SOCIAL_MEDIA' },
      { label: 'Google search', value: 'SEARCH' },
      { label: 'Word of mouth', value: 'WORD_OF_MOUTH' },
      { label: 'Online ad', value: 'ONLINE_AD' },
    ],
  },
  {
    name: 'LEGAL_CENTER_REFERRER',
    stage: 3,
    required: true,
    askCondition: (data: Data) => data.REFERRER_TYPE == 'LEGAL_CENTRE',
    Prompt: <span>Which legal centre referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Victoria Legal Aid', value: 'Victoria Legal Aid' },
      { label: 'Justice Connect', value: 'Justice Connect' },
      {
        label: 'Consumer Affairs Victoria',
        value: 'Consumer Affairs Victoria',
      },
      {
        label: 'Asylum Seeker Resource Centre',
        value: 'Asylum Seeker Resource Centre',
      },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'HOUSING_SERVICE_REFERRER',
    askCondition: (data: Data) => data.REFERRER_TYPE == 'HOUSING_SERVICE',
    stage: 3,
    required: true,
    Prompt: <span>Which housing service referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Launch Housing', value: 'Launch Housing' },
      { label: 'Quantum', value: 'Quantum' },
      { label: 'Women’s Housing', value: 'Women’s Housing' },
      { label: 'Rental and Housing Union', value: 'Rental and Housing Union' },
      { label: 'Better Renting', value: 'Better Renting' },
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'CHARITY_REFERRER',
    askCondition: (data: Data) => data.REFERRER_TYPE == 'CHARITY',
    stage: 3,
    required: true,
    Prompt: <span>Which charity or non-profit referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Ethic Communities Council of Victoria',
        value: 'Ethic Communities Council of Victoria',
      },
      { label: 'Jewish Care', value: 'Jewish Care' },
      { label: 'Sacred Heart Mission', value: 'Sacred Heart Mission' },
      { label: 'St Vincent De Paul', value: 'St Vincent De Paul' },
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'SOCIAL_REFERRER',
    stage: 3,
    askCondition: (data: Data) => data.REFERRER_TYPE == 'SOCIAL_MEDIA',
    required: true,
    Prompt: <span>Which social media site did you find us on?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Facebook',
        value: 'Facebook',
      },
      { label: 'Instagram', value: 'Instagram' },
      { label: 'Twitter', value: 'Twitter' },
      { label: 'LinkedIn', value: 'LinkedIn' },
      { label: 'Pintrest', value: 'Pintrest' },
      { label: 'Reddit', value: 'Reddit' },
      { label: 'Other', value: 'Other' },
    ],
  },
]
