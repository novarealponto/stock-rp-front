import moment from 'moment'
import { applySpec, pathOr, pipe, prop, propOr } from 'ramda'

export const buildSupplyEntry = applySpec({
  amount: prop('quantity'),
  discount: prop('discount'),
  priceUnit: prop('price'),
  responsibleUser: propOr('', 'username'),
  supProductId: prop('productId'),
  supProviderId: prop('providerId'),
})

export const buildDataSouce = applySpec({
  createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
  discount: pathOr('', ['discount']),
  key: pathOr('', ['id']),
  price: pathOr('', ['priceUnit']),
  product: pathOr('', ['supProduct' , 'name']),
  provider: pathOr('', ['supProvider', 'razaoSocial']),
  quantity: pathOr('', ['amount']),
  user: pathOr('', ['responsibleUser']),
})
