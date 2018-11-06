import {handleActions} from 'redux-actions'
import {FETCH_REVIEWS_SUMMARY_SUCCESS} from '../../sagas/review/reviewSaga'
// Name Spaced Action Types

export const actions = {
  FETCH_REVIEWS_SUMMARY_SUCCESS
}

export const actionCreators = {
  // setDefaultSelect: createAction(SET_DEFAULT_SELECT)
}

export const initialState = {
  reviewsSummary: ''
}

export default handleActions(
  {
    [FETCH_REVIEWS_SUMMARY_SUCCESS]: (state, action) => ({
        ...state,
        reviewsSummary: action.payload
    })
  },
  initialState
)
