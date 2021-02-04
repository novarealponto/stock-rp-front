import action from './typeActions'

export function clearValueProvider() {
  return (dispatch) =>
    dispatch({
      payload: null,
      type: action.EDITAR.PROVIDER,
    })
}

export function setValueProvider(value) {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.EDITAR.PROVIDER,
    })
}
