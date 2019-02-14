import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS } from '../../sagas/basic/basicSaga'
import { FETCH_CHECKITEMS_SUCCESS } from '../../sagas/checkItem/checkItemSaga'
import { FETCH_TEMPLATE_BY_ID_SUCCESS, DELETE_TEMPLATE_SUCCESS, UPDATE_TEMPLATES_SUCCESS, VERIFY_NAME_SUCCESS } from '../../sagas/template/templateSaga'
import { FETCH_TAGS_SUCCESS } from '../../sagas/review/reviewSaga'

// Name Spaced Action Types
const SET_EDIT_TEMPLATE_SETTINGS = 'TemplateDetailReducer/SET_EDIT_TEMPLATE_SETTINGS'
const SET_TEMPLATE_CATEGORY_DATA = 'TemplateDetailReducer/SET_TEMPLATE_CATEGORY_DATA'
const RESET_RESPONSE = 'TemplateDetailReducer/RESET_RESPONSE'
const SET_UPDATE_TEMPLATE_VALUE = 'TemplateDetailReducer/SET_UPDATE_TEMPLATE_VALUE'
const SET_CHECK_ITEMS_DATA = 'TemplateDetailReducer/SET_CHECK_ITEMS_DATA'
const SET_SELECTED_CATEGORY = 'TemplateDetailReducer/SET_SELECTED_CATEGORY'
const SET_SELECTED_CHECKITEM = 'TemplateDetailReducer/SET_SELECTED_CHECKITEM'
const SET_PAYLOAD = 'TemplateDetailReducer/SET_PAYLOAD'
const SET_VALIDATION_CLASS = 'TemplateDetailReducer/SET_VALIDATION_CLASS'
const SET_CHECK_VALIDITY = 'TemplateDetailReducer/SET_CHECK_VALIDITY'
const SET_CHECKITEMS_SETTINGS = 'TemplateDetailReducer/SET_CHECKITEMS_SETTINGS'
const SET_PROCESS_CHECKITEMS = 'TemplateDetailReducer/SET_PROCESS_CHECKITEMS'

export const actions = {
  FETCH_CHECKITEMS_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_TEMPLATE_CATEGORY_DATA,
  SET_UPDATE_TEMPLATE_VALUE,
  SET_CHECK_ITEMS_DATA,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_CHECKITEM,
  FETCH_TEMPLATE_BY_ID_SUCCESS,
  DELETE_TEMPLATE_SUCCESS,
  SET_EDIT_TEMPLATE_SETTINGS,
  RESET_RESPONSE,
  SET_PAYLOAD,
  UPDATE_TEMPLATES_SUCCESS,
  SET_VALIDATION_CLASS,
  FETCH_TAGS_SUCCESS,
  SET_CHECK_VALIDITY,
  SET_CHECKITEMS_SETTINGS,
  SET_PROCESS_CHECKITEMS,
  VERIFY_NAME_SUCCESS
}

export const actionCreators = {
  setTemplateCategoryData: createAction(SET_TEMPLATE_CATEGORY_DATA),
  setUpdateTemplateValue: createAction(SET_UPDATE_TEMPLATE_VALUE),
  setCheckItemsData: createAction(SET_CHECK_ITEMS_DATA),
  setSelectedCategory: createAction(SET_SELECTED_CATEGORY),
  setSelectedCheckItem: createAction(SET_SELECTED_CHECKITEM),
  setEditTemplateSettings: createAction(SET_EDIT_TEMPLATE_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPayload: createAction(SET_PAYLOAD),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setCheckValidity: createAction(SET_CHECK_VALIDITY),
  setCheckitemsSettings: createAction(SET_CHECKITEMS_SETTINGS),
  setProcessCheckItems: createAction(SET_PROCESS_CHECKITEMS)
}

export const initialState = {
  templateData: '',
  existingTemplateNames: '',
  checkValidity: false,
  templateCategories: '',
  templateCheckItems: '',
  componentTypeProperties: '',
  selectedCategory: null,
  selectedCheckItem: null,
  checkItems: [],
  payload: [],
  updateTemplateValue: {
    'name': '',
    'description': '',
    'originalCheckItems': [],
    'originalCategory': null
  },
  editTemplateSettings: {
    isDeleteModalOpen: false,
    isEditFlag: false,
    name: '',
    description: '',
    validationClass: 'form-group m-form__group row',
    showValidation: false,
    message: '',
    color: {},
    toUpdate: true
  },
  checkItemsSettings: {
    isModalOpen: false,
    checkItems: [],
    selectedTags: []
  },
  updateTemplateResponse: '',
  deleteTemplateResponse: '',
  validationClass: 'form-group m-form__group row',
  processCheckItems: false,
  tags: ''
}

export default handleActions(
  {
    [SET_EDIT_TEMPLATE_SETTINGS]: (state, action) => ({
      ...state,
      editTemplateSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      updateTemplateResponse: '',
      deleteTemplateResponse: ''
    }),
    [FETCH_CHECKITEMS_SUCCESS]: (state, action) => ({
      ...state,
      templateCheckItems: action.payload,
      processCheckItems: true
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [SET_TEMPLATE_CATEGORY_DATA]: (state, action) => ({
      ...state,
      templateCategories: action.payload
    }),
    [SET_UPDATE_TEMPLATE_VALUE]: (state, action) => ({
      ...state,
      updateTemplateValue: action.payload
    }),
    [SET_CHECK_ITEMS_DATA]: (state, action) => ({
      ...state,
      checkItems: action.payload
    }),
    [SET_SELECTED_CATEGORY]: (state, action) => ({
      ...state,
      selectedCategory: action.payload
    }),
    [SET_SELECTED_CHECKITEM]: (state, action) => ({
      ...state,
      selectedCheckItem: action.payload
    }),
    [FETCH_TEMPLATE_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      templateData: action.payload
    }),
    [DELETE_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      deleteTemplateResponse: action.payload
    }),
    [SET_PAYLOAD]: (state, action) => ({
      ...state,
      payload: action.payload
    }),
    [UPDATE_TEMPLATES_SUCCESS]: (state, action) => ({
      ...state,
      updateTemplateResponse: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    }),
    [FETCH_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload
    }),
    [VERIFY_NAME_SUCCESS]: (state, action) => ({
      ...state,
      existingTemplateNames: action.payload,
      checkValidity: true
    }),
    [SET_CHECK_VALIDITY]: (state, action) => ({
      ...state,
      checkValidity: action.payload
    }),
    [SET_PROCESS_CHECKITEMS]: (state, action) => ({
      ...state,
      processCheckItems: action.payload
    }),
    [SET_CHECKITEMS_SETTINGS]: (state, action) => ({
      ...state,
      checkItemsSettings: action.payload
    })
  },
  initialState
)
