import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_TEMPLATES = 'saga/template/FETCH_TEMPLATES'
export const FETCH_TEMPLATES_SUCCESS = 'saga/template/FETCH_TEMPLATES_SUCCESS'
export const FETCH_TEMPLATES_FAILURE = 'saga/template/FETCH_TEMPLATES_FAILURE'
export const FETCH_TEMPLATES_SUMMARY = 'saga/template/FETCH_TEMPLATES_SUMMARY'
export const FETCH_TEMPLATES_SUMMARY_SUCCESS = 'saga/template/FETCH_TEMPLATES_SUMMARY_SUCCESS'
export const FETCH_TEMPLATES_SUMMARY_FAILURE = 'saga/template/FETCH_TEMPLATES_SUMMARY_FAILURE'
export const FETCH_TEMPLATE_BY_ID = 'saga/template/FETCH_TEMPLATE_BY_ID'
export const FETCH_TEMPLATE_BY_ID_SUCCESS = 'saga/template/FETCH_TEMPLATE_BY_ID_SUCCESS'
export const FETCH_TEMPLATE_BY_ID_FAILURE = 'saga/template/FETCH_TEMPLATE_BY_ID_FAILURE'
export const CREATE_TEMPLATES = 'saga/template/CREATE_TEMPLATES'
export const CREATE_TEMPLATES_SUCCESS = 'saga/template/CREATE_TEMPLATES_SUCCESS'
export const CREATE_TEMPLATES_FAILURE = 'saga/template/CREATE_TEMPLATES_FAILURE'
export const UPDATE_TEMPLATES = 'saga/template/UPDATE_TEMPLATES'
export const UPDATE_TEMPLATES_SUCCESS = 'saga/template/UPDATE_TEMPLATES_SUCCESS'
export const UPDATE_TEMPLATES_FAILURE = 'saga/template/UPDATE_TEMPLATES_FAILURE'
export const DELETE_TEMPLATE = 'saga/template/DELETE_TEMPLATE'
export const DELETE_TEMPLATE_SUCCESS = 'saga/template/DELETE_TEMPLATE_SUCCESS'
export const DELETE_TEMPLATE_FAILURE = 'saga/template/DELETE_TEMPLATE_FAILURE'
export const VERIFY_NAME = 'saga/template/VERIFY_NAME'
export const VERIFY_NAME_SUCCESS = 'saga/template/VERIFY_NAME_SUCCESS'
export const VERIFY_NAME_FAILURE = 'saga/template/VERIFY_NAME_FAILURE'

export const actionCreators = {
  fetchTemplates: createAction(FETCH_TEMPLATES),
  fetchTemplatesSuccess: createAction(FETCH_TEMPLATES_SUCCESS),
  fetchTemplatesFailure: createAction(FETCH_TEMPLATES_FAILURE),
  fetchTemplatesSummary: createAction(FETCH_TEMPLATES_SUMMARY),
  fetchTemplatesSummarySuccess: createAction(FETCH_TEMPLATES_SUMMARY_SUCCESS),
  fetchTemplatesSummaryFailure: createAction(FETCH_TEMPLATES_SUMMARY_FAILURE),
  fetchTemplateById: createAction(FETCH_TEMPLATE_BY_ID),
  fetchTemplateByIdSuccess: createAction(FETCH_TEMPLATE_BY_ID_SUCCESS),
  fetchTemplateByIdFailure: createAction(FETCH_TEMPLATE_BY_ID_FAILURE),
  createTemplates: createAction(CREATE_TEMPLATES),
  createTemplatesSuccess: createAction(CREATE_TEMPLATES_SUCCESS),
  createTemplatesFailure: createAction(CREATE_TEMPLATES_FAILURE),
  updateTemplates: createAction(UPDATE_TEMPLATES),
  updateTemplatesSuccess: createAction(UPDATE_TEMPLATES_SUCCESS),
  updateTemplatesFailure: createAction(UPDATE_TEMPLATES_FAILURE),
  deleteTemplate: createAction(DELETE_TEMPLATE),
  deleteTemplateSuccess: createAction(DELETE_TEMPLATE_SUCCESS),
  deleteTemplateFailure: createAction(DELETE_TEMPLATE_FAILURE),
  verifyName: createAction(VERIFY_NAME),
  verifyNameSuccess: createAction(VERIFY_NAME_SUCCESS),
  verifyNameFailure: createAction(VERIFY_NAME_FAILURE)
}

export default function * watchTemplates () {
  yield [
      takeLatest(FETCH_TEMPLATES, getTemplates),
      takeLatest(FETCH_TEMPLATES_SUMMARY, getTemplatesSummary),
      takeLatest(FETCH_TEMPLATE_BY_ID, getTemplateById),
      takeLatest(CREATE_TEMPLATES, createTemplates),
      takeLatest(UPDATE_TEMPLATES, updateTemplate),
      takeLatest(DELETE_TEMPLATE, deleteTemplate),
      takeLatest(VERIFY_NAME, getComponentTypeComponents)
    ]
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

export function * getTemplates (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const templates = yield call(
      axios.get,
      api.getReviewTemplates,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTemplatesSuccess(templates.data))
  } catch (error) {
    yield put(actionCreators.fetchTemplatesFailure(error))
  }
}

export function * getTemplatesSummary (action) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
      const templatesSummary = yield call(
        axios.get,
        api.getTemplatesSummary,
        {params: action.payload}
      )
      yield put(actionCreators.fetchTemplatesSummarySuccess(templatesSummary.data))
    } catch (error) {
      yield put(actionCreators.fetchTemplatesSummaryFailure(error))
    }
  }

export function * getTemplateById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.get,
      api.getReviewTemplate,
      {params: action.payload}
    )
    yield put(actionCreators.fetchTemplateByIdSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.fetchTemplateByIdFailure(error))
  }
}
export function * createTemplates (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.post,
      api.createReviewTemplate,
      action.payload
    )
    yield put(actionCreators.createTemplatesSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.createTemplatesFailure(error))
  }
}

export function * updateTemplate (action) {
  try {
    console.log(action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.patch,
      api.updateReviewTemplate(action.payload.urlPart.review_template_id),
      action.payload.payloadPart
    )
    yield put(actionCreators.updateTemplatesSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.updateTemplatesFailure(error))
  }
}

export function * deleteTemplate (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const template = yield call(
      axios.delete,
      api.deleteReviewTemplate(action.payload)
    )
    yield put(actionCreators.deleteTemplateSuccess(template.data))
  } catch (error) {
    yield put(actionCreators.deleteTemplateFailure(error))
  }
}
