import { FIELD_TYPES } from 'consts'

const HAS_CONTACTED_LANDLORD = {
  name: 'HAS_CONTACTED_LANDLORD',
  prompt:
    'Have you contacted or attempted to contact your landlord (or your landlord’s agent) to ask them to fix the defect?',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Yes, I have contacted my landlord (or my landlord’s agent) and have asked them to fix the defect.',
    'I have tried contacting my landlord (or my landlord’s agent) and have left a message for them.',
    'No, I have not yet made any attempts to contact my landlord or (or my landlord’s agent).',
    // (If "no", go straight to "you should contact your landlord")
  ],
}

const LANDLORD_CONTACT_METHOD = {
  name: 'LANDLORD_CONTACT_METHOD',
  prompt: 'How did you contact your landlord (or your landlord’s agent)?',
  type: FIELD_TYPES.MULTICHOICE,
  options: ['Phone', 'Email', 'SMS', 'Letter', 'In person'],
}

const LANDLORD_CONTACT_DATE = {
  name: 'LANDLORD_CONTACT_DATE',
  prompt:
    'When did you first contact or attempt to contact your landlord (or your landlord’s agent)?',
  type: FIELD_TYPES.DATE,
}

const LANDLORD_CONTACT_ATTEMPTS = {
  name: 'LANDLORD_CONTACT_ATTEMPTS',
  prompt:
    'How many times have you contacted your landlord (or your landlord’s agent)?',
  help:
    'It doesn’t matter if you have contacted your landlord once or three times, it’s just helpful for us to know.',
  type: FIELD_TYPES.MULTICHOICE,
  options: ['Once', 'Twice', 'Three times', 'More than three'],
}

const LANDLORD_CONTACT_RECORDS = {
  name: 'LANDLORD_CONTACT_RECORDS',
  prompt:
    'Do you have records of your communications with your landlord (or your landlord’s agent) in which you asked for the defect to be fixed?',
  help:
    'Records could include emails or text messages you sent. It could also be the call log in your phone saying you called them on a certain day.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Yes, I have records.',
    'No, I do not have any records.',
    // If no, you need to get records.
  ],
}

const LANDLORD_HAS_AGENT = {
  name: 'LANDLORD_HAS_AGENT',
  prompt: 'Does your landlord use an agent to manage the property?',
  type: FIELD_TYPES.MULTICHOICE,
  options: ['Yes', 'No'],
}

const LANDLORD_NAME = {
  name: 'LANDLORD_NAME',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

const LANDLORD_EMAIL = {
  name: 'LANDLORD_EMAIL',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

const LANDLORD_PHONE = {
  name: 'LANDLORD_PHONE',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Mobile number',
}

const IS_VCAT_OK = {
  name: 'IS_VCAT_OK',
  prompt:
    'Sometimes the only way to force a landlord to fix defects is to commence VCAT proceedings against the landlord. Would you be comfortable bringing VCAT proceedings against your landlord?',
  help:
    'VCAT is a tribunal that hears and decides disputes between tenants and landlord. VCAT performs similar functions to a court, but is cheaper, faster and more informal than a court. A common reason why a tenant may not want to commence VCAT proceedings is they do not want to aggravate their relationship with their landlord because they are trying to secure an upcoming lease renewal.',
  type: FIELD_TYPES.MULTICHOICE,
  options: ['Yes.', 'No.'],
}

const VCAT_AVOID_REASON = {
  name: 'VCAT_AVOID_REASON',
  prompt:
    'Can you please explain why you wouldn’t be comfortable bringing VCAT proceedings against your landlord?',
  type: FIELD_TYPES.TEXTAREA,
}

export const LANDLORD_COMMS_CHECK_FORM = {
  name: 'LANDLORD_COMMS_CHECK_FORM',
  prompt: 'Tell us about your landlord',
  fields: [HAS_CONTACTED_LANDLORD],
}

export const LANDLORD_COMMS_DETAILS_FORM = {
  name: 'LANDLORD_COMMS_DETAILS_FORM',
  prompt: 'Tell us about your landlord',
  fields: [
    LANDLORD_CONTACT_METHOD,
    LANDLORD_CONTACT_DATE,
    LANDLORD_CONTACT_ATTEMPTS,
    LANDLORD_CONTACT_RECORDS,
  ],
}

export const LANDLORD_DETAILS_FORM = {
  name: 'LANDLORD_DETAILS_FORM',
  prompt: 'Tell us about your landlord',
  fields: [
    LANDLORD_HAS_AGENT,
    LANDLORD_NAME,
    LANDLORD_EMAIL,
    LANDLORD_PHONE,
    IS_VCAT_OK,
  ],
}

export const VCAT_AVOID_REASON_FORM = {
  name: 'VCAT_AVOID_REASON_FORM',
  prompt: 'Tell us more',
  fields: [VCAT_AVOID_REASON],
}
