import { filter, keys, length, match } from 'ramda'

const applyMatch = (key, object, query) =>
  match(createRegex(query[key]), object[key])

const createRegex = (pattern) => new RegExp(`${pattern}`, 'gi')

const filterData = (query, initialData, options = { and: false }) => {
  const { and } = options
  const callbackFilterInitialData = (item) => {
    const callbackFilterKeys = (key) => length(applyMatch(key, item, query)) > 0

    const lengthFilter = length(filter(callbackFilterKeys, keys(query)))

    return and ? lengthFilter === length(keys(query)) : lengthFilter > 0
  }
  return filter(callbackFilterInitialData, initialData)
}

export default filterData
