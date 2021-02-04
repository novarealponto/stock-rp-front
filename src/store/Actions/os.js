import action from './typeActions'

export const clearValueOs = () => {
  return (dispatch) =>
    dispatch({
      payload: null,
      type: action.CLEAR.OS,
    })
}

export const setValueOs = (value) => {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.OS,
    })
}
