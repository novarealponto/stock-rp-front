import action from './typeActions'

export const setValueProduto = (value) => {
  return (dispatch) =>
    dispatch({
      payload: value,
      type: action.REDIRECT.PRODUTO,
    })
}
