// @flow
import { validate, flattenArray, entries } from 'utils'
import type {
  Data,
  Submission,
  Section,
  Field,
  Form,
  Validations,
  Rule,
} from 'types'

// A gross way to "ensure" ordering.
export const getBackendAnswers = (
  answers: Data
): Array<{
  name: string,
  answer: mixed,
}> => entries(answers).map(([name, answer]) => ({ name, answer }))

export const getFrontendAnswers = (submission: Submission): Data =>
  submission.answers.reduce(
    (obj, { name, answer }) => ({
      ...obj,
      [name]: answer,
    }),
    {}
  )

// This is a bit messy because we have fields with fields inside
// ... maybe that was a stupid choice.
export const getQuestions = (sections: Array<Section>): { [string]: Field } =>
  sections
    // Get all the fields out of the section forms
    .map(s => s.forms.map(form => form.fields).reduce(flattenArray, []))
    .reduce(flattenArray, [])
    // Get all the fields out of the nested fields
    .map(field => (field.fields ? field.fields : field))
    .reduce((arr, f) => (Array.isArray(f) ? [...arr, ...f] : [...arr, f]), [])
    // Put everything in an object map
    .reduce((obj, field) => ({ ...obj, [field.name]: field }), {})

export const getForms = (questions: Array<Section>): Array<Form> => {
  return questions.map(q => q.forms).reduce((arr, f) => [...arr, ...f], [])
}

// FIXME this code assume that there are form rules, which isn't true any more.
// The form rules have been removed but the code hasn't been cleaned up.
export const getValidation = (form: Form, answers: Data): Validations => {
  const fieldRules: { [string]: Array<Rule> } = {}
  // Get field specific rules for each field in the form.
  for (let field of form.fields) {
    // If the field is hidden, ignore its rules, just use the form rules
    const isFieldHidden = field.when && !field.when(answers)
    if (isFieldHidden) {
      fieldRules[field.name] = []
    } else {
      fieldRules[field.name] = field.rules
    }
    if (field.fields) {
      // If the field is a FieldGroup, check its subfields
      for (let subfield of field.fields) {
        const isSubFieldHidden = subfield.when && !subfield.when(answers)
        // If the subfield is hiddent, ignore its rules, just use form rules
        if (isSubFieldHidden || isFieldHidden) {
          fieldRules[subfield.name] = []
        } else {
          fieldRules[subfield.name] = subfield.rules
        }
      }
    }
  }
  return validate(fieldRules)(answers)
}

export const getHasNext = (
  page: number,
  answers: Data,
  forms: Array<Form>
): boolean => {
  if (page + 1 >= forms.length) return false
  const nextForm = forms[page + 1]
  if (nextForm.when && !nextForm.when(answers)) {
    return getHasNext(page + 1, answers, forms)
  } else {
    return true
  }
}

export const getHasPrev = (
  page: number,
  answers: Data,
  forms: Array<Form>
): boolean => {
  if (page - 1 < 0) return false
  const prevForm = forms[page - 1]
  if (prevForm.when && !prevForm.when(answers)) {
    return getHasPrev(page - 1, answers, forms)
  } else {
    return true
  }
}
