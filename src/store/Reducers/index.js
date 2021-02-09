import { combineReducers } from 'redux'

import auth from './auth'
import fornecedorReducer from './fornecedor'
import osReducer from './os'
import productReducer from './product'
import providerReducer from './provider'
import technicianReducer from './technician'
import typeActions from '../Actions/typeActions'

const appReducer = combineReducers({
  auth,
  fornecedorReducer,
  osReducer,
  productReducer,
  providerReducer,
  technicianReducer,
})

const rootReducer = (state, action) => {
  if (action.type === typeActions.AUTH.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
