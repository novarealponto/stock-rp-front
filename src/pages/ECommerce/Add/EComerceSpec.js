import { applySpec, filter, map, pathOr, pipe, split } from 'ramda'

export default applySpec({
  trackingCode: pathOr('', ['trackingCode']),
  name: pathOr('', ['name']),
  freeMarketParts: pipe(
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
      })
    )
  ),
  cnpjOrCpf: pathOr('', ['cnpjOrCpf']),
})
