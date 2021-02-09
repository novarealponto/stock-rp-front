import action from './typeActions'

export const setValueUsuario = (value) => {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.USUARIO,
    })
}

export const clearValueUsuario = () => {
  return (dispatch) =>
    dispatch({
      payload: null,
      type: action.CLEAR.USUARIO,
    })
}
