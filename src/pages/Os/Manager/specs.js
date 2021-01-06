import { applySpec, filter, ifElse, length, map, pathOr, pipe } from 'ramda'

export const buildDataSource = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: pathOr('', ['formatedDate']),
  key: pathOr('', ['id']),
  notDelet: pipe(
    pathOr([], ['products']),
    filter((products) => products.technicianReserve),
    length
  ),
  os: pathOr('', ['os']),
  products: pipe(
    pathOr([], ['products']),
    map(
      applySpec({
        key: pathOr('', ['id']),
        product: pathOr('', ['name']),
        quantity: pathOr('', ['amount']),
        technicianReserve: pathOr('', ['technicianReserve']),
        serialNumbers: pathOr('', ['serialNumbers']),
        name: pathOr('', ['name']),
        serial: pathOr('', ['serial']),
        id: pathOr('', ['id']),
        amount: pathOr('', ['amount']),
        output: pathOr('', ['output']),
        missOut: pathOr('', ['missOut']),
        return: pathOr('', ['return']),
        quantMax: pathOr('', ['quantMax']),
        status: pathOr('', ['status']),
      })
    )
  ),
  razaoSocial: pathOr('', ['razaoSocial']),
  technician: pathOr('', ['technician']),
  technicianId: pathOr('', ['technicianId']),
})

export const buildQueryOs = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: ifElse(
    pathOr(false, ['date']),
    pipe(pathOr([], ['date']), (dateValues) => {
      return { start: dateValues[0]._d, end: dateValues[1]._d }
    }),
    pathOr(undefined, ['date'])
  ),
  name: pathOr('', ['product']),
  os: pathOr('', ['os']),
  razaoSocial: pathOr('', ['razaoSocial']),
})

export const buildRedirectValueOs = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: pathOr('', ['formatedDate']),
  id: pathOr('', ['key']),
  Os: pathOr('', ['os']),
  products: pathOr([], ['products']),
  razaoSocial: pathOr('', ['razaoSocial']),
  technician: pathOr('', ['technician']),
  technicianId: pathOr('', ['technicianId']),
})
