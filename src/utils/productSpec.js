import { applySpec, pathOr, pipe } from 'ramda'

const lowerCase = value => value.toLocaleLowerCase()
const toString = value => value.toString()

const ProductSpec = {
  category: pipe(
    pathOr('', ['category']),
    lowerCase
  ),
  coluna: pathOr('', ['coluna']),
  corredor: pathOr('', ['corredor']),
  description: pathOr('', ['description']),
  gaveta: pathOr('', ['gaveta']),
  id: pathOr('', ['id']),
  mark: pathOr('', ['mark']),
  minimumStock: pipe(
    pathOr('1', ['minimumStock']),
    toString,
    ),
  modulo: pathOr(false, ['modulo']),
  name: pathOr('', ['name']),
  prateleira: pathOr('', ['prateleira']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  serial: pathOr(false, ['serialNumber']),
  type: pathOr('', ['type']),
}

const ProductSpecUpdate = {
  category: pipe(
    pathOr('', ['category']),
    lowerCase
  ),
  coluna: pathOr('', ['coluna']),
  corredor: pathOr('', ['corredor']),
  description: pathOr('', ['description']),
  gaveta: pathOr('', ['gaveta']),
  id: pathOr('', ['id']),
  mark: pathOr('', ['mark', 'mark']),
  minimumStock: pipe(
    pathOr('1', ['minimumStock']),
    toString,
  ),
  modulo: pathOr(false, ['modulo']),
  name: pathOr('', ['name']),
  prateleira: pathOr('', ['prateleira']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  serialNumber: pathOr(false, ['serial']),
  type: pathOr('', ['equipType', 'type']),
}

export const buildProduct = applySpec(ProductSpec)
export const buildProductUpdate = applySpec(ProductSpecUpdate)

