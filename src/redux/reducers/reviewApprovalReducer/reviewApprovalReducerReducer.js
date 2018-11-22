import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'ReviewApprovalReducer/RESET_RESPONSE'
const SET_APPROVAL = 'ReviewApprovalReducer/SET_APPROVAL'
const SET_REJECTED_REASON = 'ReviewApprovalReducer/SET_REJECTED_REASON'
const SET_VALIDATION_CLASS = 'ReviewApprovalReducer/SET_VALIDATION_CLASS'

export const actions = {
  RESET_RESPONSE,
  SET_APPROVAL,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_REJECTED_REASON,
  SET_VALIDATION_CLASS
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setApproval: createAction(SET_APPROVAL),
  setRejectedReason: createAction(SET_REJECTED_REASON),
  setValidationClass: createAction(SET_VALIDATION_CLASS)
}

export const initialState = {
  updateReviewResponse: '',
  rejectedReason: '',
  isApproved: null,
  reviewData: '',
  validationClass: {
    approval: 'form-group m-form__group row',
    rejectReason: 'form-group m-form__group row'
  }
}

export default handleActions(
  {
    [SET_APPROVAL]: (state, action) => ({
        ...state,
        isApproved: action.payload
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
    [SET_REJECTED_REASON]: (state, action) => ({
      ...state,
      rejectedReason: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    })
  },
  initialState
)
