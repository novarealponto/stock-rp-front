import { applySpec, pathOr } from 'ramda'

export const buildDataSource = applySpec({
    brand: pathOr('', ['mark']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
    id: pathOr('', ['id']),
    key: pathOr('', ['id']),
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
    brand: pathOr('', ['brand']),
    category: pathOr('', ['category']),
    coluna: pathOr('', ['column']),
    corredor: pathOr('', ['lobby']),
    description: pathOr('', ['productDescription']),
    gaveta: pathOr('', ['drawer']),
    id: pathOr('', ['id']),
    mark: pathOr('', ['brand']),
    manufacturer: pathOr('', ['manufacturer']),
    minimumStock: pathOr('', ['quantityMin']),
    name: pathOr('', ['product']),
    prateleira: pathOr('', ['shelf']),
    product: pathOr('', ['product']),
    serial: pathOr(false, ['serial']),
    serialNumber: pathOr(false, ['serialNumber']),
    sku: pathOr('', ['sku']),
    type: pathOr('', ['type']),
})
