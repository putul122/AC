import { handleActions } from 'redux-actions'
import {FETCH_REVIEW_BY_ID_SUCCESS} from '../../sagas/review/reviewSaga'

export const actions = {
  FETCH_REVIEW_BY_ID_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  reviewbyId: ''
}

export default handleActions(
  {
    [FETCH_REVIEW_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      reviewbyId: action.payload
    })
  },
  initialState
)
