import actions from '../Actions/typeActions'

const initialState = {
  customized: '',
  id: '',
  redirect: '',
  resource: '',
  typeName: '',
  username: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REDIRECT.USUARIO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default userReducer
