import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import AddCheckItem from '../../components/addcheckItem/addcheckItemComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/addcheckItemReducer/addcheckItemReducerrReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser
    // entitlement: state.addcheckItemReducer.entitlement,
    // entitlementSummary: state.addcheckItemReducer.entitlementSummary
    // entitlementProperties: state.entitlementDetailReducer.entitlementProperties,
    // entitlementRelationships: state.entitlementDetailReducer.entitlementRelationships,
    // deleteEntitlementResponse: state.entitlementDetailReducer.deleteEntitlementResponse,
    // updateEntitlementResponse: state.entitlementDetailReducer.updateEntitlementResponse,
    // copiedEntitlementProperties: state.entitlementDetailReducer.copiedEntitlementProperties,
    // copiedEntitlementData: state.entitlementDetailReducer.copiedEntitlementData,
    // isEditComponent: state.entitlementDetailReducer.isEditComponent,
    // entitlementPropertiesPayload: state.entitlementDetailReducer.entitlementPropertiesPayload,
    // updateEntitlementSettings: state.entitlementDetailReducer.updateEntitlementSettings,
    // updateEntitlementPropertyResponse: state.entitlementDetailReducer.updateEntitlementPropertyResponse,
    // relationshipProperty: state.entitlementDetailReducer.relationshipProperty,
    // relationshipPropertyPayload: state.entitlementDetailReducer.relationshipPropertyPayload,
    // addNewConnectionSettings: state.entitlementDetailReducer.addNewConnectionSettings,
    // componentTypeComponentConstraints: state.entitlementDetailReducer.componentTypeComponentConstraints,
    // componentTypeComponents: state.entitlementDetailReducer.componentTypeComponents,
    // updateRelationshipResponse: state.entitlementDetailReducer.updateRelationshipResponse,
    // updateRelationshipPropertyResponse: state.entitlementDetailReducer.updateRelationshipPropertyResponse,
    // deleteRelationshipResponse: state.entitlementDetailReducer.deleteRelationshipResponse,
    // relationshipActionSettings: state.entitlementDetailReducer.relationshipActionSettings
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  // fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  // fetchEntitlementById: sagaActions.entitlementActions.fetchEntitlementById,
  // fetchEntitlementProperties: sagaActions.entitlementActions.fetchEntitlementProperties,
  // fetchEntitlementRelationships: sagaActions.entitlementActions.fetchEntitlementRelationships,
  // deleteEntitlement: sagaActions.entitlementActions.deleteEntitlement,
  // updateEntitlement: sagaActions.entitlementActions.updateEntitlement,
  // updateEntitlementProperties: sagaActions.entitlementActions.updateEntitlementProperties,
  // resetResponse: actionCreators.resetResponse,
  // setUpdateEntitlementSettings: actionCreators.setUpdateEntitlementSettings,
  // setEditComponentFlag: actionCreators.setEditComponentFlag,
  // pushEntitlementPropertyPayload: actionCreators.pushEntitlementPropertyPayload,
  // editEntitlementProperties: actionCreators.editEntitlementProperties,
  // copyEntitlementProperties: actionCreators.copyEntitlementProperties,
  // copyEntitlementData: actionCreators.copyEntitlementData,
  // restoreEntitlementProperties: actionCreators.restoreEntitlementProperties,
  // fetchRelationshipProperty: sagaActions.agreementActions.fetchRelationshipProperty,
  // updateRelationshipProperty: sagaActions.agreementActions.updateRelationshipProperty,
  // deleteComponentRelationship: sagaActions.agreementActions.deleteComponentRelationship,
  // fetchComponentConstraints: sagaActions.agreementActions.fetchComponentConstraints,
  // fetchComponentTypeComponents: sagaActions.agreementActions.fetchComponentTypeComponents
  // updateComponentTypeComponentRelationships: sagaActions.agreementActions.updateComponentTypeComponentRelationships,
  // setRelationshipActionSettings: actionCreators.setRelationshipActionSettings,
  // editComponentRelationshipProperties: actionCreators.editComponentRelationshipProperties,
  // resetComponentRelationshipProperties: actionCreators.resetComponentRelationshipProperties,
  // editComponentRelationshipPropertyPayload: actionCreators.editComponentRelationshipPropertyPayload,
  // setAddConnectionSettings: actionCreators.setAddConnectionSettings,
  // resetUpdateRelationshipResponse: actionCreators.resetUpdateRelationshipResponse
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
// toastr.options = {
//   'closeButton': false,
//   'debug': false,
//   'newestOnTop': false,
//   'progressBar': false,
//   'positionClass': 'toast-bottom-full-width',
//   'preventDuplicates': false,
//   'onclick': null,
//   'showDuration': '300',
//   'hideDuration': '1000',
//   'timeOut': '4000',
//   'extendedTimeOut': '1000',
//   'showEasing': 'swing',
//   'hideEasing': 'linear',
//   'showMethod': 'fadeIn',
//   'hideMethod': 'fadeOut'
// }

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
    this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
    // let payload = {
    //   'entitlement_id': this.props.match.params.id,
    //   'id': this.props.match.params.id
    // }
    // this.props.fetchEntitlementById && this.props.fetchEntitlementById(payload)
    // this.props.fetchEntitlementProperties && this.props.fetchEntitlementProperties(payload)
    // this.props.fetchEntitlementRelationships && this.props.fetchEntitlementRelationships(payload)
    // this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
    },
    componentWillReceiveProps: function (nextProps) {
    }
  })
)(AddCheckItem)
