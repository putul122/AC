import { createAction, handleActions } from 'redux-actions'
import {
    CREATE_CHECKITEM_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS,
    FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
    ADD_STANDARD_SUCCESS
} from '../../sagas/checkItem/checkItemSaga'
// Name Spaced Action Types
const RESET_RESPONSE = 'addcheckItemReducer/RESET_RESPONSE'
const SET_REVIEW_CATEGORY_DATA = 'addcheckItemReducer/SET_REVIEW_CATEGORY_DATA'
const SET_STANDARDS_DATA = 'addcheckItemReducer/SET_STANDARDS_DATA'
const SET_SELECTED_STANDARD = 'addcheckItemReducer/SET_SELECTED_STANDARD'
const SET_SELECTED_PRINCIPLE = 'addcheckItemReducer/SET_SELECTED_PRINCIPLE'
const SET_PRINCIPLES_DATA = 'addcheckItemReducer/SET_PRINCIPLES_DATA'
const SET_SELECTED_VALUE = 'addcheckItemReducer/SET_SELECTED_VALUE'
const SET_VALUES_DATA = 'addcheckItemReducer/SET_VALUES_DATA'
const SET_SELECTED_CHECKITEM = 'addcheckItemReducer/SET_CHECKITEM_VALUE'
const SET_CHECKITEMS_DATA = 'addcheckItemReducer/SET_CHECKITEMS_DATA'
const SET_ADD_CHECKITEM_VALUE = 'addcheckItemReducer/SET_ADD_CHECKITEM_VALUE'
const SET_NEW_STANDARD_VALUE = 'addcheckItemReducer/SET_NEW_STANDARD_VALUE'
const SET_SELECTED_TYPE = 'addcheckItemReducer/SET_SELECTED_TYPE'

export const actions = {
  CREATE_CHECKITEM_SUCCESS,
  RESET_RESPONSE,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_REVIEW_CATEGORY_DATA,
  SET_SELECTED_STANDARD,
  SET_STANDARDS_DATA,
  SET_SELECTED_PRINCIPLE,
  SET_PRINCIPLES_DATA,
  SET_SELECTED_VALUE,
  SET_VALUES_DATA,
  SET_SELECTED_CHECKITEM,
  SET_CHECKITEMS_DATA,
  SET_ADD_CHECKITEM_VALUE,
  ADD_STANDARD_SUCCESS,
  SET_NEW_STANDARD_VALUE,
  SET_SELECTED_TYPE
}

export const actionCreators = {
  resetResponse: createAction(RESET_RESPONSE),
  setReviewCategoryData: createAction(SET_REVIEW_CATEGORY_DATA),
  setSelectedStandard: createAction(SET_SELECTED_STANDARD),
  setStandardsData: createAction(SET_STANDARDS_DATA),
  setSelectedPrinciple: createAction(SET_SELECTED_PRINCIPLE),
  setPrinciplesData: createAction(SET_PRINCIPLES_DATA),
  setSelectedValue: createAction(SET_SELECTED_VALUE),
  setValuesData: createAction(SET_VALUES_DATA),
  setSelectedCheckitem: createAction(SET_SELECTED_CHECKITEM),
  setCheckitemsData: createAction(SET_CHECKITEMS_DATA),
  setAddCheckitemValue: createAction(SET_ADD_CHECKITEM_VALUE),
  setNewStandardValue: createAction(SET_NEW_STANDARD_VALUE),
  setSelectedType: createAction(SET_SELECTED_TYPE)
}

export const initialState = {
  createCheckItemResponse: '',
  addStandardResponse: '',
  componentTypeComponentCheckitems: '',
  componentTypeComponentPrinciples: '',
  componentTypeComponentStandards: '',
  componentTypeProperties: '',
  reviewCategories: '',
  standards: [],
  selectedStandard: null,
  principles: [],
  selectedPrinciple: null,
  values: [],
  selectedValue: null,
  selectedType: null,
  checkitems: [],
  selectedCheckitem: [],
  addCheckitemValue: {
    'name': '',
    'description': ''
  },
  newStandardValue: {
    'name': '',
    'description': '',
    'reference': ''
  }

}

export default handleActions(
  {
    [CREATE_CHECKITEM_SUCCESS]: (state, action) => ({
      ...state,
      createCheckItemResponse: action.payload
    }),
    [ADD_STANDARD_SUCCESS]: (state, action) => ({
      ...state,
      addStandardResponse: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentCheckitems: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentPrinciples: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentStandards: action.payload
    }),
    [SET_STANDARDS_DATA]: (state, action) => ({
      ...state,
      standards: action.payload
    }),
    [SET_PRINCIPLES_DATA]: (state, action) => ({
      ...state,
      principles: action.payload
    }),
    [SET_VALUES_DATA]: (state, action) => ({
      ...state,
      values: action.payload
    }),
    [SET_CHECKITEMS_DATA]: (state, action) => ({
      ...state,
      checkitems: action.payload
    }),
    [SET_REVIEW_CATEGORY_DATA]: (state, action) => ({
      ...state,
      reviewCategories: action.payload
    }),
    [SET_SELECTED_STANDARD]: (state, action) => ({
      ...state,
      selectedStandard: action.payload
    }),
    [SET_SELECTED_PRINCIPLE]: (state, action) => ({
      ...state,
      selectedPrinciple: action.payload
    }),
    [SET_SELECTED_VALUE]: (state, action) => ({
      ...state,
      selectedValue: action.payload
    }),
    [SET_SELECTED_CHECKITEM]: (state, action) => ({
      ...state,
      selectedCheckitem: action.payload
    }),
    [SET_ADD_CHECKITEM_VALUE]: (state, action) => ({
      ...state,
      addCheckitemValue: action.payload
    }),
    [SET_NEW_STANDARD_VALUE]: (state, action) => ({
      ...state,
      newStandardValue: action.payload
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createCheckItemResponse: ''
    }),
    [SET_SELECTED_TYPE]: (state, action) => ({
      ...state,
      selectedType: action.payload
    })
  },
  initialState
)
