import { applySpec, pipe, prop } from 'ramda'

const getSerialNumber = data => {
  const serial = prop('serial', data)
  const serialModule = prop('modulo', data)
   if (serial) {
     return serial
   }

   return serialModule
}

const lowerCase = value => value.toLocaleLowerCase()
const toString = value => value.toString()

const ProductSpec = {
  category: pipe(
    prop('category'),
    lowerCase
  ),
  description: prop('descricao'),
  minimumStock: pipe(
    prop('quantMin'),
    toString,
  ),
  mark: prop('mark'),
  name: prop('item'),
  type: prop('type'),
  serial: getSerialNumber,
  responsibleUser: prop('responsibleUser'),
  corredor: prop('corredor'),
  coluna: prop('coluna'),
  prateleira: prop('prateleira'),
  gaveta: prop('gaveta'),
  modulo: prop('modulo'),
}

const buildProduct = applySpec(ProductSpec)

export default buildProduct
