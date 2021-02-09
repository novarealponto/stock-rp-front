import moment from 'moment'
import { applySpec, pathOr, pipe, prop, propOr } from 'ramda'

export const buildSupplyProduct = applySpec({
  id: propOr(undefined, 'id'),
  esporadico: propOr(false, 'exporadic'),
  manufacturerId: prop('manufacturerId'),
  minimumQuantity: prop('minimumQuantity'),
  name: prop('product'),
  unit: prop('unit'),
})

export const buildDataSouce = applySpec({
  code: pathOr('', ['code']),
  createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
  exporadic: pathOr('', ['esporadico']),
  id: pathOr('', ['id']),
  key: pathOr('', ['id']),
  manufacturer: pathOr('', ['manufacturer', 'name']),
  manufacturerId: pathOr('', ['manufacturerId']),
  minimumQuantity: pathOr('', ['minimumQuantity']),
  product: pathOr('', ['name']),
  unit: pathOr('', ['unit']),
})
