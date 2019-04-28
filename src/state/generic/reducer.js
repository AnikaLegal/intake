// Generic operations on backend API data
const generic = {
  // Update or insert a single data item, based on id
  UPSERT_ITEM: (state, action) => ({
    ...state,
    [action.key]: {
      ...state[action.key],
      loading: action.loading || false,
      lookup: {
        ...state[action.key].lookup,
        [action.item.id]: action.item,
      },
      list: isItemInList(action.item, state[action.key].list)
        ? updateItemInList(action.item, state[action.key].list)
        : addItemToList(action.item, state[action.key].list),
    },
  }),
  // Remove a single data item, based on id
  REMOVE_ITEM: (state, action) => ({
    ...state,
    [action.key]: {
      ...state[action.key],
      loading: false,
      lookup: removeItemFromLookup(action.item, state[action.key].lookup),
      list: removeItemFromList(action.item, state[action.key].list),
    },
  }), // Mark a set of data items as "loading"
  SET_LOADING: (state, action) => ({
    ...state,
    [action.key]: {
      ...state[action.key],
      loading: true,
    },
  }),
  // Mark a set of data items as not "loading"
  UNSET_LOADING: (state, action) => ({
    ...state,
    [action.key]: {
      ...state[action.key],
      loading: false,
    },
  }),
  // Received a set of data items from the backend
  RECEIVE_LIST: (state, { key, data }) => ({
    ...state,
    [key]: {
      loading: false,
      list: data,
      lookup: data.reduce((obj, el) => ({ ...obj, [el.id]: el }), {}),
    },
  }),
  // Received a set of data items from the backend, merge them in to what's there
  UPDATE_LIST: (state, { key, data }) => {
    const newLookup = data.reduce((obj, el) => ({ ...obj, [el.id]: el }), {})
    const lookup = { ...state[key].lookup, ...newLookup }
    return {
      ...state,
      [key]: {
        loading: false,
        list: Object.values(lookup),
        lookup: lookup,
      },
    }
  },
}

// Helper functions
const isItemInList = (item, list) => list.map(el => el.id).includes(item.id)

const addItemToList = (item, list) => [...list, item]

const updateItemInList = (item, list) =>
  list.map(el => (el.id === item.id ? item : el))

const removeItemFromList = (item, list) => list.filter(el => el.id !== item.id)

const removeItemFromLookup = (item, lookup) => {
  const newLookup = { ...lookup }
  delete newLookup[item.id]
  return newLookup
}

export default generic
