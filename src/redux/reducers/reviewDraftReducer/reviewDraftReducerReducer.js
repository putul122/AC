import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_RELATIONSHIPS_SUCCESS
} from '../../sagas/basic/basicSaga'
// Name Spaced Action Types
const SET_CONNECT_ARTEFACT_SETTINGS = 'ReviewDraftReducer/SET_CONNECT_ARTEFACT_SETTINGS'
const RESET_RESPONSE = 'ReviewDraftReducer/RESET_RESPONSE'
const SET_SELECTED_CHECK_ITEMS = 'ReviewDraftReducer/SET_SELECTED_CHECK_ITEMS'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  SET_CONNECT_ARTEFACT_SETTINGS,
  RESET_RESPONSE,
  SET_SELECTED_CHECK_ITEMS
}

export const actionCreators = {
  setConnectArtefactSettings: createAction(SET_CONNECT_ARTEFACT_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setselectedCheckItems: createAction(SET_SELECTED_CHECK_ITEMS)
}

export const initialState = {
  connectArtefact: '',
  componentTypeRelations: '',
  componentTypeComponents: '',
  updateReviewResponse: '',
  review: '',
  selectedCheckItems: [],
  connectArtefactSettings: {
    isConnected: false,
    isModalOpen: false
  }
}

export default handleActions(
  {
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponents: action.payload
    }),
    [FETCH_COMPONENT_TYPE_RELATIONSHIPS_SUCCESS]: (state, action) => ({
        ...state,
        componentTypeRelations: action.payload
    }),
    [SET_CONNECT_ARTEFACT_SETTINGS]: (state, action) => ({
      ...state,
      connectArtefactSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createUserResponse: ''
    }),
    [SET_SELECTED_CHECK_ITEMS]: (state, action) => ({
        ...state,
        selectedCheckItems: ''
    })
  },
  initialState
)
