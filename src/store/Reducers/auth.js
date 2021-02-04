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
      let auth = {
        ...state,
      }
      if (action.payload.token) {
        auth = {
          ...auth,
          ...action.payload,
        }
      }

      return auth

    case actions.AUTH.LOGOUT:
      localStorage.clear()
      return (state = {})

    default:
      return state
  }
}

export default auth
