import actions from '../Actions/typeActions'

const initialState = {
  cnpj: '',
  date: '',
  id: '',
  Os: '',
  products: [],
  razaoSocial: '',
  technician: '',
  technicianId: '',
}

const osReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR.OS:
      return initialState
    case actions.REDIRECT.OS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default osReducer
