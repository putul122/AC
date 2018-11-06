import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_REVIEWS = 'saga/review/FETCH_REVIEWS'
export const FETCH_REVIEWS_SUCCESS = 'saga/review/FETCH_REVIEWS_SUCCESS'
export const FETCH_REVIEWS_FAILURE = 'saga/review/FETCH_REVIEWS_FAILURE'
export const FETCH_REVIEWS_SUMMARY = 'saga/review/FETCH_REVIEWS_SUMMARY'
export const FETCH_REVIEWS_SUMMARY_SUCCESS = 'saga/review/FETCH_REVIEWS_SUMMARY_SUCCESS'
export const FETCH_REVIEWS_SUMMARY_FAILURE = 'saga/review/FETCH_REVIEWS_SUMMARY_FAILURE'
export const FETCH_REVIEW_BY_ID = 'saga/review/FETCH_REVIEW_BY_ID'
export const FETCH_REVIEW_BY_ID_SUCCESS = 'saga/review/FETCH_REVIEW_BY_ID_SUCCESS'
export const FETCH_REVIEW_BY_ID_FAILURE = 'saga/review/FETCH_REVIEW_BY_ID_FAILURE'

export const actionCreators = {
  fetchReviews: createAction(FETCH_REVIEWS),
  fetchReviewsSuccess: createAction(FETCH_REVIEWS_SUCCESS),
  fetchReviewsFailure: createAction(FETCH_REVIEWS_FAILURE),
  fetchReviewsSummary: createAction(FETCH_REVIEWS_SUMMARY),
  fetchReviewsSummarySuccess: createAction(FETCH_REVIEWS_SUMMARY_SUCCESS),
  fetchReviewsSummaryFailure: createAction(FETCH_REVIEWS_SUMMARY_FAILURE),
  fetchReviewById: createAction(FETCH_REVIEW_BY_ID),
  fetchReviewByIdSuccess: createAction(FETCH_REVIEW_BY_ID_SUCCESS),
  fetchReviewByIdFailure: createAction(FETCH_REVIEW_BY_ID_FAILURE)
}

export default function * watchReviews () {
  yield [
      takeLatest(FETCH_REVIEWS, getReviews),
      takeLatest(FETCH_REVIEWS_SUMMARY, getReviewsSummary),
      takeLatest(FETCH_REVIEW_BY_ID, getReviewById)
    ]
}

// export function * getSoftwareProperties (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const softwareProperties = yield call(
//       axios.get,
//       api.getSoftwareProperties(action.payload.software_id)
//     )
//     yield put(actionCreators.fetchSoftwarePropertiesSuccess(softwareProperties.data))
//   } catch (error) {
//     yield put(actionCreators.fetchSoftwarePropertiesFailure(error))
//   }
// }

// export function * getSoftwareRelationships (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const softwareRelationships = yield call(
//       axios.get,
//       api.getSoftwareRelationships(action.payload.software_id)
//     )
//     yield put(actionCreators.fetchSoftwareRelationshipsSuccess(softwareRelationships.data))
//   } catch (error) {
//     yield put(actionCreators.fetchSoftwareRelationshipsFailure(error))
//   }
// }

export function * getReviews (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const reviews = yield call(
      axios.get,
      api.getReviews,
      {params: action.payload}
    )
    yield put(actionCreators.fetchReviewsSuccess(reviews.data))
  } catch (error) {
    yield put(actionCreators.fetchReviewsFailure(error))
  }
}

export function * getReviewsSummary (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const reviewsSummary = yield call(
        axios.get,
        api.getReviewsSummary,
        {params: action.payload}
      )
      yield put(actionCreators.fetchReviewsSummarySuccess(reviewsSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchReviewsSummaryFailure(error))
    }
  }

  export function * getReviewById (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const review = yield call(
        axios.get,
        api.getReview,
        {params: action.payload}
      )
      yield put(actionCreators.fetchReviewByIdSuccess(review.data))
    } catch (error) {
      yield put(actionCreators.fetchReviewByIdFailure(error))
    }
  }
