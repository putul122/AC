import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
import { FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS } from '../../sagas/basic/basicSaga'
import { CREATE_DISCUSSION_SUCCESS } from '../../sagas/discussion/discussionSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'ConductReviewReducer/RESET_RESPONSE'
const SET_RETURN_DRAFT = 'ConductReviewReducer/SET_RETURN_DRAFT'
const SET_CANCEL_REVIEW = 'ConductReviewReducer/SET_CANCEL_REVIEW'
const SET_REVIEW_PROPERTY = 'ConductReviewReducer/SET_REVIEW_PROPERTY'
const SET_CHECKBOX = 'ConductReviewReducer/SET_CHECKBOX'
const SET_REASON = 'ConductReviewReducer/SET_REASON'
const SET_VALIDATION_CLASS = 'ConductReviewReducer/SET_VALIDATION_CLASS'
const SET_COMPLAINT = 'ConductReviewReducer/SET_COMPLAINT'

export const actions = {
  RESET_RESPONSE,
  SET_RETURN_DRAFT,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_CANCEL_REVIEW,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_REVIEW_PROPERTY,
  SET_CHECKBOX,
  SET_REASON,
  SET_VALIDATION_CLASS,
  CREATE_DISCUSSION_SUCCESS,
  SET_COMPLAINT
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setReturnDraft: createAction(SET_RETURN_DRAFT),
  setCancelReview: createAction(SET_CANCEL_REVIEW),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY),
  setCheckbox: createAction(SET_CHECKBOX),
  setReason: createAction(SET_REASON),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setComplaint: createAction(SET_COMPLAINT)
}

export const initialState = {
  updateReviewResponse: '',
  componentTypeProperties: '',
  createDiscussionResponse: '',
  returnToDraft: false,
  cancelReview: false,
  reviewData: '',
  complaint: '',
  reason: '',
  validationClass: {
    draft: 'form-group m-form__group row',
    cancel: 'form-group m-form__group row'
  },
  checkboxSelected: {
    draft: false,
    cancel: false
  },
  reviewProperties: {
    category: [],
    stages: []
  }
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
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [SET_REVIEW_PROPERTY]: (state, action) => ({
      ...state,
      reviewProperties: action.payload
    }),
    [SET_CHECKBOX]: (state, action) => ({
      ...state,
      checkboxSelected: action.payload
    }),
    [SET_REASON]: (state, action) => ({
      ...state,
      reason: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    }),
    [CREATE_DISCUSSION_SUCCESS]: (state, action) => ({
      ...state,
      createDiscussionResponse: action.payload
    }),
    [SET_COMPLAINT]: (state, action) => ({
      ...state,
      complaint: action.payload
    })
  },
  initialState
)
