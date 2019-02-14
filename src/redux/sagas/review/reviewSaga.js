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
export const FETCH_REVIEW_ARTEFACTS_SUCCESS = 'saga/review/FETCH_REVIEW_ARTEFACTS_SUCCESS'
export const FETCH_REVIEW_ARTEFACTS_FAILURE = 'saga/review/FETCH_REVIEW_ARTEFACTS_FAILURE'
export const CONNECT_DISCONNECT_ARTEFACT = 'saga/review/CONNECT_DISCONNECT_ARTEFACT'
export const CONNECT_DISCONNECT_ARTEFACT_SUCCESS = 'saga/review/CONNECT_DISCONNECT_ARTEFACT_SUCCESS'
export const CONNECT_DISCONNECT_ARTEFACT_FAILURE = 'saga/review/CONNECT_DISCONNECT_ARTEFACT_FAILURE'
export const VERIFY_NAME = 'saga/review/VERIFY_NAME'
export const VERIFY_NAME_SUCCESS = 'saga/review/VERIFY_NAME_SUCCESS'
export const VERIFY_NAME_FAILURE = 'saga/review/VERIFY_NAME_FAILURE'
export const FETCH_TAGS = 'saga/review/FETCH_TAGS'
export const FETCH_TAGS_SUCCESS = 'saga/review/FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_FAILURE = 'saga/review/FETCH_TAGS_FAILURE'
export const FETCH_CHECKITEM_TEMPLATES = 'saga/review/FETCH_CHECKITEM_TEMPLATES'
export const FETCH_CHECKITEM_TEMPLATES_SUCCESS = 'saga/review/FETCH_CHECKITEM_TEMPLATES_SUCCESS'
export const FETCH_CHECKITEM_TEMPLATES_FAILURE = 'saga/review/FETCH_CHECKITEM_TEMPLATES_FAILURE'

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
  fetchReviewArtefactsFailure: createAction(FETCH_REVIEW_ARTEFACTS_FAILURE),
  connectDisconnectArtefact: createAction(CONNECT_DISCONNECT_ARTEFACT),
  connectDisconnectArtefactSuccess: createAction(CONNECT_DISCONNECT_ARTEFACT_SUCCESS),
  connectDisconnectArtefactFailure: createAction(CONNECT_DISCONNECT_ARTEFACT_FAILURE),
  verifyName: createAction(VERIFY_NAME),
  verifyNameSuccess: createAction(VERIFY_NAME_SUCCESS),
  verifyNameFailure: createAction(VERIFY_NAME_FAILURE),
  fetchTags: createAction(FETCH_TAGS),
  fetchTagsSuccess: createAction(FETCH_TAGS_SUCCESS),
  fetchTagsFailure: createAction(FETCH_TAGS_FAILURE),
  fetchCheckItemTemplates: createAction(FETCH_CHECKITEM_TEMPLATES),
  fetchCheckItemTemplatesSuccess: createAction(FETCH_CHECKITEM_TEMPLATES_SUCCESS),
  fetchCheckItemTemplatesFailure: createAction(FETCH_CHECKITEM_TEMPLATES_FAILURE)
}

export default function * watchReviews () {
  yield [
      takeLatest(FETCH_REVIEWS, getReviews),
      takeLatest(FETCH_REVIEWS_SUMMARY, getReviewsSummary),
      takeLatest(FETCH_REVIEW_BY_ID, getReviewById),
      takeLatest(CREATE_REVIEWS, createReviews),
      takeLatest(UPDATE_REVIEWS, updateReview),
      takeLatest(FETCH_REVIEW_ARTEFACTS, getReviewArtefacts),
      takeLatest(CONNECT_DISCONNECT_ARTEFACT, connectDisconnectArtefact),
      takeLatest(VERIFY_NAME, getComponentTypeComponents),
      takeLatest(FETCH_TAGS, getTags),
      takeLatest(FETCH_CHECKITEM_TEMPLATES, getCheckItemTemplates)
    ]
}

export function * getCheckItemTemplates (action) {
  try {
    console.log('action', action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkItemTemplates = yield call(
      axios.get,
      api.getCheckItems,
      {params: action.payload.params}
    )
    yield put(actionCreators.fetchCheckItemTemplatesSuccess(checkItemTemplates.data))
  } catch (error) {
    yield put(actionCreators.fetchCheckItemTemplatesFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload.id),
      {params: action.payload.params}
    )
    yield put(actionCreators.verifyNameSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.verifyNameFailure(error))
  }
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
      api.getReviewArtefacts(action.payload)
    )
    yield put(actionCreators.fetchReviewArtefactsSuccess(reviewArtefacts.data))
  } catch (error) {
    yield put(actionCreators.fetchReviewArtefactsFailure(error))
  }
}

export function * connectDisconnectArtefact (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const review = yield call(
      axios.patch,
      api.updateReview(action.payload.reviewId),
      action.payload.data
    )
    yield put(actionCreators.connectDisconnectArtefactSuccess(review.data))
  } catch (error) {
    yield put(actionCreators.connectDisconnectArtefactFailure(error))
  }
}

export function * getTags (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const tags = yield call(
      axios.get,
      api.getTags
    )
    yield put(actionCreators.fetchTagsSuccess(tags.data))
  } catch (error) {
    yield put(actionCreators.fetchTagsFailure(error))
  }
}
