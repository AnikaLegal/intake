// Rules for the validator
// Each rule gets a tuple (data, key)
// and returns a validation object { valid: bool, errors: [string] }

// Ensures that this field is the same as another field.
const isSameAs = (fieldName, displayName = null) => (data, key) => {
  const thisValue = data[key]
  const otherValue = data[fieldName]
  const name = displayName || fieldName
  return thisValue === otherValue
    ? { valid: true, errors: [] }
    : { valid: false, errors: [`This must be the same as ${name}`] }
}

// Validator shortcut for simple independent validations
const validatePredicate = (predicate, message) => (data, key) => {
  const value = data[key]
  return predicate(value)
    ? { valid: true, errors: [] }
    : { valid: false, errors: [message] }
}

// Email validator
const RFC2822EmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const isEmailPredicate = email => !email || RFC2822EmailRegex.exec(email)
const isEmail = validatePredicate(
  isEmailPredicate,
  'This must be a valid email'
)

// URL validator (http://urlregex.com/)
const URLRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
const isURLPredicate = url => !url || URLRegex.exec(url)
const isURL = validatePredicate(isURLPredicate, 'This must be a valid URL')

// Truthy validator - `0` is truthy.
const isTruthyPredicate = v => Boolean(v) || v === 0
const isTruthy = validatePredicate(isTruthyPredicate, 'This is required')

// Truthy validator for objects - `0` is truthy.
const isAllTruthyValuesPredicate = obj =>
  obj &&
  Object.values(obj).length > 0 &&
  Object.values(obj).every(v => Boolean(v) || v === 0)
const isAllTruthyValues = validatePredicate(
  isAllTruthyValuesPredicate,
  'This is required'
)

// Truthy validator for objects - `0` is truthy.
const isSomeTruthyValuesPredicate = obj =>
  obj &&
  Object.values(obj).length > 0 &&
  Object.values(obj).some(v => Boolean(v) || v === 0)
const isSomeTruthyValues = validatePredicate(
  isSomeTruthyValuesPredicate,
  'This is required'
)

// Number validatior
const isNumberPredicate = v => !v || !isNaN(v)
const isNumber = validatePredicate(isNumberPredicate, 'This must be a number')

// Positive number validatior
const isPositiveNumberPredicate = v => !v || (isNumber(v) && v >= 0)
const isPositiveNumber = validatePredicate(
  isPositiveNumberPredicate,
  'This must be a positive number'
)

// Length validator
const isLength = (length, unit) =>
  validatePredicate(
    v => !isTruthyPredicate(v) || v.length >= length,
    `This must be at least ${length} ${unit} long`
  )

// Greater than validator
const isGreaterThan = number =>
  validatePredicate(
    v => !isTruthyPredicate(v) || (!isNaN(v) && v > number),
    `This value must be greater than ${number}`
  )

// Less than validator
const isLessThan = number =>
  validatePredicate(
    v => !isTruthyPredicate(v) || (!isNaN(v) && v < number),
    `This value must be less than ${number}`
  )

const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// Checks for a valid ABN based on https://abr.business.gov.au/Help/AbnFormat
const isAustralianBusinessNumber = (data, key) => {
  const abnString = (data[key] || '').replace(/\s/g, '')
  if (!isTruthyPredicate(abnString)) {
    return { valid: true, errors: [] }
  } else if (!isNumberPredicate(abnString)) {
    return { valid: false, errors: ['This must be a number'] }
  }
  const abnNumbers = abnString.split('').map(parseFloat)
  const isLength = abnNumbers.length === 11

  // Subtract 1 from the first (left-most) digit of the ABN to give a new 11 digit number
  abnNumbers[0] -= 1
  // Multiply each of the digits in this new number by a "weighting factor" based on its position as shown in ABN_WEIGHTS
  // Then sum the resulting products
  const abnSum = abnNumbers
    .map((number, idx) => number * ABN_WEIGHTS[idx])
    .reduce((total, number) => total + number, 0)

  // Divide the sum total by 89, noting the remainder
  // If the remainder is zero the number is a valid ABN
  const isCheckSum = abnSum % 89 === 0
  return isLength && isCheckSum
    ? { valid: true, errors: [] }
    : { valid: false, errors: ['This must be valid ABN'] }
}

export const rules = {
  isEmail,
  isURL,
  isTruthy,
  isAllTruthyValues,
  isSomeTruthyValues,
  isNumber,
  isPositiveNumber,
  isLength,
  isGreaterThan,
  isLessThan,
  isSameAs,
  isAustralianBusinessNumber,
}
