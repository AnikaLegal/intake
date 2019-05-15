// @flow
import type { Data, Validation, Rule, Validations } from 'types'
import { entries, values } from '../functional'

// Validate form data
export const validate = (rules: { [string]: Array<Rule> }) => (
  data: Data
): Validations => {
  // Determine whether each field is valid.
  const fields: { [string]: Validation } = {}
  for (let [fieldName, rules] of entries(rules)) {
    fields[fieldName] = getFieldValidation(fieldName, data, rules)
  }
  // Determine whether all the data is valid.
  const valid = values(fields).every(f => f.valid)
  return { valid, fields }
}

// Transform a list of validations for a key into a result object.
const getFieldValidation = (
  fieldName: string,
  data: Data,
  rules: Array<Rule>
): Validation =>
  rules
    .map(rule => rule(data, fieldName))
    .reduce(
      (acc, result: Validation) => ({
        valid: acc.valid && result.valid,
        errors: [...acc.errors, ...result.errors],
      }),
      { valid: true, errors: [] }
    )
