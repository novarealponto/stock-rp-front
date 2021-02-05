import { applySpec, path, pipe, prop } from 'ramda'
import moment from 'moment'

const forceBoolean = (value) => !!value
const momentFormat = (value) => moment(value, 'DDMMYYYY')

const TechnicianSpec = {
  dueDateCnh: pipe(prop('CNH'), momentFormat),
  external: pipe(prop('external'), forceBoolean),
  name: prop('name'),
  car: path(['cars','0', 'plate']),
}

const buildInitialValueTechnician = applySpec(TechnicianSpec)

export default buildInitialValueTechnician
