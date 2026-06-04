//@flow
// Store user's form data in local storage
import { tidyData } from 'utils'

const FORM_DATA_KEY = 'intakeFormData'

export const loadFormData = (): Object | void => {
  const loadedDataStr = localStorage.getItem(FORM_DATA_KEY)
  if (loadedDataStr) {
    return JSON.parse(loadedDataStr)
  }
}

export const storeFormData = (data: Object) => {
  const tidy = tidyData(data)
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(tidy))
}
