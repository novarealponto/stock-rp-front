import action from './typeActions'

export const clearValueFornecedor = () => {
  return (dispatch) =>
    dispatch({
      type: action.CLEAR.PROVIDER,
    })
}

export const setValueFornecedor = (value) => {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.FORNECEDOR,
    })
}
