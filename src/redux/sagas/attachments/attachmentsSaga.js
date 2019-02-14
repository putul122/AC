import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_ATTACHMENTS = 'saga/attachments/FETCH_ATTACHMENTS'
export const FETCH_ATTACHMENTS_SUCCESS = 'saga/attachments/FETCH_ATTACHMENTS_SUCCESS'
export const FETCH_ATTACHMENTS_FAILURE = 'saga/attachments/FETCH_ATTACHMENTS_FAILURE'
export const FETCH_ATTACHMENT_BY_ID = 'saga/attachment/FETCH_ATTACHMENT_BY_ID'
export const FETCH_ATTACHMENT_BY_ID_SUCCESS = 'saga/attachment/FETCH_ATTACHMENT_BY_ID_SUCCESS'
export const FETCH_ATTACHMENT_BY_ID_FAILURE = 'saga/attachment/FETCH_ATTACHMENT_BY_ID_FAILURE'
export const CREATE_ATTACHMENTS = 'saga/attachments/CREATE_ATTACHMENTS'
export const CREATE_ATTACHMENTS_SUCCESS = 'saga/attachments/CREATE_ATTACHMENTS_SUCCESS'
export const CREATE_ATTACHMENTS_FAILURE = 'saga/attachments/CREATE_ATTACHMENTS_FAILURE'
export const UPDATE_ATTACHMENT = 'saga/attachments/UPDATE_ATTACHMENT'
export const UPDATE_ATTACHMENT_SUCCESS = 'saga/attachments/UPDATE_ATTACHMENT_SUCCESS'
export const UPDATE_ATTACHMENT_FAILURE = 'saga/attachments/UPDATE_ATTACHMENT_FAILURE'
export const DELETE_ATTACHMENT = 'saga/attachments/DELETE_ATTACHMENT'
export const DELETE_ATTACHMENT_SUCCESS = 'saga/attachments/DELETE_ATTACHMENT_SUCCESS'
export const DELETE_ATTACHMENT_FAILURE = 'saga/attachments/DELETE_ATTACHMENT_FAILURE'

export const actionCreators = {
  fetchAttachments: createAction(FETCH_ATTACHMENTS),
  fetchAttachmentsSuccess: createAction(FETCH_ATTACHMENTS_SUCCESS),
  fetchAttachmentsFailure: createAction(FETCH_ATTACHMENTS_FAILURE),
  fetchAttachmentById: createAction(FETCH_ATTACHMENT_BY_ID),
  fetchAttachmentByIdSuccess: createAction(FETCH_ATTACHMENT_BY_ID_SUCCESS),
  fetchAttachmentByIdFailure: createAction(FETCH_ATTACHMENT_BY_ID_FAILURE),
  createAttachments: createAction(CREATE_ATTACHMENTS),
  createAttachmentsSuccess: createAction(CREATE_ATTACHMENTS_SUCCESS),
  createAttachmentsFailure: createAction(CREATE_ATTACHMENTS_FAILURE),
  updateAttachment: createAction(UPDATE_ATTACHMENT),
  updateAttachmentSuccess: createAction(UPDATE_ATTACHMENT_SUCCESS),
  updateAttachmentFailure: createAction(UPDATE_ATTACHMENT_SUCCESS),
  deleteAttachment: createAction(DELETE_ATTACHMENT),
  deleteAttachmentSuccess: createAction(DELETE_ATTACHMENT_SUCCESS),
  deleteAttachmentFailure: createAction(DELETE_ATTACHMENT_FAILURE)
}

export default function * watchAttachments () {
  yield [
      takeLatest(FETCH_ATTACHMENTS, getAttachments),
      takeLatest(FETCH_ATTACHMENT_BY_ID, getAttachmentById),
      takeLatest(CREATE_ATTACHMENTS, createAttachment),
      takeLatest(UPDATE_ATTACHMENT, updateAttachment),
      takeLatest(DELETE_ATTACHMENT, deleteAttachment)
    ]
}

export function * getAttachments (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const attachments = yield call(
      axios.get,
      api.getAttachments,
      {params: action.payload}
    )
    yield put(actionCreators.fetchAttachmentsSuccess(attachments.data))
  } catch (error) {
    yield put(actionCreators.fetchAttachmentsFailure(error))
  }
}

export function * getAttachmentById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const attachment = yield call(
      axios.get,
      api.getAttachment(action.payload.attachment_id),
      {'responseType': 'blob'}
    )
    yield put(actionCreators.fetchAttachmentByIdSuccess(attachment.data))
  } catch (error) {
    yield put(actionCreators.fetchAttachmentByIdFailure(error))
  }
}

export function * createAttachment (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const attachment = yield call(
      axios.post,
      api.createAttachments(action.payload),
      action.payload.formData
    )
    console.log('attachment', attachment)
    yield put(actionCreators.createAttachmentsSuccess(attachment.data))
  } catch (error) {
    yield put(actionCreators.createAttachmentsFailure(error))
  }
}

export function * updateAttachment (action) {
  try {
    console.log(action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const attachment = yield call(
      axios.post,
      api.updateAttachment(action.payload),
      action.payload.formData
    )
    yield put(actionCreators.updateAttachmentSuccess(attachment.data))
  } catch (error) {
    yield put(actionCreators.updateAttachmentFailure(error))
  }
}

export function * deleteAttachment (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const attachment = yield call(
      axios.delete,
      api.deleteAttachment(action.payload.attachment_id)
    )
    yield put(actionCreators.deleteAttachmentSuccess(attachment.data))
  } catch (error) {
    yield put(actionCreators.deleteAttachmentFailure(error))
  }
}
