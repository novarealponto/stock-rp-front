import actions from '../Actions/typeActions'

const initialState = {
  email: 'email',
  password: '',
  permissions: {},
  token: null,
  username: 'userName',
  userId: null,
  validTonken: false,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH.LOGIN:
      return {
        ...state,
        ...action.payload,
      }

    case actions.AUTH.LOGOUT:
      localStorage.clear()
      return (state = {})

    default:
      return state
  }
}

export default auth
