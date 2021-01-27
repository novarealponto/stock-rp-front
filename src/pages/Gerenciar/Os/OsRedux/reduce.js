import actions from '../../../../store/actions'

const INICIAL_STATE_REDIRECT_OS = {
  cnpj: '',
  date: '',
  id: '',
  Os: '',
  products: [],
  razaoSocial: '',
  technician: '',
  technicianId: '',
}

export function osUpdateValue(state = INICIAL_STATE_REDIRECT_OS, action) {
  switch (action.type) {
    case actions.CLEAR.OS:
      return INICIAL_STATE_REDIRECT_OS
    case actions.REDIRECT.OS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
