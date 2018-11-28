import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_CLIENT_ACCESS_TOKEN = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN'
export const FETCH_CLIENT_ACCESS_TOKEN_SUCCESS = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_SUCCESS'
export const FETCH_CLIENT_ACCESS_TOKEN_FAILURE = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_FAILURE'
export const FETCH_USER_AUTHENTICATION = 'saga/Basic/FETCH_USER_AUTHENTICATION'
export const FETCH_USER_AUTHENTICATION_SUCCESS = 'saga/Basic/FETCH_USER_AUTHENTICATION_SUCCESS'
export const FETCH_USER_AUTHENTICATION_FAILURE = 'saga/Basic/FETCH_USER_AUTHENTICATION_FAILURE'
export const FETCH_BUSINESS_UNITS = 'saga/Basic/FETCH_BUSINESS_UNITS'
export const FETCH_BUSINESS_UNITS_SUCCESS = 'saga/Basic/FETCH_BUSINESS_UNITS_SUCCESS'
export const FETCH_BUSINESS_UNITS_FAILURE = 'saga/Basic/FETCH_BUSINESS_UNITS_FAILURE'
export const UPDATE_NOTIFICATION_VIEW_STATUS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS'
export const UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE = 'saga/Basic/UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE'
export const FETCH_PACKAGE = 'saga/Basic/FETCH_PACKAGE'
export const FETCH_PACKAGE_SUCCESS = 'saga/Basic/FETCH_PACKAGE_SUCCESS'
export const FETCH_PACKAGE_FAILURE = 'saga/Basic/FETCH_PACKAGE_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/Basic/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/Basic/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/Basic/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const FETCH_COMPONENT_TYPE_RELATIONS = 'saga/Basic/FETCH_COMPONENT_TYPE_RELATIONS'
export const FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS = 'saga/Basic/FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS'
export const FETCH_COMPONENT_TYPE_RELATIONS_FAILURE = 'saga/Basic/FETCH_COMPONENT_TYPE_RELATIONS_FAILURE'
export const FETCH_ROLES = 'saga/Basic/FETCH_ROLES'
export const FETCH_ROLES_SUCCESS = 'saga/Basic/FETCH_ROLES_SUCCESS'
export const FETCH_ROLES_FAILURE = 'saga/Basic/FETCH_ROLES_FAILURE'
export const UPDATE_COMPONENT_RELATIONSHIPS = 'saga/Basic/UPDATE_COMPONENT_RELATIONSHIPS'
export const UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/Basic/UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const UPDATE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/Basic/UPDATE_COMPONENT_RELATIONSHIPS_FAILURE'
export const FETCH_COMPONENT_TYPE_PROPERTIES = 'saga/Basic/FETCH_COMPONENT_TYPE_PROPERTIES'
export const FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS = 'saga/Basic/FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE = 'saga/Basic/FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_CONSTRAINTS = 'saga/Basic/FETCH_COMPONENT_TYPE_CONSTRAINTS'
export const FETCH_COMPONENT_TYPE_CONSTRAINTS_SUCCESS = 'saga/Basic/FETCH_COMPONENT_TYPE_CONSTRAINTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_CONSTRAINTS_FAILURE = 'saga/Basic/FETCH_COMPONENT_TYPE_CONSTRAINTS_FAILURE'
export const FETCH_REVIEWARTEFACT_PROPERTIES = 'saga/Basic/FETCH_REVIEWARTEFACT_PROPERTIES'
export const FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS = 'saga/Basic/FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS'
export const FETCH_REVIEWARTEFACT_PROPERTIES_FAILURE = 'saga/Basic/FETCH_REVIEWARTEFACT_PROPERTIES_FAILURE'
export const FETCH_REVIEWARTEFACT_RELATIONSHIPS = 'saga/Basic/FETCH_REVIEWARTEFACT_RELATIONSHIPS'
export const FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS = 'saga/Basic/FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS'
export const FETCH_REVIEWARTEFACT_RELATIONSHIPS_FAILURE = 'saga/Baisc/FETCH_REVIEWARTEFACT_RELATIONSHIPS_FAILURE'

