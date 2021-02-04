import actions from '../Actions/typeActions'

const initialState = {
  city: '',
  cnpj: '',
  complement: '',
  id: '',
  neighborhood: '',
  number: '',
  razaoSocial: '',
  state: '',
  street: '',
  zipCode: '',
}

const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EDITAR.PROVIDER:
      return { ...state, ...action.payload }
    case actions.CLEAR.PROVIDER:
      return initialState
    default:
      return state
  }
}

export default providerReducer
