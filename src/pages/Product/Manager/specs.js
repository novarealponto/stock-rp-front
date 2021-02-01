import { applySpec, pathOr } from 'ramda'

export const buildDataSource = applySpec({
    brand: pathOr('', ['mark']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
    id: pathOr('', ['id']),
    lobby: pathOr('', ['corredor']),
    product: pathOr('', ['name']),
    productDescription: pathOr('', ['description']),
    quantityMin: pathOr('', ['minimumStock']),
    serialNumber: pathOr(false, ['serial']),
    shelf: pathOr('', ['prateleira']),
    sku: pathOr('', ['sku']),
    type: pathOr('', ['type']),
})

export const buildQueryProduct = applySpec({
    brand: pathOr('', ['brand']),
    category: pathOr('', ['category']),
    product: pathOr('', ['product']),
    sku: pathOr('', ['sku']),
    type: pathOr('', ['type']),
})

export const buildRedirectValueProduct = applySpec({
    mark: pathOr('', ['brand']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
    key: pathOr('', ['id']),
    lobby: pathOr('', ['corredor']),
    mark: pathOr('', ['mark']),
    product: pathOr('', ['name']),
    productDescription: pathOr('', ['description']),
    quantityMin: pathOr('', ['minimumStock']),
    serialNumber: pathOr(false, ['serial']),
    shelf: pathOr('', ['prateleira']),
    sku: pathOr('', ['sku']),
    type: pathOr('', ['type']),
})
