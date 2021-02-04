import actions from '../Actions/typeActions'

const initialState = {
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

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REDIRECT.PRODUTO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default productReducer
