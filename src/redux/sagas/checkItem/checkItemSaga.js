import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_CHECKITEMS = 'saga/checkitem/FETCH_CHECKITEMS'
export const FETCH_CHECKITEMS_SUCCESS = 'saga/checkitem/FETCH_CHECKITEMS_SUCCESS'
export const FETCH_CHECKITEMS_FAILURE = 'saga/checkitem/FETCH_CHECKITEMS_FAILURE'
export const FETCH_CHECKITEM_BY_ID = 'saga/checkitem/FETCH_CHECKITEM_BY_ID'
export const FETCH_CHECKITEM_BY_ID_SUCCESS = 'saga/checkitem/FETCH_CHECKITEM_BY_ID_SUCCESS'
export const FETCH_CHECKITEM_BY_ID_FAILURE = 'saga/checkitem/FETCH_CHECKITEM_BY_ID_FAILURE'
export const CREATE_CHECKITEM = 'saga/checkitem/CREATE_CHECKITEM'
export const CREATE_CHECKITEM_SUCCESS = 'saga/checkitem/CREATE_CHECKITEM_SUCCESS'
export const CREATE_CHECKITEM_FAILURE = 'saga/checkitem/CREATE_CHECKITEM_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_FAILURE = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_FAILURE = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARD'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARD_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_FAILURE = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARD_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_VALUES'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_SUCCESS = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_FAILURE = 'saga/checkitem/FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_FAILURE'
export const FETCH_COMPONENT_TYPE_PROPERTIES = 'saga/checkitem/FETCH_COMPONENT_TYPE_PROPERTIES'
export const FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS = 'saga/checkitem/FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE = 'saga/checkitem/FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE'
export const DELETE_CHECKITEM = 'saga/checkitem/DELETE_CHECKITEM'
export const DELETE_CHECKITEM_SUCCESS = 'saga/checkitem/DELETE_CHECKITEM_SUCCESS'
export const DELETE_CHECKITEM_FAILURE = 'saga/checkitem/DELETE_CHECKITEM_FAILURE'
export const ADD_STANDARD = 'saga/checkitem/ADD_STANDARD'
export const ADD_STANDARD_SUCCESS = 'saga/checkitem/ADD_STANDARD_SUCCESS'
export const ADD_STANDARD_FAILURE = 'saga/checkitem/ADD_STANDARD_FAILURE'
export const UPDATE_CHECKITEM = 'saga/checkitem/UPDATE_CHECKITEM'
export const UPDATE_CHECKITEM_SUCCESS = 'saga/checkitem/UPDATE_CHECKITEM_SUCCESS'
export const UPDATE_CHECKITEM_FAILURE = 'saga/checkitem/UPDATE_CHECKITEM_FAILURE'
// export const FETCH_REVIEW_ARTEFACTS = 'saga/Basic/FETCH_REVIEW_ARTEFACTS'
// export const FETCH_REVIEW_ARTEFACTS_SUCCESS = 'saga/Basic/FETCH_REVIEW_ARTEFACTS_SUCCESS'
// export const FETCH_REVIEW_ARTEFACTS_FAILURE = 'saga/Basic/FETCH_REVIEW_ARTEFACTS_FAILURE'

export const actionCreators = {
  fetchCheckItems: createAction(FETCH_CHECKITEMS),
  fetchCheckItemsSuccess: createAction(FETCH_CHECKITEMS_SUCCESS),
  fetchCheckItemsFailure: createAction(FETCH_CHECKITEMS_FAILURE),
  fetchCheckItemById: createAction(FETCH_CHECKITEM_BY_ID),
  fetchCheckItemByIdSuccess: createAction(FETCH_CHECKITEM_BY_ID_SUCCESS),
  fetchCheckItemByIdFailure: createAction(FETCH_CHECKITEM_BY_ID_FAILURE),
  createCheckItem: createAction(CREATE_CHECKITEM),
  createCheckItemSuccess: createAction(CREATE_CHECKITEM_SUCCESS),
  createCheckItemFailure: createAction(CREATE_CHECKITEM_FAILURE),
  fetchComponentTypeComponentsforcheckitems: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS),
  fetchComponentTypeComponentsforcheckitemsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_SUCCESS),
  fetchComponentTypeComponentsforcheckitemsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS_FAILURE),
  fetchComponentTypeComponentsforprinciples: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES),
  fetchComponentTypeComponentsforprinciplesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_SUCCESS),
  fetchComponentTypeComponentsforprinciplesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES_FAILURE),
  fetchComponentTypeComponentsforstandards: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS),
  fetchComponentTypeComponentsforstandardsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_SUCCESS),
  fetchComponentTypeComponentsforstandardsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS_FAILURE),
  fetchComponentTypeComponentsforcheckitemvalues: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES),
  fetchComponentTypeComponentsforcheckitemvaluesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_SUCCESS),
  fetchComponentTypeComponentsforcheckitemvaluesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES_FAILURE),
  fetchComponentTypeProperties: createAction(FETCH_COMPONENT_TYPE_PROPERTIES),
  fetchComponentTypePropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS),
  fetchComponentTypePropertiesFailure: createAction(FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE),
  deleteCheckitem: createAction(DELETE_CHECKITEM),
  deleteCheckitemSuccess: createAction(DELETE_CHECKITEM_SUCCESS),
  deleteCheckitemFailure: createAction(DELETE_CHECKITEM_FAILURE),
  addStandard: createAction(ADD_STANDARD),
  addStandardSuccess: createAction(ADD_STANDARD_SUCCESS),
  addStandardFailure: createAction(ADD_STANDARD_FAILURE),
  updateCheckitem: createAction(UPDATE_CHECKITEM),
  updateCheckitemSuccess: createAction(UPDATE_CHECKITEM_SUCCESS),
  updateCheckitemFailure: createAction(UPDATE_CHECKITEM_FAILURE)
}

