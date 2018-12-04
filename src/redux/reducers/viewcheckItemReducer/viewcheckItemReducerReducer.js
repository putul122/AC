import { createAction, handleActions } from 'redux-actions'
import {FETCH_CHECKITEM_BY_ID_SUCCESS, DELETE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS} from '../../sagas/checkItem/checkItemSaga'
// Name Spaced Action Types
const SET_EDIT_CHECKITEM_SETTINGS = 'ViewCheckItemReducer/SET_EDIT_CHECKITEM_SETTINGS'
const RESET_RESPONSE = 'ViewCheckItemReducer/RESET_RESPONSE'
const SET_UPDATE_CHECKITEM_VALUE = 'ViewCheckItemReducer/SET_UPDATE_CHECKITEM_VALUE'
const SET_REVIEW_CATEGORY_DATA = 'ViewCheckItemReducer/SET_REVIEW_CATEGORY_DATA'
const SET_STANDARDS_DATA = 'ViewCheckItemReducer/SET_STANDARDS_DATA'
const SET_SELECTED_STANDARD = 'ViewCheckItemReducer/SET_SELECTED_STANDARD'
const SET_SELECTED_PRINCIPLE = 'ViewCheckItemReducer/SET_SELECTED_PRINCIPLE'
const SET_PRINCIPLES_DATA = 'ViewCheckItemReducer/SET_PRINCIPLES_DATA'
const SET_SELECTED_VALUE = 'ViewCheckItemReducer/SET_SELECTED_VALUE'
const SET_VALUES_DATA = 'ViewCheckItemReducer/SET_VALUES_DATA'
const SET_SELECTED_CHECKITEM = 'ViewCheckItemReducer/SET_CHECKITEM_VALUE'
const SET_CHECKITEMS_DATA = 'ViewCheckItemReducer/SET_CHECKITEMS_DATA'
const SET_PAYLOAD = 'ViewCheckItemReducer/SET_PAYLOAD'
const SET_SELECTED_TYPE = 'ViewCheckItemReducer/SET_SELECTED_TYPE'
const SET_MODAL_SETTING = 'ViewCheckItemReducer/SET_MODAL_SETTING'

export const actions = {
    FETCH_CHECKITEM_BY_ID_SUCCESS,
    SET_EDIT_CHECKITEM_SETTINGS,
    RESET_RESPONSE,
    DELETE_CHECKITEM_SUCCESS,
    UPDATE_CHECKITEM_SUCCESS,
    SET_UPDATE_CHECKITEM_VALUE,
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
    SET_PAYLOAD,
    SET_SELECTED_CHECKITEM,
    SET_CHECKITEMS_DATA,
    SET_SELECTED_TYPE,
    SET_MODAL_SETTING
}

export const actionCreators = {
  setEditCheckItemSettings: createAction(SET_EDIT_CHECKITEM_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setUpdateCheckItemValue: createAction(SET_UPDATE_CHECKITEM_VALUE),
  setReviewCategoryData: createAction(SET_REVIEW_CATEGORY_DATA),
  setSelectedStandard: createAction(SET_SELECTED_STANDARD),
  setStandardsData: createAction(SET_STANDARDS_DATA),
  setSelectedPrinciple: createAction(SET_SELECTED_PRINCIPLE),
  setPrinciplesData: createAction(SET_PRINCIPLES_DATA),
  setSelectedValue: createAction(SET_SELECTED_VALUE),
  setValuesData: createAction(SET_VALUES_DATA),
  setSelectedCheckitem: createAction(SET_SELECTED_CHECKITEM),
  setCheckitemsData: createAction(SET_CHECKITEMS_DATA),
  setPayload: createAction(SET_PAYLOAD),
  setSelectedType: createAction(SET_SELECTED_TYPE),
  setModalSetting: createAction(SET_MODAL_SETTING)
}

export const initialState = {
  checkitembyId: '',
  updateCheckItemResponse: '',
  deleteCheckItemResponse: '',
  componentTypeComponentCheckitems: '',
  componentTypeComponentPrinciples: '',
  componentTypeComponentStandards: '',
  reviewCategories: '',
  standards: [],
  selectedStandard: null,
  principles: [],
  selectedPrinciple: null,
  values: [],
  selectedValue: null,
  checkitems: [],
  payload: [],
  selectedCheckitem: [],
  componentTypeProperties: '',
  editCheckItemsSettings: {
    isDeleteModalOpen: false,
    isEditFlag: false
  },
  modalSettings: {
    isViewCheckItemOpen: false,
    isStandardModalOpen: false,
    isPrincipleModalOpen: false,
    principleData: '',
    standardData: ''
  },
  updateCheckitemValue: {
    'name': '',
    'description': '',
    'typeSelected': null,
    'originalCheckItems': [],
    'originalStandards': [],
    'originalValues': [],
    'originalPrinciples': [],
    'originalCategory': null
  }
}

export default handleActions(
  {
    [SET_EDIT_CHECKITEM_SETTINGS]: (state, action) => ({
      ...state,
      editCheckItemsSettings: action.payload
    }),
    [FETCH_CHECKITEM_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      checkitembyId: action.payload
    }),
    [DELETE_CHECKITEM_SUCCESS]: (state, action) => ({
      ...state,
      deleteCheckItemResponse: action.payload
    }),
    [SET_UPDATE_CHECKITEM_VALUE]: (state, action) => ({
      ...state,
      updateCheckItemValue: action.payload
    }),
    [SET_PAYLOAD]: (state, action) => ({
      ...state,
      payload: action.payload
    }),
    [UPDATE_CHECKITEM_SUCCESS]: (state, action) => ({
      ...state,
      updateCheckItemResponse: action.payload
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
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
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
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateCheckItemResponse: '',
      deleteCheckItemResponse: ''
    }),
    [SET_SELECTED_TYPE]: (state, action) => ({
      ...state,
      selectedType: action.payload
    }),
    [SET_MODAL_SETTING]: (state, action) => ({
      ...state,
      modalSettings: action.payload
    })
  },
  initialState
)
