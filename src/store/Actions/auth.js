import action from './typeActions'

export const logInAction = (value) => {
  return (dispatch) => {
    dispatch({
      payload: value,
      type: action.AUTH.LOGIN,
    })
  }
}

export const logOutAction = () => {
  return (dispatch) => {
    dispatch({
      payload: null,
      type: action.AUTH.LOGOUT,
    })
  }
}
