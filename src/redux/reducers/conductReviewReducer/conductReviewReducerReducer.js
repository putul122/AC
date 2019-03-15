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
const SET_CHECKITEMS = 'ConductReviewReducer/SET_CHECKITEMS'
const PROCESS_CHECKITEMS = 'ConductReviewReducer/PROCESS_CHECKITEMS'
const SET_ACTIVE_TAB = 'ConductReviewReducer/SET_ACTIVE_TAB'
const SET_ALL_CHECKITEM_FLAG = 'ConductReviewReducer/SET_ALL_CHECKITEM_FLAG'
const SET_SUBMIT_CLICK_FLAG = 'ConductReviewReducer/SET_SUBMIT_CLICK_FLAG'

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
  SET_COMPLAINT,
  PROCESS_CHECKITEMS,
  SET_ACTIVE_TAB,
  SET_ALL_CHECKITEM_FLAG,
  SET_SUBMIT_CLICK_FLAG
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setReturnDraft: createAction(SET_RETURN_DRAFT),
  setCancelReview: createAction(SET_CANCEL_REVIEW),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY),
  setCheckbox: createAction(SET_CHECKBOX),
  setReason: createAction(SET_REASON),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setComplaint: createAction(SET_COMPLAINT),
  setCheckItems: createAction(SET_CHECKITEMS),
  processCheckItems: createAction(PROCESS_CHECKITEMS),
  setActiveTab: createAction(SET_ACTIVE_TAB),
  setAllCheckItemFlag: createAction(SET_ALL_CHECKITEM_FLAG),
  setSubmitClickFlag: createAction(SET_SUBMIT_CLICK_FLAG)
}

export const initialState = {
  updateReviewResponse: '',
  componentTypeProperties: '',
  createDiscussionResponse: '',
  returnToDraft: false,
  cancelReview: false,
  reviewData: '',
  activeTab: '',
  checkItems: [],
  checkItemFlag: false,
  complaint: '',
  reason: '',
  validationClass: {
    draft: 'form-group m-form__group row',
    cancel: 'form-group m-form__group row',
    compliant: 'form-group m-form__group row'
  },
  checkboxSelected: {
    draft: false,
    cancel: false
  },
  reviewProperties: {
    category: [],
    stages: []
  },
  isAllCheckItemSet: false,
  isSubmitClick: false
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
    }),
    [SET_CHECKITEMS]: (state, action) => ({
      ...state,
      checkItems: action.payload
    }),
    [PROCESS_CHECKITEMS]: (state, action) => ({
      ...state,
      checkItemFlag: action.payload
    }),
    [SET_ALL_CHECKITEM_FLAG]: (state, action) => ({
      ...state,
      isAllCheckItemSet: action.payload
    }),
    [SET_SUBMIT_CLICK_FLAG]: (state, action) => ({
      ...state,
      isSubmitClick: action.payload
    })
  },
  initialState
)
