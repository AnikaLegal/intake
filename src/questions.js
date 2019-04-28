export const Q_TYPES = {
  MULTICHOICE: 'MULTICHOICE',
  TEXTAREA: 'TEXTAREA',
  FILE: 'FILE',
  DATE: 'DATE',
  BOOLEAN: 'BOOLEAN',
  FORM: 'FORM',
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
}

export const QUESTIONS = [
  // Defect details
  {
    type: Q_TYPES.FORM,
    children: [
      {
        prompt: 'What does the defect relate to?',
        help: 'If none apply, please select \'other\'',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Toilet',
          'Water',
          'Electricity',
          'Cooking',
          'Fire',
          'Stairs / lift',
          'Laundry',
          'Gas',
          'Roof',
          'Heating / cooling',
          'Other',
        ],
      },
      {
        prompt: 'Please provide a short description of the defect',
        help: 'Just explain it as if you were telling a friend about it',
        type: Q_TYPES.TEXTAREA,
      },
      {
        prompt: 'If you have a photo of the defect, please upload it (as it will help us to assist you)',
        help: 'If you do not have a photo of the defect to upload, that’s completely okay',
        type: Q_TYPES.FILE,
      },
    ],
  },
  // Has contacted landlord
  {
    prompt: 'Have you contacted or attempted to contact your landlord (or your landlord’s agent) to ask them to fix the defect?',
    type: Q_TYPES.MULTICHOICE,
    options: [
      'Yes, I have contacted my landlord (or my landlord’s agent) and have asked them to fix the defect.',
      'I have tried contacting my landlord (or my landlord’s agent) and have left a message for them.',
      'No, I have not yet made any attempts to contact my landlord or (or my landlord’s agent).',
      // (If "no", go straight to "you should contact your landlord")
    ],
  },
  // Landlord contact
  {
    type: Q_TYPES.FORM,
    children: [
      // Landlord contact method
      {
        prompt: 'How did you contact your landlord (or your landlord’s agent)?',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Phone',
          'Email',
          'SMS',
          'Letter',
          'In person',
        ]
      },
      // Landlord contact date
      {
        prompt: 'When did you first contact or attempt to contact your landlord (or your landlord’s agent)?',
        type: Q_TYPES.DATE,
      },
      // Landlord contact attempts
      {
        prompt: 'How many times have you contacted your landlord (or your landlord’s agent)?',
        help: 'It doesn’t matter if you have contacted your landlord once or three times, it’s just helpful for us to know.',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Once',
          'Twice',
          'Three times',
          'More than three',
        ]
      },
      // Records of communication
      {
        prompt: 'Do you have records of your communications with your landlord (or your landlord’s agent) in which you asked for the defect to be fixed?',
        help: 'Records could include emails or text messages you sent. It could also be the call log in your phone saying you called them on a certain day.',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Yes, I have records.',
          'No, I do not have any records.',
          // If no, you need to get records.
        ]
      },
    ]
  },
  // Landlord details
  {
    type: Q_TYPES.FORM,
    children: [
      {
        prompt: 'Does your landlord use an agent to manage the property?',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Yes',
          'No',
        ],
      },
      {
        type: Q_TYPES.FORM,
        prompt: 'Please provide the details of your landlord or your landlord’s agent.',
        children: [
          {
            type: Q_TYPES.TEXT,
            placeholder: 'Full name',
          },
          {
            type: Q_TYPES.TEXT,
            placeholder: 'Email address',
          },
          {
            type: Q_TYPES.TEXT,
            placeholder: 'Mobile number',
          },
        ],
      },
    ],
  },
  // Has obtained quote
  {
    prompt: 'Have you obtained  a quote (i.e. an estimate) for the cost of the repairs to fix the defect?',
    // (If No, straight to Q12)
    help: 'It doesn’t matter if you haven’t obtained a quote yet.',
    type: Q_TYPES.MULTICHOICE,
    options: [
      'Yes, I have obtained a quote.',
      'No, I have not obtained a quote.',
    ]
  },
  // Quote details
  {
    type: Q_TYPES.FORM,
    children: [
      {
        prompt: 'What was the quote for the cost of the repairs to fix the defect?',
        type: Q_TYPES.NUMBER,
      },
      {
        prompt: 'Do you have the money (and would you be willing) to pay for the repairs yourself and then seek reimbursement from your landlord?',
        help: 'Paying for the repairs yourself (and then seeking reimbursement from your landlord) is the fastest way to get the defect fixed. However, we expect that most tenants will not wish to pay for the repairs themselves.',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Yes',
          'No',
        ],
      },
    ],
  },
  // Willing to take landlord to VCAT?
  {
    prompt: 'Sometimes the only way to force a landlord to fix defects is to commence VCAT proceedings against the landlord. Would you be comfortable bringing VCAT proceedings against your landlord?',
    // (If Yes, straight to Q15)
    help: 'VCAT is a tribunal that hears and decides disputes between tenants and landlord. VCAT performs similar functions to a court, but is cheaper, faster and more informal than a court. A common reason why a tenant may not want to commence VCAT proceedings is they do not want to aggravate their relationship with their landlord because they are trying to secure an upcoming lease renewal.',
    type: Q_TYPES.MULTICHOICE,
    options: [
      'Yes.',
      'No.',
    ]
  },
  {
    prompt: 'Can you please explain why you wouldn’t be comfortable bringing VCAT proceedings against your landlord?',
    type: Q_TYPES.TEXTAREA,
  },
  // Letter sending preferences
  {
    prompt: 'If any letters or notices need to be sent to your landlord, would you prefer Anika to send those letters or notices to you landlord or would you prefer Anika to prepare the letters or notices for you to send to landlord?',
    help: 'Letters sent from Anika will place more pressure on the landlord because they will notify the landlord that you have engaged legal advisors to act for you. Letters that are sent personally by you to the landlord will be more "gentle" because legal advisors are not involved.',
    type: Q_TYPES.MULTICHOICE,
    options: [
      'I would prefer Anika to send any letters or notices to my landlord.',
      'I would prefer Anika to prepare the letters or notices so that I can personally send them to my landlord',
    ]
  },
  // Personal details
  {
    type: Q_TYPES.FORM,
    prompt: 'Please provide the details of your landlord or your landlord’s agent.',
    help: 'We need get a bit more information so we can best help you resolve your issue. Your privacy and confidentiality is important to us, and we won’t misuse your personal information in any way.',
    children: [
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Full name',
      },
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Address of rental property in issue',
      },
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Personal address',
      },
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Email address',
      },
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Phone number (business hours)',
      },
      {
        type: Q_TYPES.TEXT,
        placeholder: 'Phone number (outside business hours)',
      },
      {
        prompt: 'How would you like to be contacted you?',
        type: Q_TYPES.MULTICHOICE,
        options: [
          'Phone and email (we prefer this)',
          'Email only',
        ]
      },
      {
        type: Q_TYPES.MULTICHOICE,
        prompt: 'Are you over 18?',
        options: [
          'Yes',
          'No',
        ]
      }
    ],
  },
  {
    type: Q_TYPES.TEXT,
    prompt: 'How did you hear about Anika?'
  },
]
