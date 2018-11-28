import { createAction, handleActions } from 'redux-actions'

// Name Spaced Action Types
const SET_MODAL_SETTING = 'CheckItemModalReducer/SET_MODAL_SETTING'
const SET_CHECKITEM_DATA = 'CheckItemModalReducer/SET_CHECKITEM_DATA'

export const actions = {
    SET_MODAL_SETTING,
    SET_CHECKITEM_DATA
}

export const actionCreators = {
  setModalSetting: createAction(SET_MODAL_SETTING),
  setCheckItemData: createAction(SET_CHECKITEM_DATA)
}

export const initialState = {
  checkItemData: '',
  modalSettings: {
    isViewCheckItemOpen: false,
    isStandardModalOpen: false,
    isPrincipleModalOpen: false,
    principleData: '',
    standardData: ''
  }
}

export default handleActions(
  {
    [SET_CHECKITEM_DATA]: (state, action) => ({
      ...state,
      checkItemData: action.payload
    }),
    [SET_MODAL_SETTING]: (state, action) => ({
      ...state,
      modalSettings: action.payload
    })
  },
  initialState
)
