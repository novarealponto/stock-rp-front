import action from '../../../../store/actions'

export function clearValueOs(value) {
  return (dispatch) =>
    dispatch({
      payload: null,
      type: action.CLEAR.OS,
    })
}

export function redirectValueOs(value) {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.OS,
    })
}
