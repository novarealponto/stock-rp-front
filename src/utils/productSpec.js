import { applySpec, ifElse, pipe, pathOr } from 'ramda'

const getSerialNumber = ifElse(
  pathOr(false, ['serial']),
  pathOr(false, ['serial']),
  pathOr(false, ['modulo'])
)

const lowerCase = value => value.toLocaleLowerCase()
const toString = value => value.toString()

const ProductSpec = {
  category: pipe(
    pathOr('', ['category']),
    lowerCase
  ),
  description: pathOr('', ['descricao']),
  minimumStock: pipe(
    pathOr('1', ['quantMin']),
    toString,
  ),
  mark: pathOr('', ['mark']),
  name: pathOr('', ['item']),
  type: pathOr('', ['type']),
  serial: getSerialNumber,
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  corredor: pathOr('', ['corredor']),
  coluna: pathOr('', ['coluna']),
  prateleira: pathOr('', ['prateleira']),
  gaveta: pathOr('', ['gaveta']),
  modulo: pathOr('', ['modulo']),
}

const buildProduct = applySpec(ProductSpec)

export default buildProduct
