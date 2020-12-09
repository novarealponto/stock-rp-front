import { applySpec, pathOr, pipe, prop } from 'ramda';
import moment from 'moment';

const forceBoolean = value => !!value;
const momentFormat = (value) => moment(value).format('DDMMYYYY');

const TechnicianSpec = {
  CNH: pipe(prop('dueDateCnh'), momentFormat),
  external: pipe(prop('external'), forceBoolean),
  name: prop('name'),
  plate: pipe(prop('car')),
  responsibleUser: pathOr('modrp', ['responsibleUser'])
};

const buildTechnician = applySpec(TechnicianSpec);

export default buildTechnician;

