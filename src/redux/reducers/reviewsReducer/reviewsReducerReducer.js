import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS
} from '../../sagas/basic/basicSaga'
import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_SUMMARY_SUCCESS,
  CREATE_REVIEWS_SUCCESS,
  VERIFY_NAME_SUCCESS,
  FETCH_TAGS_SUCCESS
} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
const SET_CURRENT_PAGE = 'reviewsReducer/SET_CURRENT_PAGE'
const SET_ADD_REVIEW_SETTINGS = 'reviewsReducer/SET_ADD_REVIEW_SETTINGS'
const RESET_RESPONSE = 'reviewsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'reviewsReducer/SET_PER_PAGE'
const SET_CHECK_VALIDITY = 'reviewsReducer/SET_CHECK_VALIDITY'
const SET_FILTER_SETTINGS = 'reviewsReducer/SET_FILTER_SETTINGS'
const SET_REVIEW_PROPERTY = 'reviewsReducer/SET_REVIEW_PROPERTY'

export const actions = {
  FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_SUMMARY_SUCCESS,
  CREATE_REVIEWS_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_REVIEW_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE,
  VERIFY_NAME_SUCCESS,
  SET_CHECK_VALIDITY,
  SET_FILTER_SETTINGS,
  SET_REVIEW_PROPERTY,
  FETCH_TAGS_SUCCESS
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAddReviewSettings: createAction(SET_ADD_REVIEW_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE),
  setCheckValidity: createAction(SET_CHECK_VALIDITY),
  setFilterSettings: createAction(SET_FILTER_SETTINGS),
  setReviewProperty: createAction(SET_REVIEW_PROPERTY)
}

export const initialState = {
  reviews: '',
  existingReviewNames: '',
  reviewsSummary: '',
  currentPage: 1,
  perPage: 10,
  createReviewResponse: '',
  addReviewSettings: {
    isModalOpen: false,
    templateSelected: null,
    reviewName: '',
    showValidation: false,
    message: '',
    color: {},
    toAdd: false,
    nameValidationClass: 'form-group m-form__group row'
  },
  filterSettings: {
    myTask: false,
    Draft: false,
    Approval: false,
    Acceptance: false,
    InProgress: false,
    Completed: false,
    Cancelled: false,
    selectedTags: null,
    selectedCategory: null,
    search: '',
    callApi: false,
    columnSort: {
      order: '',
      name: ''
    }
  },
  checkValidity: false,
  reviewProperties: {
    category: [],
    stages: []
  },
  componentTypeProperties: '',
  tags: ''
}

export default handleActions(
  {
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [SET_PER_PAGE]: (state, action) => ({
      ...state,
      perPage: action.payload
    }),
    [SET_ADD_REVIEW_SETTINGS]: (state, action) => ({
      ...state,
      addReviewSettings: action.payload
    }),
    [FETCH_REVIEWS_SUCCESS]: (state, action) => ({
      ...state,
      reviews: action.payload
    }),
    [FETCH_REVIEWS_SUMMARY_SUCCESS]: (state, action) => ({
      ...state,
      reviewsSummary: action.payload
    }),
    [CREATE_REVIEWS_SUCCESS]: (state, action) => ({
      ...state,
      createReviewResponse: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createReviewResponse: '',
      componentTypeProperties: ''
    }),
    [VERIFY_NAME_SUCCESS]: (state, action) => ({
      ...state,
      existingReviewNames: action.payload,
      checkValidity: true
    }),
    [SET_CHECK_VALIDITY]: (state, action) => ({
      ...state,
      checkValidity: action.payload
    }),
    [SET_FILTER_SETTINGS]: (state, action) => ({
      ...state,
      filterSettings: action.payload
    }),
    [SET_REVIEW_PROPERTY]: (state, action) => ({
      ...state,
      reviewProperties: action.payload
    }),
    [FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeProperties: action.payload
    }),
    [FETCH_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload
    })
  },
  initialState
)
