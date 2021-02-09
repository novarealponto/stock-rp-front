import actions from '../Actions/typeActions'

const initialState = {
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

const fornecedorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REDIRECT.FORNECEDOR:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default fornecedorReducer
