import actions from "../../../../store/actions";

const INICIAL_STATE_REDIRECT_PROVIDER = {
  id: "",
  razaoSocial: "",
  cnpj: "",
  number: "",
  zipCode: "",
  street: "",
  city: "",
  state: "",
  neighborhood: "",
  complement: ""
};

export function providerUpdateValue(
  state = INICIAL_STATE_REDIRECT_PROVIDER,
  action
) {
  switch (action.type) {
    case actions.EDITAR.PROVIDER:
      return { ...state, ...action.payload };
    case actions.CLEAR.PROVIDER:
      return INICIAL_STATE_REDIRECT_PROVIDER;
    default:
      return state;
  }
}
