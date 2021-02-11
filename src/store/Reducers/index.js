import { combineReducers } from 'redux'

import auth from './auth'
import fornecedorReducer from './fornecedor'
import osReducer from './os'
import providerReducer from './provider'
import typeActions from '../Actions/typeActions'

const appReducer = combineReducers({
  auth,
  fornecedorReducer,
  osReducer,
  providerReducer,
})

const rootReducer = (state, action) => {
  if (action.type === typeActions.AUTH.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