export const actionCreators = {
  fetchClientAccessToken: createAction(FETCH_CLIENT_ACCESS_TOKEN),
  fetchClientAccessTokenSuccess: createAction(FETCH_CLIENT_ACCESS_TOKEN_SUCCESS),
  fetchClientAccessTokenFailure: createAction(FETCH_CLIENT_ACCESS_TOKEN_FAILURE),
  fetchUserAuthentication: createAction(FETCH_USER_AUTHENTICATION),
  fetchUserAuthenticationSuccess: createAction(FETCH_USER_AUTHENTICATION_SUCCESS),
  fetchUserAuthenticationFailure: createAction(FETCH_USER_AUTHENTICATION_FAILURE),
  fetchBusinessUnits: createAction(FETCH_BUSINESS_UNITS),
  fetchBusinessUnitsSuccess: createAction(FETCH_BUSINESS_UNITS_SUCCESS),
  fetchBusinessUnitsFailure: createAction(FETCH_BUSINESS_UNITS_FAILURE),
  updateNotificationViewStatus: createAction(UPDATE_NOTIFICATION_VIEW_STATUS),
  updateNotificationViewStatusSuccess: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_SUCCESS),
  updateNotificationViewStatusFailure: createAction(UPDATE_NOTIFICATION_VIEW_STATUS_FAILURE),
  fetchPackage: createAction(FETCH_PACKAGE),
  fetchPackageSuccess: createAction(FETCH_PACKAGE_SUCCESS),
  fetchPackageFailure: createAction(FETCH_PACKAGE_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  fetchcomponentTypeRelations: createAction(FETCH_COMPONENT_TYPE_RELATIONS),
  fetchcomponentTypeRelationsSuccess: createAction(FETCH_COMPONENT_TYPE_RELATIONS_SUCCESS),
  fetchcomponentTypeRelationsFailure: createAction(FETCH_COMPONENT_TYPE_RELATIONS_FAILURE),
  fetchRoles: createAction(FETCH_ROLES),
  fetchRolesSuccess: createAction(FETCH_ROLES_SUCCESS),
  fetchRolesFailure: createAction(FETCH_ROLES_FAILURE),
  updateComponentRelationships: createAction(UPDATE_COMPONENT_RELATIONSHIPS),
  updateComponentRelationshipsSuccess: createAction(UPDATE_COMPONENT_RELATIONSHIPS_SUCCESS),
  updateComponentRelationshipsFailure: createAction(UPDATE_COMPONENT_RELATIONSHIPS_FAILURE),
  fetchComponentTypeProperties: createAction(FETCH_COMPONENT_TYPE_PROPERTIES),
  fetchComponentTypePropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_PROPERTIES_SUCCESS),
  fetchComponentTypePropertiesFailure: createAction(FETCH_COMPONENT_TYPE_PROPERTIES_FAILURE),
  fetchcomponentTypeConstraints: createAction(FETCH_COMPONENT_TYPE_CONSTRAINTS),
  fetchcomponentTypeConstraintsSuccess: createAction(FETCH_COMPONENT_TYPE_CONSTRAINTS_SUCCESS),
  fetchcomponentTypeConstraintsFailure: createAction(FETCH_COMPONENT_TYPE_CONSTRAINTS_FAILURE),
  fetchReviewArtefactProperties: createAction(FETCH_REVIEWARTEFACT_PROPERTIES),
  fetchReviewArtefactPropertiesSuccess: createAction(FETCH_REVIEWARTEFACT_PROPERTIES_SUCCESS),
  fetchReviewArtefactPropertiesFailure: createAction(FETCH_REVIEWARTEFACT_PROPERTIES_FAILURE),
  fetchReviewArtefactRelationships: createAction(FETCH_REVIEWARTEFACT_RELATIONSHIPS),
  fetchReviewArtefactRelationshipsSuccess: createAction(FETCH_REVIEWARTEFACT_RELATIONSHIPS_SUCCESS),
  fetchReviewArtefactRelationshipsFailure: createAction(FETCH_REVIEWARTEFACT_RELATIONSHIPS_FAILURE)
}

