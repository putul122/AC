import { createAction, handleActions } from 'redux-actions'
// import {
//     FETCH_ENTITLEMENTS_SUMMARY_SUCCESS,
//     FETCH_ENTITLEMENT_BY_ID_SUCCESS,
//     FETCH_ENTITLEMENT_PROPERTIES_SUCCESS,
//     FETCH_ENTITLEMENT_RELATIONSHIPS_SUCCESS,
//     DELETE_ENTITLEMENT_SUCCESS,
//     UPDATE_ENTITLEMENT_PROPERTIES_SUCCESS
// } from '../../sagas/entitlement/entitlementSaga'

// Name Spaced Action Types
const SET_EDIT_TEMPLATE_SETTINGS = 'TemplateDetailReducer/SET_EDIT_TEMPLATE_SETTINGS'
const RESET_RESPONSE = 'TemplateDetailReducer/RESET_RESPONSE'

export const actions = {
  SET_EDIT_TEMPLATE_SETTINGS,
  RESET_RESPONSE
}

export const actionCreators = {
  setEditTemplateSettings: createAction(SET_EDIT_TEMPLATE_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  template: '',
  templateCategories: '',
  templateCheckItems: '',
  editTemplateSettings: {
    isDeleteModalOpen: false,
    isEditFlag: false
  },
  updateTemplateResponse: '',
  deleteTemplateResponse: ''
}

export default handleActions(
  {
    // [FETCH_ENTITLEMENTS_SUMMARY_SUCCESS]: (state, action) => ({
    //   ...state,
    //   entitlementSummary: action.payload
    // }),
    [SET_EDIT_TEMPLATE_SETTINGS]: (state, action) => ({
      ...state,
      editTemplateSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateTemplateResponse: '',
      deleteTemplateResponse: ''
    })
  },
  initialState
)
