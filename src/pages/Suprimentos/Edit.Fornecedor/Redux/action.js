import action from "../../../../store/actions";

export function redirectValueProvider(value) {
  return dispatch =>
    dispatch({
      type: action.EDITAR.PROVIDER,
      payload: value
    });
}

export function clearValueProvider() {
  return dispatch =>
    dispatch({
      type: action.EDITAR.PROVIDER,
      payload: null
    });
}
