import { applySpec, pipe, prop } from 'ramda';
import moment from 'moment';

const addHyphen = (value) => value.replace(/([a-zA-Z]{3})(\w{4})/, '$1-$2');
const momentFormat = (value) => moment(value).format('YYYY');

const CarSpec = {
  model: prop('model'),
  plate: pipe(prop('plate'), addHyphen),
  year: pipe(prop('year'), momentFormat),
};

const buildCar = applySpec(CarSpec);

export default buildCar;
