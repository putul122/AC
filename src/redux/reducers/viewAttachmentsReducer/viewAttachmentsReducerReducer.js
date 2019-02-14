import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_ATTACHMENTS_SUCCESS,
  FETCH_ATTACHMENT_BY_ID_SUCCESS
  } from '../../sagas/attachments/attachmentsSaga'
// Name Spaced Action Types
const SET_DOWNLOAD_ATTACHMENTS_ACTION_SETTINGS = 'viewAttachmentsReducer/SET_ADD_TEMPLATE_SETTINGS'
const RESET_RESPONSE = 'viewAttachmentsReducer/RESET_RESPONSE'

export const actions = {
  FETCH_ATTACHMENTS_SUCCESS,
  FETCH_ATTACHMENT_BY_ID_SUCCESS,
  RESET_RESPONSE
}

export const actionCreators = {
    setDownloadAttachmentsActionSettings: createAction(SET_DOWNLOAD_ATTACHMENTS_ACTION_SETTINGS),
    resetResponse: createAction(RESET_RESPONSE)
 }

export const initialState = {
  attachments: '',
  attachmentById: '',
  downloadAttachmentSettings: {
    attachmentData: ''
  }
}

export default handleActions(
  {
    [FETCH_ATTACHMENTS_SUCCESS]: (state, action) => ({
      ...state,
      attachments: action.payload
    }),
    [FETCH_ATTACHMENT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      attachmentById: action.payload
    }),
    [SET_DOWNLOAD_ATTACHMENTS_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      downloadAttachmentSettings: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      attachmentById: ''
    })
  },
  initialState
)
