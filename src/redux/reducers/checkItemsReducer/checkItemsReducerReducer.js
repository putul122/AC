import {createAction, handleActions} from 'redux-actions'
import {FETCH_CHECKITEMS_SUCCESS} from '../../sagas/checkItem/checkItemSaga'
import {FETCH_TAGS_SUCCESS} from '../../sagas/review/reviewSaga'
const SET_CURRENT_PAGE = 'checkItemsReducer/SET_CURRENT_PAGE'
const RESET_RESPONSE = 'checkItemsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'checkItemsReducer/SET_PER_PAGE'
const SET_FILTER_SETTINGS = 'checkItemsReducer/SET_FILTER_SETTINGS'

export const actions = {
  FETCH_CHECKITEMS_SUCCESS,
  SET_CURRENT_PAGE,
  RESET_RESPONSE,
  SET_PER_PAGE,
  SET_FILTER_SETTINGS,
  FETCH_TAGS_SUCCESS
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE),
  setFilterSettings: createAction(SET_FILTER_SETTINGS)
}

export const initialState = {
   checkitems: '',
   currentPage: 1,
   perPage: 10,
   addEntitlementResponse: '',
   filterSettings: {
    selectedTags: null,
    columnSort: {
      order: '',
      name: ''
    }
  },
  tags: ''
}

export default handleActions(
  {
    [FETCH_CHECKITEMS_SUCCESS]: (state, action) => ({
      ...state,
      checkitems: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [FETCH_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addEntitlementResponse: ''
    }),
    [SET_FILTER_SETTINGS]: (state, action) => ({
      ...state,
      filterSettings: action.payload
    })
  },
  initialState
)