export default function * watchBasic () {
  yield [
    takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken),
    takeLatest(FETCH_USER_AUTHENTICATION, getUserAuthentication),
    takeLatest(FETCH_BUSINESS_UNITS, getBusinessUnits),
    takeLatest(UPDATE_NOTIFICATION_VIEW_STATUS, updateNotificationViewStatus),
    takeLatest(FETCH_PACKAGE, getPackage),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
    takeLatest(FETCH_COMPONENT_TYPE_RELATIONS, getComponentTypeRelations),
    takeLatest(FETCH_ROLES, getRoles),
    takeLatest(UPDATE_COMPONENT_RELATIONSHIPS, updateComponentRelationships),
    takeLatest(FETCH_COMPONENT_TYPE_PROPERTIES, getComponentTypeProperties),
    takeLatest(FETCH_COMPONENT_TYPE_CONSTRAINTS, getComponentTypeConstraints),
    takeLatest(FETCH_REVIEWARTEFACT_PROPERTIES, getReviewArtefactProperties),
    takeLatest(FETCH_REVIEWARTEFACT_RELATIONSHIPS, getReviewArtefactRelationships)
  ]
}

export function * getClientAccessToken (action) {
  try {
    const clientAccessToken = yield call(
      axios.post,
      api.clientAccessToken,
      action.payload
    )
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
  } catch (error) {
    yield put(actionCreators.fetchClientAccessTokenFailure(error))
  }
}

export function * getUserAuthentication (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const userAuthentication = yield call(
      axios.get,
      api.authenticateUser
    )
    yield put(actionCreators.fetchUserAuthenticationSuccess(userAuthentication.data))
  } catch (error) {
    yield put(actionCreators.fetchUserAuthenticationFailure(error))
  }
}

export function * getReviewArtefactProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const reviewArtefactProperties = yield call(
      axios.get,
      api.getReviewArtefactProperties(action.payload.review_artefact_id)
    )
    yield put(actionCreators.fetchReviewArtefactPropertiesSuccess(reviewArtefactProperties.data))
  } catch (error) {
    yield put(actionCreators.fetchReviewArtefactPropertiesFailure(error))
  }
}

export function * getReviewArtefactRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const reviewArtefactRelationships = yield call(
      axios.get,
      api.getReviewArtefactRelationships(action.payload.review_artefact_id)
    )
    yield put(actionCreators.fetchReviewArtefactRelationshipsSuccess(reviewArtefactRelationships.data))
  } catch (error) {
    yield put(actionCreators.fetchReviewArtefactRelationshipsFailure(error))
  }
}

export function * getBusinessUnits (action) {
  try {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const businessUnits = yield call(
      axios.get,
      api.getBusinessUnits
    )
    yield put(actionCreators.fetchBusinessUnitsSuccess(businessUnits.data))
  } catch (error) {
    yield put(actionCreators.fetchBusinessUnitsFailure(error))
  }
}

export function * updateNotificationViewStatus (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const updateNotificationViewStatus = yield call(
      axios.patch,
      api.updateNotificationViewStatus
    )
    yield put(actionCreators.updateNotificationViewStatusSuccess(updateNotificationViewStatus.data))
  } catch (error) {
    yield put(actionCreators.updateNotificationViewStatusFailure(error))
  }
}

export function * getPackage (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const packages = yield call(
      axios.get,
      api.getPackage
    )
    yield put(actionCreators.fetchPackageSuccess(packages.data))
  } catch (error) {
    yield put(actionCreators.fetchPackageFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload)
    )
    yield put(actionCreators.fetchComponentTypeComponentsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsFailure(error))
  }
}

export function * getComponentTypeRelations (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypeRelations = yield call(
      axios.get,
      api.getComponentTypeRelations(action.payload)
    )
    yield put(actionCreators.fetchcomponentTypeRelationsSuccess(componentTypeRelations.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeRelationsFailure(error))
  }
}

export function * getComponentTypeConstraints (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypeRelations = yield call(
      axios.get,
      api.getComponentTypeConstraints(action.payload)
    )
    yield put(actionCreators.fetchcomponentTypeConstraintsSuccess(componentTypeRelations.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeConstraintsFailuer(error))
  }
}

export function * getRoles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const roles = yield call(
      axios.get,
      api.getRoles
    )
    yield put(actionCreators.fetchRolesSuccess(roles.data))
  } catch (error) {
    yield put(actionCreators.fetchRolesFailure(error))
  }
}

export function * updateComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentRelationships = yield call(
      axios.patch,
      api.updateComponentRelationships(action.payload.componentId),
      action.payload.relationship
    )
    yield put(actionCreators.updateComponentRelationshipsSuccess(componentRelationships.data))
  } catch (error) {
    yield put(actionCreators.updateComponentRelationshipsFailure(error))
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
