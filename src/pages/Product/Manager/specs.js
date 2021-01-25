import { applySpec, map, pathOr, pipe } from 'ramda'

export const buildDataSource = applySpec({
    key: pathOr('', ['id']),
    brand: pathOr('', ['mark']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
    key: pathOr('', ['key']),
    lobby: pathOr('', ['corredor']),
    product: pathOr('', ['name']),
    productDescription: pathOr('', ['description']),
    quantityMin: pathOr('', ['minimumStock']),
    type: pathOr('', ['type']),
    serialNumber: pathOr(false, ['serial']),
    shelf: pathOr('', ['prateleira']),
    sku: pathOr('', ['sku']),
})

export const buildQueryProduct = applySpec({
    product: pathOr('', ['product']),
    category: pathOr('', ['category']),
    brand: pathOr('', ['brand']),
    type: pathOr('', ['type']),
    sku: pathOr('', ['sku']),
})

export const buildRedirectValueProduct = applySpec({
    key: pathOr('', ['id']),
    brand: pathOr('', ['mark']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
    key: pathOr('', ['key']),
    lobby: pathOr('', ['corredor']),
    mark: pathOr('', ['mark']),
    product: pathOr('', ['name']),
    productDescription: pathOr('', ['description']),
    quantityMin: pathOr('', ['minimumStock']),
    type: pathOr('', ['type']),
    serialNumber: pathOr(false, ['serial']),
    shelf: pathOr('', ['prateleira']),
    sku: pathOr('', ['sku']),
})
