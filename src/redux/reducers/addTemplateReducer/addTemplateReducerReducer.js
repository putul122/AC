import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS } from '../../sagas/basic/basicSaga'
import { FETCH_CHECKITEMS_SUCCESS } from '../../sagas/checkItem/checkItemSaga'
import { CREATE_TEMPLATES_SUCCESS, VERIFY_NAME_SUCCESS } from '../../sagas/template/templateSaga'
import { FETCH_TAGS_SUCCESS } from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
const SET_TEMPLATE_CATEGORY_DATA = 'AddTemplateReducer/SET_TEMPLATE_CATEGORY_DATA'
const RESET_RESPONSE = 'AddTemplateReducer/RESET_RESPONSE'
const SET_ADD_TEMPLATE_VALUE = 'AddTemplateReducer/SET_ADD_TEMPLATE_VALUE'
const SET_CHECK_ITEMS_DATA = 'AddTemplateReducer/SET_CHECK_ITEMS_DATA'
const SET_SELECTED_CATEGORY = 'AddTemplateReducer/SET_SELECTED_CATEGORY'
const SET_SELECTED_CHECKITEM = 'AddTemplateReducer/SET_SELECTED_CHECKITEM'
const SET_VALIDATION_CLASS = 'AddTemplateReducer/SET_VALIDATION_CLASS'
const SET_ADD_SETTINGS = 'AddTemplateReducer/SET_ADD_SETTINGS'
const SET_CHECK_VALIDITY = 'AddTemplateReducer/SET_CHECK_VALIDITY'
const SET_CHECKITEMS_SETTINGS = 'AddTemplateReducer/SET_CHECKITEMS_SETTINGS'
const SET_PROCESS_CHECKITEMS = 'AddTemplateReducer/SET_PROCESS_CHECKITEMS'

export const actions = {
  FETCH_CHECKITEMS_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_TEMPLATE_CATEGORY_DATA,
  RESET_RESPONSE,
  SET_ADD_TEMPLATE_VALUE,
  SET_CHECK_ITEMS_DATA,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_CHECKITEM,
  CREATE_TEMPLATES_SUCCESS,
  SET_VALIDATION_CLASS,
  SET_ADD_SETTINGS,
  VERIFY_NAME_SUCCESS,
  SET_CHECK_VALIDITY,
  SET_CHECKITEMS_SETTINGS,
  SET_PROCESS_CHECKITEMS,
  FETCH_TAGS_SUCCESS
}

export const actionCreators = {
  setTemplateCategoryData: createAction(SET_TEMPLATE_CATEGORY_DATA),
  resetResponse: createAction(RESET_RESPONSE),
  setAddTemplateValue: createAction(SET_ADD_TEMPLATE_VALUE),
  setCheckItemsData: createAction(SET_CHECK_ITEMS_DATA),
  setSelectedCategory: createAction(SET_SELECTED_CATEGORY),
  setSelectedCheckItem: createAction(SET_SELECTED_CHECKITEM),
  setValidationClass: createAction(SET_VALIDATION_CLASS),
  setAddSettings: createAction(SET_ADD_SETTINGS),
  setCheckValidity: createAction(SET_CHECK_VALIDITY),
  setCheckitemsSettings: createAction(SET_CHECKITEMS_SETTINGS),
  setProcessCheckItems: createAction(SET_PROCESS_CHECKITEMS)
}

export const initialState = {
  componentTypeProperties: '',
  existingTemplateNames: '',
  checkValidity: false,
  templateCategories: '',
  templateCheckItems: '',
  addTemplateResponse: '',
  selectedCategory: null,
  selectedCheckItem: null,
  checkItems: [],
  addTemplateValue: {
    'name': '',
    'description': ''
  },
  validationClass: 'form-group m-form__group row',
  addSettings: {
    templateName: '',
    description: '',
    validationClass: 'form-group m-form__group row',
    showValidation: false,
    message: '',
    color: {},
    toAdd: false
  },
  checkItemsSettings: {
    isModalOpen: false,
    checkItems: [],
    selectedTags: []
  },
  processCheckItems: false,
  tags: ''
}

export default handleActions(
  {
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
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      addTemplateResponse: ''
    }),
    [SET_ADD_TEMPLATE_VALUE]: (state, action) => ({
        ...state,
        addTemplateValue: action.payload
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
    [CREATE_TEMPLATES_SUCCESS]: (state, action) => ({
        ...state,
        addTemplateResponse: action.payload
    }),
    [SET_VALIDATION_CLASS]: (state, action) => ({
      ...state,
      validationClass: action.payload
    }),
    [SET_ADD_SETTINGS]: (state, action) => ({
      ...state,
      addSettings: action.payload
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
    }),
    [FETCH_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload
    })
  },
  initialState
)
