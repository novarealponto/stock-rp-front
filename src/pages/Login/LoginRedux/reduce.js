import actions from '../../../store/actions';

const INICIAL_STATE_LOGIN = {
  password: '',
  username: '',
};

const INICIAL_STATE_AUTH = {
  email: 'email',
  password: '',
  token: null,
  userId: null,
  username: 'userName',
  validTonken: false,
  permissions: {}
};

export function login(state = INICIAL_STATE_LOGIN, action) {
  switch (action.type) {
    case actions.LOGIN.CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}

export function auth(state = INICIAL_STATE_AUTH, action) {
  switch (action.type) {
    case actions.LOGIN.AUTH:
      let auth = {
        ...state,
      };
      if (action.payload.token) {
        auth = {
          ...auth,
          ...action.payload,
        };
      }

      return auth;

    case actions.LOGIN.LOGOUT:
      localStorage.clear();
      return (state = {});

    default:
      return state;
  }
}
