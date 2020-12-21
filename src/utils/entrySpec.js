import { applySpec, filter, ifElse, pathOr, pipe, split } from 'ramda'

const entrySpec = {
  amountAdded: ifElse(
    pathOr(false, ['analysis']),
    pathOr('0', ['undefind']),
    pathOr('0', ['amountAdded'])
  ),
  analysis: ifElse(
    pathOr(false, ['analysis']),
    pathOr('0', ['amountAdded']),
    pathOr('0', ['undefind'])
  ),
  companyId: pathOr('', ['companyId']),
  productId: pathOr('', ['productId']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  serialNumbers: pipe(
    pathOr('', ['serialNumbers']),
    split('\n'),
    filter((item) => item)
  ),
  stockBase: pathOr('', ['stockBase']),
}

const buildEntry = applySpec(entrySpec)

export default buildEntry
