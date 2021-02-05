import { applySpec, pipe, pathOr } from 'ramda'

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
    pathOr('1', ['minimumStock']),
    toString,
  ),
  mark: pathOr('', ['mark']),
  name: pathOr('', ['name']),
  type: pathOr('', ['type']),
  serial: pathOr(false, ['serialNumber']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  corredor: pathOr('', ['corredor']),
  coluna: pathOr('', ['coluna']),
  prateleira: pathOr('', ['prateleira']),
  gaveta: pathOr('', ['gaveta']),
  modulo: pathOr(false, ['modulo']),
}

const ProductSpecUpdate = {
  id: pathOr('', ['id']),
  category: pipe(
    pathOr('', ['category']),
    lowerCase
  ),
  description: pathOr('', ['description']),
  minimumStock: pipe(
    pathOr('1', ['minimumStock']),
    toString,
  ),
  mark: pathOr('', ['mark', 'mark']),
  name: pathOr('', ['name']),
  type: pathOr('', ['equipType', 'type']),
  serialNumber: pathOr(false, ['serial']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  corredor: pathOr('', ['corredor']),
  coluna: pathOr('', ['coluna']),
  prateleira: pathOr('', ['prateleira']),
  gaveta: pathOr('', ['gaveta']),
  modulo: pathOr(false, ['modulo']),
}

export const buildProduct = applySpec(ProductSpec)
export const buildProductUpdate = applySpec(ProductSpecUpdate)

