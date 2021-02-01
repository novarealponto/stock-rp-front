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
        amount: pathOr('', ['amount']),
        id: pathOr('', ['id']),
        key: pathOr('', ['id']),
        missOut: pathOr('', ['missOut']),
        name: pathOr('', ['name']),
        output: pathOr('', ['output']),
        product: pathOr('', ['name']),
        quantity: pathOr('', ['amount']),
        quantMax: pathOr('', ['quantMax']),
        return: pathOr('', ['return']),
        serial: pathOr('', ['serial']),
        serialNumbers: pathOr('', ['serialNumbers']),
        status: pathOr('', ['status']),
        technicianReserve: pathOr('', ['technicianReserve']),
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
