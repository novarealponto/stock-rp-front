import { applySpec, filter, map, pathOr, pipe, split } from 'ramda'
import moment from 'moment'

export const buildProduct = applySpec({
  category: pathOr('', ['category']),
  key: pathOr('', ['id']),
  max: pathOr(1, ['available']),
  name: pathOr('', ['name']),
  serial: pathOr(false, ['serial']),
})

export const buildReception = applySpec({
  date: pathOr(moment(), ['date']),
  reserveInternoParts: pipe(
    pathOr([], ['products']),
    map(
      applySpec({
        amount: pathOr(0, ['quantity']),
        productBaseId: pathOr('', ['productBaseId']),
        serialNumberArray: pipe(
          pathOr('', ['serialNumbers']),
          split('\n'),
          filter((item) => item)
        ),
        stockBase: () => 'ESTOQUE',
      })
    )
  ),
  razaoSocial: pathOr('', ['razaoSocial']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  technicianId: pathOr('', ['technician']),
})

export const buildTechnician = applySpec({
  key: pathOr('', ['id']),
  name: pathOr('', ['name']),
})
