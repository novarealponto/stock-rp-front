import actions from '../Actions/typeActions'

const initialState = {
  CNH: '',
  external: '',
  id: '',
  name: '',
  plate: '',
}

const technicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REDIRECT.TECNICO:
      return { ...state, ...action.payload }
    case actions.CLEAR.TECNICO:
      return initialState
    default:
      return state
  }
}

export default technicianReducer
