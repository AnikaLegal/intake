import { FIELD_TYPES } from 'consts'

const LETTER_PERMISSION = {
  name: 'LETTER_PERMISSION',
  prompt:
    'If any letters or notices need to be sent to your landlord, would you prefer Anika to send those letters or notices to you landlord or would you prefer Anika to prepare the letters or notices for you to send to landlord?',
  help:
    'Letters sent from Anika will place more pressure on the landlord because they will notify the landlord that you have engaged legal advisors to act for you. Letters that are sent personally by you to the landlord will be more "gentle" because legal advisors are not involved.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'I would prefer Anika to send any letters or notices to my landlord.',
    'I would prefer Anika to prepare the letters or notices so that I can personally send them to my landlord',
  ],
}

const CLIENT_NAME = {
  name: 'CLIENT_NAME',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

const CLIENT_RENTAL_ADDRESS = {
  name: 'CLIENT_RENTAL_ADDRESS',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Address of rental property in issue',
}

const CLIENT_PERSONAL_ADDRESS = {
  name: 'CLIENT_PERSONAL_ADDRESS',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Personal address',
}

const CLIENT_EMAIL = {
  name: 'CLIENT_EMAIL',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

const CLIENT_BUSINESS_PHONE = {
  name: 'CLIENT_BUSINESS_PHONE',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number (business hours)',
}

const CLIENT_EVENING_PHONE = {
  name: 'CLIENT_EVENING_PHONE',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number (outside business hours)',
}

const CLIENT_CONTACT_METHOD = {
  name: 'CLIENT_CONTACT_METHOD',
  prompt: 'How would you like to be contacted you?',
  type: FIELD_TYPES.MULTICHOICE,
  options: ['Phone and email (we prefer this)', 'Email only'],
}

const CLIENT_REFERRAL = {
  name: 'CLIENT_REFERRAL',
  type: FIELD_TYPES.TEXTAREA,
  prompt: 'How did you hear about Anika?',
}

export const PERSONAL_DETAILS_FORM = {
  name: 'PERSONAL_DETAILS_FORM',
  prompt: 'We need to know more about you',
  fields: [
    CLIENT_NAME,
    CLIENT_RENTAL_ADDRESS,
    CLIENT_PERSONAL_ADDRESS,
    CLIENT_EMAIL,
    CLIENT_BUSINESS_PHONE,
    CLIENT_EVENING_PHONE,
  ],
}

export const PERSONAL_PREFERENCES_FORM = {
  name: 'PERSONAL_PREFERENCES_FORM',
  prompt: 'Tell us what you prefer',
  fields: [LETTER_PERMISSION, CLIENT_CONTACT_METHOD, CLIENT_REFERRAL],
}
