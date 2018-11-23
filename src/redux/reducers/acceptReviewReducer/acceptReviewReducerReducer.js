import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
import { CREATE_DISCUSSION_SUCCESS } from '../../sagas/discussion/discussionSaga'
import { FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS } from '../../sagas/basic/basicSaga'

// Name Spaced Action Types
const RESET_RESPONSE = 'AcceptReviewReducer/RESET_RESPONSE'
const SET_ACCEPTANCE = 'AcceptReviewReducer/SET_ACCEPTANCE'
const SET_NOT_ACCEPTED_REASON = 'AcceptReviewReducer/SET_NOT_ACCEPTED_REASON'
const SET_VALIDATION_CLASS = 'ReviewApprovalReducer/SET_VALIDATION_CLASS'
const SET_REVIEW_PROPERTY = 'ReviewApprovalReducer/SET_REVIEW_PROPERTY'

export const actions = {
  RESET_RESPONSE,
  SET_ACCEPTANCE,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_NOT_ACCEPTED_REASON,
  CREATE_DISCUSSION_SUCCESS,
  SET_VALIDATION_CLASS,
  SET_REVIEW_PROPERTY
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setAcceptance: createAction(SET_ACCEPTANCE),
  setNotAcceptedReason: createAction(SET_NOT_ACCEPTED_REASON),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY)
}

export const initialState = {
  updateReviewResponse: '',
  isAccepeted: null,
  notAcceptedReason: '',
  reviewData: '',
  createDiscussionResponse: '',
  componentTypeProperties: '',
  validationClass: {
    acceptance: 'form-group m-form__group row',
    notAcceptedReason: 'form-group m-form__group row'
  },
  reviewProperties: {
    category: [],
    stages: []
  }
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
    }),
    [CREATE_DISCUSSION_SUCCESS]: (state, action) => ({
      ...state,
      createDiscussionResponse: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    }),
    [SET_REVIEW_PROPERTY]: (state, action) => ({
      ...state,
      reviewProperties: action.payload
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    })
  },
  initialState
)
