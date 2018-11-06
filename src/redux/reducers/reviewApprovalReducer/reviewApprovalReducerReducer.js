import { createAction, handleActions } from 'redux-actions'
// import {
//     FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
//     FETCH_COMPONENT_TYPE_RELATIONSHIPS_SUCCESS
// } from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'ReviewDraftReducer/RESET_RESPONSE'
const SET_REJECTION = 'ReviewDraftReducer/SET_REJECTION'

export const actions = {
  RESET_RESPONSE,
  SET_REJECTION
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setRejection: createAction(SET_REJECTION)
}

export const initialState = {
  updateReviewResponse: '',
  isRejected: false,
  review: ''
}

export default handleActions(
  {
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createUserResponse: ''
    }),
    [SET_REJECTION]: (state, action) => ({
        ...state,
        isRejected: ''
    })
  },
  initialState
)
