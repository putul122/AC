import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS } from '../../sagas/basic/basicSaga'
import {FETCH_REVIEW_BY_ID_SUCCESS, UPDATE_REVIEWS_SUCCESS} from '../../sagas/review/reviewSaga'
import { CREATE_DISCUSSION_SUCCESS } from '../../sagas/discussion/discussionSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'ReviewApprovalReducer/RESET_RESPONSE'
const SET_APPROVAL = 'ReviewApprovalReducer/SET_APPROVAL'
const SET_REJECTED_REASON = 'ReviewApprovalReducer/SET_REJECTED_REASON'
const SET_VALIDATION_CLASS = 'ReviewApprovalReducer/SET_VALIDATION_CLASS'
const SET_REVIEW_PROPERTY = 'ReviewApprovalReducer/SET_REVIEW_PROPERTY'

export const actions = {
  RESET_RESPONSE,
  SET_APPROVAL,
  FETCH_REVIEW_BY_ID_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  SET_REJECTED_REASON,
  SET_VALIDATION_CLASS,
  SET_REVIEW_PROPERTY,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  CREATE_DISCUSSION_SUCCESS
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setApproval: createAction(SET_APPROVAL),
  setRejectedReason: createAction(SET_REJECTED_REASON),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY)
}

export const initialState = {
  updateReviewResponse: '',
  createDiscussionResponse: '',
  componentTypeProperties: '',
  rejectedReason: '',
  isApproved: null,
  reviewData: '',
  validationClass: {
    approval: 'form-group m-form__group row',
    rejectReason: 'form-group m-form__group row'
  },
  reviewProperties: {
    category: [],
    stages: []
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
    }),
    [SET_REVIEW_PROPERTY]: (state, action) => ({
      ...state,
      reviewProperties: action.payload
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [CREATE_DISCUSSION_SUCCESS]: (state, action) => ({
      ...state,
      createDiscussionResponse: action.payload
    })
  },
  initialState
)
