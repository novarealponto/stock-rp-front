import { applySpec, pathOr } from 'ramda'

const ProviderSpec = {
  city: pathOr('', ['city']),
  cnpj: pathOr('', ['cnpj']),
  complement: pathOr('', ['complement']),
  contacts: pathOr('', ['contacts']),
  email: pathOr('', ['email']),
  nameContact: pathOr('', ['nameContact']),
  neighborhood: pathOr('', ['neighborhood']),
  number: pathOr('', ['number']),
  razaoSocial: pathOr('', ['razaoSocial']),
  referencePoint: pathOr('', ['referencePoint']),
  relation: pathOr('fornecedor', ['responsibleUser']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  state: pathOr('', ['state']),
  street: pathOr('', ['street']),
  telphone: pathOr('', ['telphone']),
  zipCode: pathOr('', ['zipCode']),
}

const buildProvider = applySpec(ProviderSpec)

export default buildProvider
