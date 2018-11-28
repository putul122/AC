import { createAction, handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS} from '../../sagas/review/reviewSaga'
const SET_PRINCIPLES_MODAL_OPEN_STATUS = 'ViewReducer/SET_PRINCIPLES_MODAL_OPEN_STATUS'
const SET_STANDARDS_MODAL_OPEN_STATUS = 'ViewReducer/SET_STANDARDS_MODAL_OPEN_STATUS'
const SET_CLICK_CHECKITEM_DATA = 'ViewReducer/SET_CLICK_CHECKITEM_DATA'

export const actions = {
  FETCH_REVIEW_BY_ID_SUCCESS
 }

export const actionCreators = {
    // setCurrentPage: createAction(SET_CURRENT_PAGE),
    setClickCheckItemData: createAction(SET_CLICK_CHECKITEM_DATA),
    // setPerPage: createAction(SET_PER_PAGE)
    setPrincipleModalOpenStatus: createAction(SET_PRINCIPLES_MODAL_OPEN_STATUS),
    setStandardModalOpenStatus: createAction(SET_STANDARDS_MODAL_OPEN_STATUS)
}

export const initialState = {
  clickCheckItemData: '',
  principlemodalIsOpen: false,
  standardmodalIsOpen: false,
  reviewbyId: ''
  // perPage: 10
}

export default handleActions(
  {
    [FETCH_REVIEW_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      reviewbyId: action.payload
    }),
    [SET_STANDARDS_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      standardmodalIsOpen: action.payload
    }),
    [SET_PRINCIPLES_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      principlemodalIsOpen: action.payload
    }),
    [SET_CLICK_CHECKITEM_DATA]: (state, action) => ({
      ...state,
      clickCheckItemData: action.payload
    })
  },
  initialState
)
