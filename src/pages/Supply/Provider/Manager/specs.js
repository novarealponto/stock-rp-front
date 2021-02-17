import moment from "moment"
import { applySpec, pathOr, pipe } from 'ramda'

export const buildDataSource = applySpec({
    cnpj: pathOr('', ['cnpj']), 
    createdAt: pipe(pathOr('', ['createdAt']), (date) => moment(date).format('L')),
    id: pathOr('', ['id']),
    key: pathOr('', ['id']),
    razaoSocial: pathOr('', ['razaoSocial']),
})