export default function * watchCheckItems () {
  yield [
      takeLatest(FETCH_CHECKITEMS, getCheckItems),
      takeLatest(FETCH_CHECKITEM_BY_ID, getCheckItemById),
      takeLatest(CREATE_CHECKITEM, createCheckItem),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEMS, getComponentTypeComponentsCheckitems),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_FOR_PRINCIPLES, getComponentTypeComponentsPrinciples),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_FOR_STANDARDS, getComponentTypeComponentsStandards),
      takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_FOR_CHECKITEM_VALUES, getComponentTypeComponentscheckitemvalues),
      takeLatest(FETCH_COMPONENT_TYPE_PROPERTIES, getComponentTypeProperties),
      takeLatest(DELETE_CHECKITEM, deleteCheckitem),
      takeLatest(ADD_STANDARD, addStandard),
      takeLatest(UPDATE_CHECKITEM, updateCheckitem)
    //   takeLatest(FETCH_REVIEW_ARTEFACTS, getReviewArtefacts)
    ]
}

export function * getCheckItems (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkitems = yield call(
      axios.get,
      api.getCheckItems,
      {params: action.payload}
    )
    yield put(actionCreators.fetchCheckItemsSuccess(checkitems.data))
  } catch (error) {
    yield put(actionCreators.fetchCheckItemsFailure(error))
  }
}

export function * getCheckItemById (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkitem = yield call(
      axios.get,
      api.getCheckItem,
      {params: action.payload}
    )
    yield put(actionCreators.fetchCheckItemByIdSuccess(checkitem.data))
  } catch (error) {
    yield put(actionCreators.fetchCheckItemByIdFailure(error))
  }
}

export function * getComponentTypeComponentsCheckitems (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypescheckitem = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentsforcheckitemsSuccess(componentTypescheckitem.data))
  } catch (error) {
    yield put(actionCreators.fetchCompfetchComponentTypeComponentsforcheckitemsFailure(error))
  }
}

export function * getComponentTypeComponentsPrinciples (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypesprinciples = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentsforprinciplesSuccess(componentTypesprinciples.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsforprinciplesFailure(error))
  }
}

export function * getComponentTypeComponentsStandards (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypesstandards = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentsforstandardsSuccess(componentTypesstandards.data))
  } catch (error) {
    yield put(actionCreators.fetchCompfetchComponentTypeComponentsforstandardsFailure(error))
  }
}

export function * deleteCheckitem (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkitem = yield call(
      axios.delete,
      api.deleteCheckitem(action.payload)
    )
    yield put(actionCreators.deleteCheckitemSuccess(checkitem.data))
  } catch (error) {
    yield put(actionCreators.deleteCheckitemFailure(error))
  }
}

export function * updateCheckitem (action) {
  try {
    console.log(action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkitem = yield call(
      axios.patch,
      api.updateCheckItem(action.payload.urlPart.check_item_template_id),
      action.payload.payloadPart
    )
    yield put(actionCreators.updateCheckitemSuccess(checkitem.data))
  } catch (error) {
    yield put(actionCreators.updateCheckitemFailure(error))
  }
}

export function * addStandard (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const standard = yield call(
      axios.post,
      api.createStandard
    )
    yield put(actionCreators.addStandardSuccess(standard.data))
  } catch (error) {
    yield put(actionCreators.addStandardFailure(error))
  }
}

export function * getComponentTypeComponentscheckitemvalues (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypescheckitemvalues = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentsforcheckitemvaluesSuccess(componentTypescheckitemvalues.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsforcheckitemvaluesFailure(error))
  }
}

export function * getComponentTypeProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypeProperties = yield call(
      axios.get,
      api.getComponentTypeProperties(action.payload)
    )
    yield put(actionCreators.fetchComponentTypePropertiesSuccess(componentTypeProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypePropertiesFailure(error))
  }
}

export function * createCheckItem (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const checkitem = yield call(
      axios.post,
      api.createCheckItem,
      action.payload
    )
    yield put(actionCreators.createCheckItemSuccess(checkitem.data))
  } catch (error) {
    yield put(actionCreators.createCheckItemFailure(error))
  }
}
// export function * updateReview (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const review = yield call(
//       axios.patch,
//       api.updateReview,
//       action.payload
//     )
//     yield put(actionCreators.updateReviewsSuccess(review.data))
//   } catch (error) {
//     yield put(actionCreators.updateReviewsFailure(error))
//   }
// }
