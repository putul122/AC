import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'ConductReviewReducer/RESET_RESPONSE'
const SET_RETURN_DRAFT = 'ConductReviewReducer/SET_RETURN_DRAFT'
const SET_CANCEL_REVIEW = 'ConductReviewReducer/SET_CANCEL_REVIEW'

export const actions = {
  RESET_RESPONSE,
  SET_RETURN_DRAFT,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_CANCEL_REVIEW
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setReturnDraft: createAction(SET_RETURN_DRAFT),
  setCancelReview: createAction(SET_CANCEL_REVIEW)
}

export const initialState = {
  updateReviewResponse: '',
  returnToDraft: false,
  cancelReview: false,
  reviewData: ''
}

export default handleActions(
  {
    [SET_RETURN_DRAFT]: (state, action) => ({
        ...state,
        returnToDraft: action.payload
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
    [SET_CANCEL_REVIEW]: (state, action) => ({
      ...state,
      cancelReview: action.payload
    })
  },
  initialState
)
