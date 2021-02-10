import { applySpec, path, pipe, prop } from 'ramda'
import moment from 'moment'

const forceBoolean = (value) => !!value
const momentFormat = (value) => moment(value, 'DDMMYYYY')

const TechnicianSpec = {
  car: path(['cars','0', 'plate']),
  dueDateCnh: pipe(prop('CNH'), momentFormat),
  external: pipe(prop('external'), forceBoolean),
  name: prop('name'),
}

const buildInitialValueTechnician = applySpec(TechnicianSpec)

export default buildInitialValueTechnician
