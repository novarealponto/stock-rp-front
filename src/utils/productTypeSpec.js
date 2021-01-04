import { applySpec, prop, pathOr } from 'ramda'

const productTypeSpec = {
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  type: prop('productType'),
}

const buildProductType = applySpec(productTypeSpec)

export default buildProductType
