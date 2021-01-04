import { filter, keys, length, match } from 'ramda'

const applyMatch = (key, object, query) =>
  match(createRegex(query[key]), object[key])

const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi')

const filterData = (query, initialData) => {
  const callbackFilterInitialData = (item) => {
    const callbackFilterKeys = (key) => length(applyMatch(key, item, query)) > 0

    return length(filter(callbackFilterKeys, keys(query))) > 0
  }
  return filter(callbackFilterInitialData, initialData)
}

export default filterData
