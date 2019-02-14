import {createAction, handleActions} from 'redux-actions'
import {
  FETCH_ATTACHMENTS_SUCCESS,
  CREATE_ATTACHMENTS_SUCCESS,
  DELETE_ATTACHMENT_SUCCESS,
  FETCH_ATTACHMENT_BY_ID_SUCCESS,
  UPDATE_ATTACHMENT_SUCCESS
} from '../../sagas/attachments/attachmentsSaga'
// Name Spaced Action Types
const SET_ATTACHMENTS_ACTION_SETTINGS = 'attachmentsReducer/SET_ADD_TEMPLATE_SETTINGS'
const RESET_RESPONSE = 'attachmentsReducer/RESET_RESPONSE'
const SET_UPDATE_ATTACHMENT_VALUE = 'attachmentsReducer/SET_UPDATE_ATTACHMENT_VALUE'

export const actions = {
  FETCH_ATTACHMENTS_SUCCESS,
  SET_ATTACHMENTS_ACTION_SETTINGS,
  SET_UPDATE_ATTACHMENT_VALUE,
  CREATE_ATTACHMENTS_SUCCESS,
  DELETE_ATTACHMENT_SUCCESS,
  RESET_RESPONSE,
  FETCH_ATTACHMENT_BY_ID_SUCCESS,
  UPDATE_ATTACHMENT_SUCCESS
}

export const actionCreators = {
     resetResponse: createAction(RESET_RESPONSE),
     setAttachmentsActionSettings: createAction(SET_ATTACHMENTS_ACTION_SETTINGS),
     setUpdateAttachmentValue: createAction(SET_UPDATE_ATTACHMENT_VALUE)
}

export const initialState = {
  attachments: '',
  createAttachmentResponse: '',
  deleteAttachmentResponse: '',
  updateAttachmentResponse: '',
  attachmentData: '',
  attachmentsActionSettings: {
    isAddAttachmentModalOpen: false,
    isDeleteAttachmentModalOpen: false,
    isEditAttachmentModalOpen: false,
    formData: null,
    deleteAttachmentData: '',
    updateAttachmentData: ''
  },
  updateAttachmentValue: {
    'name': ''
  }

}

export default handleActions(
  {
    [SET_ATTACHMENTS_ACTION_SETTINGS]: (state, action) => ({
      ...state,
      attachmentsActionSettings: action.payload
    }),
    [FETCH_ATTACHMENTS_SUCCESS]: (state, action) => ({
      ...state,
      attachments: action.payload
    }),
    [CREATE_ATTACHMENTS_SUCCESS]: (state, action) => ({
      ...state,
      createAttachmentResponse: action.payload
    }),
    [DELETE_ATTACHMENT_SUCCESS]: (state, action) => ({
      ...state,
      deleteAttachmentResponse: action.payload
    }),
    [UPDATE_ATTACHMENT_SUCCESS]: (state, action) => ({
      ...state,
      updateAttachmentResponse: action.payload
    }),
    [FETCH_ATTACHMENT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      attachmentData: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      createAttachmentResponse: '',
      deleteAttachmentResponse: '',
      updateAttachmentResponse: ''
    }),
    [SET_UPDATE_ATTACHMENT_VALUE]: (state, action) => ({
      ...state,
      updateAttachmentValue: action.payload
    })
  },
  initialState
)
