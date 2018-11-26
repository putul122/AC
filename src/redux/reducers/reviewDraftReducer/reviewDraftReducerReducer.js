import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS,
    FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS
} from '../../sagas/basic/basicSaga'
import {
  FETCH_REVIEW_BY_ID_SUCCESS,
  FETCH_REVIEW_ARTEFACTS_SUCCESS,
  UPDATE_REVIEWS_SUCCESS,
  CONNECT_DISCONNECT_ARTEFACT_SUCCESS
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
const SET_FIRST_LOAD = 'ReviewDraftReducer/SET_FIRST_LOAD'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
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
  SET_FIRST_LOAD
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
  setFirstLoad: createAction(SET_FIRST_LOAD)
}

export const initialState = {
  connectArtefact: '',
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
  updatePayload: [],
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
    checkItems: []
  },
  validationClass: 'form-group m-form__group row',
  connectArtefactSettings: {
    isConnected: false,
    isModalOpen: false,
    selectedRelations: null,
    selectedArtefact: null
  }
}

export default handleActions(
  {
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      reviewCheckitems: action.payload
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
    })
  },
  initialState
)
