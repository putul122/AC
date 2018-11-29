import { createAction, handleActions } from 'redux-actions'
import {
      FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS,
      FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
      FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS
} from '../../sagas/basic/basicSaga'
import {FETCH_REVIEW_BY_ID_SUCCESS} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const SET_CURRENT_TAB = 'ReviewArtefactReducer/SET_CURRENT_TAB'

export const actions = {
    FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS,
    FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
    // FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS,
    FETCH_REVIEW_BY_ID_SUCCESS
}

export const actionCreators = {
  setCurrentTab: createAction(SET_CURRENT_TAB)
}

export const initialState = {
  reviewArtefactPropertiesdata: '',
  componentTypeComponentData: '',
  reviewArtefactRelationshipsdata: '',
  reviewData: '',
  showTabs: {'showProperty': ' active show', 'showRelationship': ''}
}

export default handleActions(
  {
    [FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      reviewArtefactPropertiesdata: action.payload
    }),
    [FETCH_REVIEW_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      reviewData: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentData: action.payload
    }),
    [FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      reviewArtefactRelationshipsdata: action.payload
    }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    })
  },
  initialState
)
