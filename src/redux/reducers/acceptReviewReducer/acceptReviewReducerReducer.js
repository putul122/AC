import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'AcceptReviewReducer/RESET_RESPONSE'
const SET_ACCEPTANCE = 'AcceptReviewReducer/SET_ACCEPTANCE'
const SET_NOT_ACCEPTED_REASON = 'AcceptReviewReducer/SET_NOT_ACCEPTED_REASON'

export const actions = {
  RESET_RESPONSE,
  SET_ACCEPTANCE,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_NOT_ACCEPTED_REASON
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setAcceptance: createAction(SET_ACCEPTANCE),
  setNotAcceptedReason: createAction(SET_NOT_ACCEPTED_REASON)
}

export const initialState = {
  updateReviewResponse: '',
  isAccepeted: null,
  notAcceptedReason: '',
  reviewData: ''
}

export default handleActions(
  {
    [SET_NOT_ACCEPTED_REASON]: (state, action) => ({
      ...state,
      notAcceptedReason: action.payload
    }),
    [FETCH_REVIEW_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      reviewData: action.payload
    }),
    [UPDATE_REVIEWS_SUCCESS]: (state, action) => ({
      ...state,
      updateReviewResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateReviewResponse: ''
    }),
    [SET_ACCEPTANCE]: (state, action) => ({
      ...state,
      isAccepeted: action.payload
    })
  },
  initialState
)
