import { applySpec, ifElse, pipe, pathOr } from 'ramda'

const getSerialNumber = ifElse(
  pathOr(false, ['serial']),
  pathOr(false, ['serial']),
  pathOr(false, ['modulo'])
)

const lowerCase = value => value.toLocaleLowerCase()
const toString = value => value.toString()

const ProductSpec = {
  id: pathOr('', ['id']),
  category: pipe(
    pathOr('', ['category']),
    lowerCase
  ),
  description: pathOr('', ['description']),
  minimumStock: pipe(
    pathOr('1', ['quantMin']),
    toString,
  ),
  mark: pathOr('', ['mark']),
  name: pathOr('', ['name']),
  type: pathOr('', ['type']),
  serial: getSerialNumber,
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  corredor: pathOr('', ['corredor']),
  coluna: pathOr('', ['coluna']),
  prateleira: pathOr('', ['prateleira']),
  gaveta: pathOr('', ['gaveta']),
  modulo: pathOr(false, ['modulo']),
}

const buildProduct = applySpec(ProductSpec)

export default buildProduct
