import { applySpec, pathOr, pipe } from 'ramda'
import moment from 'moment'

export const buildAvailableList = applySpec({
  key: pathOr('', ['id']),
  mark: pathOr('', ['mark']),
  product: pathOr('', ['name']),
  serialNumber: pathOr('', ['serialNumber']),
})
export const buildNewLoan = applySpec({
  cnpj: pathOr('', ['cnpj']),
  dateExpedition: pathOr('', ['date']),
  id: pathOr('', ['key']),
  observation: pathOr('', ['observation']),
  razaoSocial: pathOr('', ['razaoSocial']),
  serialNumber: pathOr('', ['serialNumber']),
  technicianId: pathOr('', ['tecnician']),
})
export const buildReservedList = applySpec({
  cnpj: pathOr('', ['cnpj']),
  date: pipe(pathOr(moment(), ['dateExpedition']), (date) =>
    moment(date, 'DDMMYYYY')
  ),
  key: pathOr('', ['id']),
  observation: pathOr('', ['observation']),
  product: pathOr('', ['product']),
  razaoSocial: pathOr('', ['razaoSocial']),
  serialNumber: pathOr('', ['serialNumber']),
  solicitation: pathOr('', ['createdAt']),
  tecnician: pathOr('', ['technicianId']),
})

export const buildTechnician = applySpec({
  key: pathOr('', ['id']),
  name: pathOr('', ['name']),
})
