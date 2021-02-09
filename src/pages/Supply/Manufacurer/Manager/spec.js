import moment from 'moment'
import { applySpec, pathOr, pipe, prop, propOr } from 'ramda'

export const buildSupplyManufacturer = applySpec({
  id: propOr(undefined, 'id'),
  name: prop('manufacturer'),
})

export const buildDataSouce = applySpec({
  createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
  id: pathOr('', ['id']),
  key: pathOr('', ['id']),
  manufacturer: pathOr('', ['name']),
})
