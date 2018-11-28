import { createAction, handleActions } from 'redux-actions'
import {
    FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS
} from '../../sagas/basic/basicSaga'
import { CREATE_TEMPLATES_SUCCESS } from '../../sagas/template/templateSaga'

// Name Spaced Action Types
const SET_TEMPLATE_CATEGORY_DATA = 'AddTemplateReducer/SET_TEMPLATE_CATEGORY_DATA'
const RESET_RESPONSE = 'AddTemplateReducer/RESET_RESPONSE'
const SET_ADD_TEMPLATE_VALUE = 'AddTemplateReducer/SET_ADD_TEMPLATE_VALUE'
const SET_CHECK_ITEMS_DATA = 'AddTemplateReducer/SET_CHECK_ITEMS_DATA'
const SET_SELECTED_CATEGORY = 'AddTemplateReducer/SET_SELECTED_CATEGORY'
const SET_SELECTED_CHECKITEM = 'AddTemplateReducer/SET_SELECTED_CHECKITEM'
const SET_VALIDATION_CLASS = 'AddTemplateReducer/SET_VALIDATION_CLASS'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  SET_TEMPLATE_CATEGORY_DATA,
  RESET_RESPONSE,
  SET_ADD_TEMPLATE_VALUE,
  SET_CHECK_ITEMS_DATA,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_CHECKITEM,
  CREATE_TEMPLATES_SUCCESS,
  SET_VALIDATION_CLASS
}

export const actionCreators = {
  setTemplateCategoryData: createAction(SET_TEMPLATE_CATEGORY_DATA),
  resetResponse: createAction(RESET_RESPONSE),
  setAddTemplateValue: createAction(SET_ADD_TEMPLATE_VALUE),
  setCheckItemsData: createAction(SET_CHECK_ITEMS_DATA),
  setSelectedCategory: createAction(SET_SELECTED_CATEGORY),
  setSelectedCheckItem: createAction(SET_SELECTED_CHECKITEM),
  setValidationClass: createAction(SET_VALIDATION_CLASS)
}

export const initialState = {
  componentTypeProperties: '',
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
  validationClass: 'form-group m-form__group row'
}

export default handleActions(
  {
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      templateCheckItems: action.payload
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
    })
  },
  initialState
)
