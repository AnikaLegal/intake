import { handleJSONResponse } from 'state/utils'

const onCatch = (key, dispatch) => e => {
  dispatch({ type: 'UNSET_LOADING', key })
  throw e
}

// Generic action to fetch a list of data
const list = (dispatch, dataType, apiCall, ...args) => {
  dispatch({ type: 'SET_LOADING', key: dataType })
  return apiCall(...args)
    .then(handleJSONResponse)
    .then(data => {
      dispatch({
        type: 'RECEIVE_LIST',
        key: dataType,
        data,
      })
      return data
    })
    .catch(onCatch(dataType, dispatch))
}

// Generic action to upsert a data item
const upsert = (dispatch, dataType, apiCall, ...args) => {
  dispatch({ type: 'SET_LOADING', key: dataType })
  return apiCall(...args)
    .then(handleJSONResponse)
    .then(item => {
      dispatch({ type: 'UPSERT_ITEM', key: dataType, item })
      return item
    })
    .catch(onCatch(dataType, dispatch))
}

// Generic action to upsert a data item with no loading state
const quietUpsert = (dispatch, dataType, apiCall, ...args) => {
  return apiCall(...args)
    .then(handleJSONResponse)
    .then(item => {
      dispatch({ type: 'UPSERT_ITEM', key: dataType, item })
      return item
    })
    .catch(onCatch(dataType, dispatch))
}

// Generic action to delete a data item
const remove = (dispatch, dataType, apiCall, ...args) => {
  dispatch({ type: 'SET_LOADING', key: dataType })
  return apiCall(...args)
    .then(handleJSONResponse)
    .then(item => dispatch({ type: 'REMOVE_ITEM', key: dataType, item }))
    .catch(onCatch(dataType, dispatch))
}

const generic = {
  list,
  upsert,
  remove,
  quietUpsert,
}

export default generic
