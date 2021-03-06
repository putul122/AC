import { createAction, handleActions } from 'redux-actions'
import {
    // FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS,
    FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS
} from '../../sagas/basic/basicSaga'
import {FETCH_USERS_SUCCESS} from '../../sagas/user/userSaga'
import {
  FETCH_REVIEW_BY_ID_SUCCESS,
  FETCH_REVIEW_ARTEFACTS_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  CONNECT_DISCONNECT_ARTEFACT_SUCCESS,
  FETCH_TAGS_SUCCESS,
  FETCH_CHECKITEM_TEMPLATES_SUCCESS,
  VERIFY_NAME_SUCCESS
} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const SET_CONNECT_ARTEFACT_SETTINGS = 'ReviewDraftReducer/SET_CONNECT_ARTEFACT_SETTINGS'
const RESET_RESPONSE = 'ReviewDraftReducer/RESET_RESPONSE'
const SET_SELECTED_CHECK_ITEM = 'ReviewDraftReducer/SET_SELECTED_CHECK_ITEM'
const SET_DRAFT_EDIT_DATA = 'ReviewDraftReducer/SET_DRAFT_EDIT_DATA'
const SET_UPDATE_PAYLOAD = 'ReviewDraftReducer/SET_UPDATE_PAYLOAD'
const SET_CATEGORY_DATA = 'ReviewDraftReducer/SET_CATEGORY_DATA'
const SET_REVIEW_PROPERTY = 'ReviewDraftReducer/SET_REVIEW_PROPERTY'
const SET_VALIDATION_CLASS = 'ReviewDraftReducer/SET_VALIDATION_CLASS'
const SET_SELECTED_CATEGORY = 'ReviewDraftReducer/SET_SELECTED_CATEGORY'
const SET_SELECTED_APPROVER = 'ReviewDraftReducer/SET_SELECTED_APPROVER'
const SET_SELECTED_REVIEWER = 'ReviewDraftReducer/SET_SELECTED_REVIEWER'
const SET_FIRST_LOAD = 'ReviewDraftReducer/SET_FIRST_LOAD'
const SET_CHECKITEMS_SETTINGS = 'ReviewDraftReducer/SET_CHECKITEMS_SETTINGS'
const SET_PROCESS_CHECKITEMS = 'ReviewDraftReducer/SET_PROCESS_CHECKITEMS'
const SET_SELECTED_TAGS = 'ReviewDraftReducer/SET_SELECTED_TAGS'
const SET_PROCESS_TAGS = 'ReviewDraftReducer/SET_PROCESS_TAGS'
const SET_ACTIVE_TAB = 'ReviewDraftReducer/SET_ACTIVE_TAB'
const SET_CHECK_VALIDITY = 'ReviewDraftReducer/SET_CHECK_VALIDITY'
const SET_UPDATE_NAME_SETTINGS = 'ReviewDraftReducer/SET_UPDATE_NAME_SETTINGS'

export const actions = {
  // FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  FETCH_CHECKITEM_TEMPLATES_SUCCESS,
  FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS,
  SET_CONNECT_ARTEFACT_SETTINGS,
  RESET_RESPONSE,
  SET_SELECTED_CHECK_ITEM,
  FETCH_REVIEW_BY_ID_SUCCESS,
  FETCH_REVIEW_ARTEFACTS_SUCCESS,
  SET_DRAFT_EDIT_DATA,
  SET_UPDATE_PAYLOAD,
  UPDATE_REVIEWS_SUCCESS,
  CONNECT_DISCONNECT_ARTEFACT_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_CATEGORY_DATA,
  SET_REVIEW_PROPERTY,
  SET_VALIDATION_CLASS,
  SET_SELECTED_CATEGORY,
  SET_FIRST_LOAD,
  FETCH_USERS_SUCCESS,
  FETCH_TAGS_SUCCESS,
  SET_CHECKITEMS_SETTINGS,
  SET_PROCESS_CHECKITEMS,
  SET_SELECTED_TAGS,
  SET_PROCESS_TAGS,
  SET_ACTIVE_TAB,
  VERIFY_NAME_SUCCESS,
  SET_CHECK_VALIDITY,
  SET_UPDATE_NAME_SETTINGS
}

