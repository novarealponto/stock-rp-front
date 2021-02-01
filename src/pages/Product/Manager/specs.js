import { applySpec, pathOr } from 'ramda'

export const buildDataSource = applySpec({
    id: pathOr('', ['id']),
    brand: pathOr('', ['mark']),
    category: pathOr('', ['category']),
    column: pathOr('', ['coluna']),
    drawer: pathOr('', ['gaveta']),
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
    id: pathOr('', ['id']),
    mark: pathOr('', ['brand']),
    manufacturer: pathOr('', ['manufacturer']),
    category: pathOr('', ['category']),
    brand: pathOr('', ['brand']),
    category: pathOr('', ['category']),
    coluna: pathOr('', ['column']),
    corredor: pathOr('', ['lobby']),
    product: pathOr('', ['product']),
    description: pathOr('', ['productDescription']),
    minimumStock: pathOr('', ['quantityMin']),
    type: pathOr('', ['type']),
    serialNumber: pathOr(false, ['serialNumber']),
    gaveta: pathOr('', ['drawer']),
    name: pathOr('', ['product']),
    type: pathOr('', ['type']),
    serial: pathOr(false, ['serial']),
    prateleira: pathOr('', ['shelf']),
    sku: pathOr('', ['sku']),
    manufacturer: pathOr('', ['manufacturer'])
})
