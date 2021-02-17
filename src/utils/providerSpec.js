import { applySpec, pathOr, pipe, map } from 'ramda'

const ProviderSpec = {
  city: pathOr('', ['city']),
  cnpj: pathOr('', ['cnpj']),
  complement: pathOr('', ['complement']),
  contacts: pathOr('', ['contacts']),
  email: pathOr('', ['email']),
  id: pathOr('', ['id']),
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

const ProviderSpecUpdate = {
  city: pathOr('', ['city']),
  cnpj: pathOr('', ['cnpj']),
  complement: pathOr('', ['complement']),
  id: pathOr('', ['id']),
  neighborhood: pathOr('', ['neighborhood']),
  number: pathOr('', ['number']),
  razaoSocial: pathOr('', ['razaoSocial']),
  referencePoint: pathOr('', ['referencePoint']),
  relation: pathOr('fornecedor', ['responsibleUser']),
  responsibleUser: pathOr('modrp', ['responsibleUser']),
  state: pathOr('', ['state']),
  street: pathOr('', ['street']),
  zipCode: pathOr('', ['zipCode']),
  contacts: pipe(
    pathOr('', ['supContacts']),
    map(
      applySpec({
        email: pathOr('', ['email']),
        name: pathOr('', ['name']),
        telphone: pathOr('', ['telphone']),
      })
    )
  ),
}

export const buildProvider = applySpec(ProviderSpec)
export const buildProviderUpdate = applySpec(ProviderSpecUpdate)
