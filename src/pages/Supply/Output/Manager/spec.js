import moment from 'moment'
import { applySpec, pathOr, pipe, prop, propOr } from 'ramda'

export const buildSupplyOutput = applySpec({
  amount: prop('quantity'),
  emailResp: pathOr('', ['emailResponsible']),
  emailSolic: prop('emailRequester'),
  responsibleUser: propOr('', 'username'),
  solicitante: prop('requester'),
  supProductId: prop('productId'),

})

export const buildDataSouce = applySpec({
  createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
  emailRequester: pathOr('', ['emailSolic']),
  emailResponsible: pathOr('', ['emailResp']),
  key: pathOr('', ['id']),
  product: pathOr('', ['supProduct' , 'name']),
  quantity: pathOr('', ['amount']),
  requester: pathOr('', ['solicitante']),
  user: pathOr('', ['responsibleUser']),
})
