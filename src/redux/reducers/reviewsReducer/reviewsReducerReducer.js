import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_SUMMARY_SUCCESS,
  CREATE_REVIEWS_SUCCESS
} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types
// const INCREMENT = 'BasicReducer/INCREMENT'
const SET_CURRENT_PAGE = 'reviewsReducer/SET_CURRENT_PAGE'
const SET_ADD_REVIEW_SETTINGS = 'reviewsReducer/SET_ADD_REVIEW_SETTINGS'
const RESET_RESPONSE = 'reviewsReducer/RESET_RESPONSE'
const SET_PER_PAGE = 'reviewsReducer/SET_PER_PAGE'

export const actions = {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_SUMMARY_SUCCESS,
  CREATE_REVIEWS_SUCCESS,
  SET_CURRENT_PAGE,
  SET_ADD_REVIEW_SETTINGS,
  RESET_RESPONSE,
  SET_PER_PAGE
}

export const actionCreators = {
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAddReviewSettings: createAction(SET_ADD_REVIEW_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE),
  setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
  reviews: '',
  reviewsSummary: '',
  currentPage: 1,
  perPage: 10,
  createReviewResponse: '',
  addReviewSettings: {
    isModalOpen: false,
    templateSelected: null,
    reviewName: '',
    nameValidationClass: 'form-group m-form__group row'
  }

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
      createReviewResponse: ''
    })
  },
  initialState
)
