import {
  applySpec,
  equals,
  filter,
  ifElse,
  join,
  map,
  pathOr,
  pipe,
  split,
} from 'ramda'
import moment from 'moment'

export const buildInitialValues = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: pipe(pathOr('', ['date']), (date) =>
    moment(date.replace(/\D/g, ''), 'DDMMYYYY')
  ),
  os: pathOr('', ['Os']),
  products: pipe(
    pathOr([], ['products']),
    map(
      applySpec({
        amount: pathOr('', ['amount']),
        id: pathOr('', ['id']),
        key: pathOr('', ['key']),
        missOut: pathOr('', ['missOut']),
        name: pathOr('', ['name']),
        output: pathOr('', ['output']),
        product: pathOr('', ['product']),
        quantMax: pathOr('', ['quantMax']),
        quantity: pathOr('1', ['quantity']),
        return: pathOr('', ['return']),
        serial: pathOr(false, ['serial']),
        serialNumbers: pipe(pathOr([], ['serialNumbers']), join('\n')),
        status: pathOr('', ['status']),
        technicianReserve: pathOr(false, ['technicianReserve']),
      })
    )
  ),
  razaoSocial: pathOr('', ['razaoSocial']),
  technician: pathOr('', ['technicianId']),
})

export const buildOsForUpdate = applySpec({
  date: pathOr(moment(), ['date']),
  id: pathOr('', ['id']),
  osParts: pipe(
    pathOr([], ['products']),
    map(
      ifElse(
        pathOr(false, ['id']),
        applySpec({
          amount: pathOr(0, ['quantity']),
          id: pathOr('', ['id']),
        }),
        applySpec({
          amount: pathOr(0, ['quantity']),
          productBaseId: pathOr('', ['productBaseId']),
          serialNumberArray: pipe(
            pathOr('', ['serialNumbers']),
            split('\n'),
            filter((item) => item)
          ),
          serialNumbers: pipe(
            pathOr('', ['serialNumbers']),
            split('\n'),
            filter((item) => item)
          ),
          status: pathOr('', ['status']),
          stockBase: ifElse(
            pipe(pathOr('', ['status']), equals('CONSERTO')),
            () => undefined,
            () => 'ESTOQUE'
          ),
        })
      )
    )
  ),
  technicianId: pathOr('', ['technician']),
})

export const buildStatus = applySpec({
  key: pathOr('', ['id']),
  status: pathOr('', ['status']),
})

export const buildTechnician = applySpec({
  key: pathOr('', ['id']),
  name: pathOr('', ['name']),
})
