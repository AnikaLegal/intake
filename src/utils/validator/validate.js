// Accepts a set of validations.
// {
//   url: [rule.IsPresent, rule.IsURL],
//   name: [rule.IsPresent],
//   age: [rule.IsPositiveNumber],
//   occupation: [],
// }
// and some data
// {
//   url: 'https://foo.com'
//   name: 'Matt',
//   age: -12,
//   occupation: '',
// }
// and returns a validation object
// {
//   valid: false,
//   fields: {
//     url: { valid: true, errors: [] },
//     name: { valid: true, errors: [] },
//     age: { valid: false, errors: ['This must be a positive number'] },
//     occupation: { valid: true, errors: [] },
//   }
// }
export const validate = validations => data => {
  // Determine whether each field is valid.
  const fields = Object.entries(validations)
    .map(getKeyResults(data))
    .reduce((acc, [key, keyResults]) => ({ ...acc, [key]: keyResults }), {})
  // Determine whether all the data is valid.
  const valid = Object.values(fields).every(f => f.valid)
  return { valid, fields }
}

// Transform a list of validations for a key into a result object.
// Eg: { valid: true, errors: [] }
const getKeyResults = data => ([key, keyValidations]) => {
  const keyResults = keyValidations
    .map(validation => validation(data, key))
    .reduce(
      (acc, result) => ({
        valid: acc.valid && result.valid,
        errors: [...acc.errors, ...result.errors],
      }),
      { valid: true, errors: [] }
    )
  return [key, keyResults]
}