export const actionCreators = {
  setConnectArtefactSettings: createAction(SET_CONNECT_ARTEFACT_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setSelectedCheckItem: createAction(SET_SELECTED_CHECK_ITEM),
  setDraftEditData: createAction(SET_DRAFT_EDIT_DATA),
  setUpdatePayload: createAction(SET_UPDATE_PAYLOAD),
  setCategoryData: createAction(SET_CATEGORY_DATA),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setSelectedCategory: createAction(SET_SELECTED_CATEGORY),
  setSelectedApprover: createAction(SET_SELECTED_APPROVER),
  setSelectedReviewer: createAction(SET_SELECTED_REVIEWER),
  setFirstLoad: createAction(SET_FIRST_LOAD),
  setCheckitemsSettings: createAction(SET_CHECKITEMS_SETTINGS),
  setProcessCheckItems: createAction(SET_PROCESS_CHECKITEMS),
  setSelectedTags: createAction(SET_SELECTED_TAGS),
  setProcessTags: createAction(SET_PROCESS_TAGS),
  setActiveTab: createAction(SET_ACTIVE_TAB),
  setCheckValidity: createAction(SET_CHECK_VALIDITY),
  setUpdateNameSettings: createAction(SET_UPDATE_NAME_SETTINGS)
}

export const initialState = {
  connectArtefact: '',
  users: '',
  componentTypeRelations: '',
  componentTypeProperties: '',
  reviewCategories: '',
  reviewArtefacts: '',
  reviewCheckitems: '',
  updateReviewResponse: '',
  connectArtefactResponse: '',
  reviewData: '',
  firstLoad: true,
  selectedCheckItem: null,
  selectedCategory: null,
  selectedApprover: null,
  selectedReviewer: null,
  selectedTags: null,
  updatePayload: [],
  activeTab: '',
  reviewProperties: {
    category: [],
    stages: []
  },
  draftEdit: {
    name: '',
    description: '',
    category: '',
    reviewer: '',
    approver: '',
    isCancel: false,
    cancelReason: '',
    document_reference: '',
    document_version: '',
    checkItems: [],
    tag: ''
  },
  validationClass: {
    nameValidationClass: 'form-group m-form__group row',
    cancelValidationClass: 'form-group m-form__group row',
    categoryValidationClass: 'form-group m-form__group row',
    approverValidationClass: 'form-group m-form__group row',
    reviewerValidationClass: 'form-group m-form__group row'
  },
  connectArtefactSettings: {
    isConnected: false,
    isModalOpen: false,
    selectedRelations: null,
    selectedArtefact: null
  },
  checkItemsSettings: {
    isModalOpen: false,
    tags: '',
    checkItems: [],
    selectedCheckItems: []
  },
  processCheckItems: false,
  processTags: false,
  tags: '',
  existingReviewNames: '',
  checkValidity: false,
  updateNameSettings: {
    showValidation: false,
    message: '',
    color: {},
    toUpdate: true
  }
}

export default handleActions(
  {
    [FETCH_CHECKITEM_TEMPLATES_SUCCESS]: (state, action) => ({
      ...state,
      reviewCheckitems: action.payload,
      processCheckItems: true
    }),
    [FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS]: (state, action) => ({
        ...state,
        componentTypeRelations: action.payload
    }),
    [SET_CONNECT_ARTEFACT_SETTINGS]: (state, action) => ({
      ...state,
      connectArtefactSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateReviewResponse: '',
      connectArtefactResponse: '',
      componentTypeProperties: ''
    }),
    [SET_SELECTED_CHECK_ITEM]: (state, action) => ({
        ...state,
        selectedCheckItem: action.payload
    }),
    [FETCH_REVIEW_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      reviewData: action.payload
    }),
    [FETCH_REVIEW_ARTEFACTS_SUCCESS]: (state, action) => ({
      ...state,
      reviewArtefacts: action.payload
    }),
    [SET_DRAFT_EDIT_DATA]: (state, action) => ({
      ...state,
      draftEdit: action.payload
    }),
    [SET_UPDATE_PAYLOAD]: (state, action) => ({
      ...state,
      updatePayload: action.payload
    }),
    [UPDATE_REVIEWS_SUCCESS]: (state, action) => ({
      ...state,
      updateReviewResponse: action.payload
    }),
    [CONNECT_DISCONNECT_ARTEFACT_SUCCESS]: (state, action) => ({
      ...state,
      connectArtefactResponse: action.payload
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [SET_CATEGORY_DATA]: (state, action) => ({
      ...state,
      reviewCategories: action.payload
    }),
    [SET_REVIEW_PROPERTY]: (state, action) => ({
      ...state,
      reviewProperties: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    }),
    [SET_SELECTED_CATEGORY]: (state, action) => ({
      ...state,
      selectedCategory: action.payload
    }),
    [SET_FIRST_LOAD]: (state, action) => ({
      ...state,
      firstLoad: action.payload
    }),
    [FETCH_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload
    }),
    [SET_SELECTED_APPROVER]: (state, action) => ({
      ...state,
      selectedApprover: action.payload
    }),
    [SET_SELECTED_REVIEWER]: (state, action) => ({
      ...state,
      selectedReviewer: action.payload
    }),
    [FETCH_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload,
      processTags: true
    }),
    [SET_CHECKITEMS_SETTINGS]: (state, action) => ({
      ...state,
      checkItemsSettings: action.payload
    }),
    [SET_PROCESS_CHECKITEMS]: (state, action) => ({
      ...state,
      processCheckItems: action.payload
    }),
    [SET_SELECTED_TAGS]: (state, action) => ({
      ...state,
      selectedTags: action.payload
    }),
    [SET_PROCESS_TAGS]: (state, action) => ({
      ...state,
      processTags: action.payload
    }),
    [SET_ACTIVE_TAB]: (state, action) => ({
      ...state,
      activeTab: action.payload
    }),
    [VERIFY_NAME_SUCCESS]: (state, action) => ({
      ...state,
      existingReviewNames: action.payload,
      checkValidity: true
    }),
    [SET_CHECK_VALIDITY]: (state, action) => ({
      ...state,
      checkValidity: action.payload
    }),
    [SET_UPDATE_NAME_SETTINGS]: (state, action) => ({
      ...state,
      updateNameSettings: action.payload
    })
  },
  initialState
)
