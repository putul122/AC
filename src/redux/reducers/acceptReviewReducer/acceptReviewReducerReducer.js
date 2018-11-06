import {handleActions} from 'redux-actions'
// import {FETCH_APPLICATIONS_SUMMARY_SUCCESS, FETCH_APPLICATIONS_SUCCESS, FETCH_APPLICATION_SOFTWARES_SUCCESS} from '../../sagas/application/applicationSaga'

export const actions = {
// FETCH_APPLICATIONS_SUMMARY_SUCCESS,
// FETCH_APPLICATIONS_SUCCESS,
// SET_CURRENT_PAGE,
// FETCH_APPLICATION_SOFTWARES_SUCCESS,
// FETCH_BUSINESS_UNITS_SUCCESS,
// SET_EXPAND_SETTINGS,
// RESET_RESPONSE,
// SET_DEFAULT_SELECT,
// SET_PER_PAGE
}

export const actionCreators = {
  // setCurrentPage: createAction(SET_CURRENT_PAGE),
  // setExpandSettings: createAction(SET_EXPAND_SETTINGS),
  // resetResponse: createAction(RESET_RESPONSE),
  // setDefaultSelect: createAction(SET_DEFAULT_SELECT),
  // setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
  //  application: '',
  //  applicationSummary: '',
  //  applicationSoftwares: '',
  //  businessUnits: '',
  //  currentPage: 1,
  //  expandSettings: {
  //   selectedId: '',
  //   expandFlag: false
  // }
}

export default handleActions(
  {
    // [SET_DEFAULT_SELECT]: (state, action) => ({
    //   ...state,
    //   defaultSelect: action.payload
    // })
  },
  initialState
)
