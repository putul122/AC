import {createAction, handleActions} from 'redux-actions'
import {FETCH_CHECKITEMS_SUCCESS} from '../../sagas/checkItem/checkItemSaga'
// import {FETCH_APPLICATIONS_SUCCESS} from '../../sagas/application/applicationSaga'
const SET_CURRENT_PAGE = 'checkItemsReducer/SET_CURRENT_PAGE'
const RESET_RESPONSE = 'checkItemsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'checkItemsReducer/SET_PER_PAGE'

export const actions = {
FETCH_CHECKITEMS_SUCCESS,
SET_CURRENT_PAGE,
RESET_RESPONSE,
SET_PER_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
   checkitems: '',
   currentPage: 1,
   perPage: 10,
   addEntitlementResponse: ''
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
    // [ADD_ENTITLEMENT_SUCCESS]: (state, action) => ({
    //   ...state,
    //   addEntitlementResponse: action.payload
    // }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addEntitlementResponse: ''
    })
  },
  initialState
)
