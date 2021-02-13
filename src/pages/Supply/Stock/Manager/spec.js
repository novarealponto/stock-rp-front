import moment from 'moment'
import { applySpec, map, pathOr, pipe } from 'ramda'

export const buildDataSouce = applySpec({
  key: pathOr('', ['id']),
  outputs: pipe(
    pathOr('', ['supEntrances']),
    map(
      applySpec({
        date: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
        key: pathOr('', ['supProviderId']),
        quantity: pathOr('', ['amount']),
        razaoSocial: pathOr('', ['supProvider', 'razaoSocial']),
      })
    )
  ),
  product: pathOr('', ['name']),
  quantity: pathOr('', ['amount']),
  updatedAt: pipe(pathOr('', ['updatedAt']), (date) => moment(date).format('L')),
})
