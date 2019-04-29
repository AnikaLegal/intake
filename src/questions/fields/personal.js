import { FIELD_TYPES } from 'consts'

export const LETTER_PERMISSION = {
  name: 'LETTER_PERMISSION',
  prompt: 'If any letters or notices need to be sent to your landlord, would you prefer Anika to send those letters or notices to you landlord or would you prefer Anika to prepare the letters or notices for you to send to landlord?',
  help: 'Letters sent from Anika will place more pressure on the landlord because they will notify the landlord that you have engaged legal advisors to act for you. Letters that are sent personally by you to the landlord will be more "gentle" because legal advisors are not involved.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'I would prefer Anika to send any letters or notices to my landlord.',
    'I would prefer Anika to prepare the letters or notices so that I can personally send them to my landlord',
  ]
}

export const CLIENT_NAME = {
  name: 'CLIENT_NAME',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

export const CLIENT_RENTAL_ADDRESS = {
  name: 'CLIENT_RENTAL_ADDRESS',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Address of rental property in issue',
}

export const CLIENT_PERSONAL_ADDRESS = {
  name: 'CLIENT_PERSONAL_ADDRESS',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Personal address',
}

export const CLIENT_EMAIL = {
  name: 'CLIENT_EMAIL',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

export const CLIENT_BUSINESS_PHONE = {
  name: 'CLIENT_BUSINESS_PHONE',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number (business hours)',
}

export const CLIENT_EVENING_PHONE = {
  name: 'CLIENT_EVENING_PHONE',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number (outside business hours)',
}

export const CLIENT_CONTACT_METHOD = {
  name: 'CLIENT_CONTACT_METHOD',
  prompt: 'How would you like to be contacted you?',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Phone and email (we prefer this)',
    'Email only',
  ]
}

export const CLIENT_REFERRAL = {
  name: 'CLIENT_REFERRAL',
  type: FIELD_TYPES.TEXT,
  prompt: 'How did you hear about Anika?'
},
