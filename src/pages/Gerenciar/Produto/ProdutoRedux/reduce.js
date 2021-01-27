import actions from '../../../../store/actions'

const INICIAL_STATE_REDIRECT_PRODUTO = {
  category: '',
  coluna: '',
  corredor: '',
  description: '',
  gaveta: '',
  manufacturer: '',
  mark: '',
  minimumStock: '',
  name: '',
  prateleira: '',
  serial: false,
  sku: '',
  type: '',
}

export function produtoUpdateValue(
  state = INICIAL_STATE_REDIRECT_PRODUTO,
  action
) {
  switch (action.type) {
    case actions.REDIRECT.PRODUTO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const INICIAL_STATE_REDIRECT_FORNECEDOR = {
  city: '',
  cnpj: '',
  complement: '',
  email: '',
  id: '',
  nameContact: '',
  neighborhood: '',
  number: '',
  razaoSocial: '',
  referencePoint: '',
  state: '',
  street: '',
  telphone: '',
  zipCode: '',
}

export function fornecedorUpdateValue(
  state = INICIAL_STATE_REDIRECT_FORNECEDOR,
  action
) {
  switch (action.type) {
    case actions.REDIRECT.FORNECEDOR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const INICIAL_STATE_REDIRECT_USUARIO = {
  customized: '',
  id: '',
  redirect: '',
  resource: '',
  typeName: '',
  username: '',
}

export function usuarioUpdateValue(
  state = INICIAL_STATE_REDIRECT_USUARIO,
  action
) {
  switch (action.type) {
    case actions.REDIRECT.USUARIO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const INICIAL_STATE_REDIRECT_TECNICO = {
  CNH: '',
  external: '',
  id: '',
  name: '',
  plate: '',
}

export function tecnicoUpdateValue(
  state = INICIAL_STATE_REDIRECT_TECNICO,
  action
) {
  switch (action.type) {
    case actions.REDIRECT.TECNICO:
      return { ...state, ...action.payload }
    case actions.CLEAR.TECNICO:
      return INICIAL_STATE_REDIRECT_TECNICO
    default:
      return state
  }
}
