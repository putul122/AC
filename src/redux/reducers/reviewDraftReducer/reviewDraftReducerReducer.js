import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS,
    UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/basic/basicSaga'
import {
  FETCH_REVIEW_BY_ID_SUCCESS,
  FETCH_REVIEW_ARTEFACTS_SUCCESS,
  UPDATE_REVIEWS_SUCCESS
} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const SET_CONNECT_ARTEFACT_SETTINGS = 'ReviewDraftReducer/SET_CONNECT_ARTEFACT_SETTINGS'
const RESET_RESPONSE = 'ReviewDraftReducer/RESET_RESPONSE'
const SET_SELECTED_CHECK_ITEM = 'ReviewDraftReducer/SET_SELECTED_CHECK_ITEM'
const SET_DRAFT_EDIT_DATA = 'ReviewDraftReducer/SET_DRAFT_EDIT_DATA'
const SET_UPDATE_PAYLOAD = 'ReviewDraftReducer/SET_UPDATE_PAYLOAD'

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
  UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS
}

export const actionCreators = {
  setConnectArtefactSettings: createAction(SET_CONNECT_ARTEFACT_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setSelectedCheckItem: createAction(SET_SELECTED_CHECK_ITEM),
  setDraftEditData: createAction(SET_DRAFT_EDIT_DATA),
  setUpdatePayload: createAction(SET_UPDATE_PAYLOAD)
}

export const initialState = {
  connectArtefact: '',
  componentTypeRelations: '',
  reviewArtefacts: '',
  reviewCheckitems: '',
  updateReviewResponse: '',
  connectArtefactResponse: '',
  reviewData: '',
  selectedCheckItem: null,
  updatePayload: [],
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
      connectArtefactResponse: ''
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
    [UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      connectArtefactResponse: action.payload
    })
  },
  initialState
)
