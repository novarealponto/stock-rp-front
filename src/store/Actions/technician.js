import action from './typeActions'

export const clearValueTecnico = () => {
  return (dispatch) =>
    dispatch({
      type: action.CLEAR.TECNICO,
    })
}

export const setValueTecnico = (value) => {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.TECNICO,
    })
}
