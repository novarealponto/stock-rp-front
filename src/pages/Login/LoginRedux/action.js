import action from '../../../store/actions';
import { logout as logoutService } from '../../../services/auth';

export function onSubmit(value) {
  return (dispatch) => {
    dispatch({
      type: action.LOGIN.AUTH,
      payload: value,
    });
  };
}

export function Logout(value) {
  return (dispatch) => {
    logoutService(value).then(
      dispatch({
        type: action.LOGIN.LOGOUT,
        payload: null,
      })
    );
  };
}
