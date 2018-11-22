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
export const CREATE_REVIEWS = 'saga/review/CREATE_REVIEWS'
export const CREATE_REVIEWS_SUCCESS = 'saga/review/CREATE_REVIEWS_SUCCESS'
export const CREATE_REVIEWS_FAILURE = 'saga/review/CREATE_REVIEWS_FAILURE'
export const UPDATE_REVIEWS = 'saga/review/UPDATE_REVIEWS'
export const UPDATE_REVIEWS_SUCCESS = 'saga/review/UPDATE_REVIEWS_SUCCESS'
export const UPDATE_REVIEWS_FAILURE = 'saga/review/UPDATE_REVIEWS_FAILURE'
export const FETCH_REVIEW_ARTEFACTS = 'saga/Basic/FETCH_REVIEW_ARTEFACTS'
export const FETCH_REVIEW_ARTEFACTS_SUCCESS = 'saga/Basic/FETCH_REVIEW_ARTEFACTS_SUCCESS'
export const FETCH_REVIEW_ARTEFACTS_FAILURE = 'saga/Basic/FETCH_REVIEW_ARTEFACTS_FAILURE'

export const actionCreators = {
  fetchReviews: createAction(FETCH_REVIEWS),
  fetchReviewsSuccess: createAction(FETCH_REVIEWS_SUCCESS),
  fetchReviewsFailure: createAction(FETCH_REVIEWS_FAILURE),
  fetchReviewsSummary: createAction(FETCH_REVIEWS_SUMMARY),
  fetchReviewsSummarySuccess: createAction(FETCH_REVIEWS_SUMMARY_SUCCESS),
  fetchReviewsSummaryFailure: createAction(FETCH_REVIEWS_SUMMARY_FAILURE),
  fetchReviewById: createAction(FETCH_REVIEW_BY_ID),
  fetchReviewByIdSuccess: createAction(FETCH_REVIEW_BY_ID_SUCCESS),
  fetchReviewByIdFailure: createAction(FETCH_REVIEW_BY_ID_FAILURE),
  createReviews: createAction(CREATE_REVIEWS),
  createReviewsSuccess: createAction(CREATE_REVIEWS_SUCCESS),
  createReviewsFailure: createAction(CREATE_REVIEWS_FAILURE),
  updateReviews: createAction(UPDATE_REVIEWS),
  updateReviewsSuccess: createAction(UPDATE_REVIEWS_SUCCESS),
  updateReviewsFailure: createAction(UPDATE_REVIEWS_FAILURE),
  fetchReviewArtefacts: createAction(FETCH_REVIEW_ARTEFACTS),
  fetchReviewArtefactsSuccess: createAction(FETCH_REVIEW_ARTEFACTS_SUCCESS),
  fetchReviewArtefactsFailure: createAction(FETCH_REVIEW_ARTEFACTS_FAILURE)
}

export default function * watchReviews () {
  yield [
      takeLatest(FETCH_REVIEWS, getReviews),
      takeLatest(FETCH_REVIEWS_SUMMARY, getReviewsSummary),
      takeLatest(FETCH_REVIEW_BY_ID, getReviewById),
      takeLatest(CREATE_REVIEWS, createReviews),
      takeLatest(UPDATE_REVIEWS, updateReview),
      takeLatest(FETCH_REVIEW_ARTEFACTS, getReviewArtefacts)
    ]
}

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
export function * createReviews (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const review = yield call(
      axios.post,
      api.createReview,
      action.payload
    )
    yield put(actionCreators.createReviewsSuccess(review.data))
  } catch (error) {
    yield put(actionCreators.createReviewsFailure(error))
  }
}
export function * updateReview (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const review = yield call(
      axios.patch,
      api.updateReview(action.payload.reviewId),
      action.payload.data
    )
    yield put(actionCreators.updateReviewsSuccess(review.data))
  } catch (error) {
    yield put(actionCreators.updateReviewsFailure(error))
  }
}

export function * getReviewArtefacts (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const reviewArtefacts = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchReviewArtefactsSuccess(reviewArtefacts.data))
  } catch (error) {
    yield put(actionCreators.fetchReviewArtefactsFailure(error))
  }
}
