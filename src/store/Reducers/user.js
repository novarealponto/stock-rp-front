import actions from '../Actions/typeActions'

const initialState = {
  id: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REDIRECT.USUARIO:
      return { ...state, ...action.payload }
    case actions.CLEAR.USUARIO:
      return initialState
    default:
      return state
  }
}

export default userReducer
