import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ViewCheckItem from '../../components/viewcheckItem/viewcheckItemComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/viewcheckItemReducer/viewcheckItemReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    checkitembyId: state.viewcheckItemReducer.checkitembyId,
    editCheckItemsSettings: state.viewcheckItemReducer.editCheckItemsSettings,
    updateCheckItemResponse: state.viewcheckItemReducer.updateCheckItemResponse,
    deleteCheckItemResponse: state.viewcheckItemReducer.deleteCheckItemResponse,
    componentTypeComponentCheckitems: state.viewcheckItemReducer.componentTypeComponentCheckitems,
    componentTypeComponentPrinciples: state.viewcheckItemReducer.componentTypeComponentPrinciples,
    componentTypeComponentStandards: state.viewcheckItemReducer.componentTypeComponentStandards,
    componentTypeComponentCheckitemsvalues: state.viewcheckItemReducer.componentTypeComponentCheckitemsvalues,
    componentTypeProperties: state.viewcheckItemReducer.componentTypeProperties,
    reviewCategories: state.viewcheckItemReducer.reviewCategories,
    selectedStandard: state.viewcheckItemReducer.selectedStandard,
    standards: state.viewcheckItemReducer.standards,
    selectedPrinciple: state.viewcheckItemReducer.selectedPrinciple,
    principles: state.viewcheckItemReducer.principles,
    selectedValue: state.viewcheckItemReducer.selectedValue,
    values: state.viewcheckItemReducer.values,
    selectedCheckitem: state.viewcheckItemReducer.selectedCheckitem,
    checkitems: state.viewcheckItemReducer.checkitems,
    updateCheckItemValue: state.viewcheckItemReducer.updateCheckItemValue,
    payload: state.viewcheckItemReducer.payload,
    componentTypeComponent: state.basicReducer.componentTypeComponent,
    componentTypeComponents: state.basicReducer.componentTypeComponents,
    selectedType: state.addcheckItemReducer.selectedType,
    modalIsOpen: state.basicReducer.modalIsOpen
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setEditCheckItemSettings: actionCreators.setEditCheckItemSettings,
  setUpdateCheckItemValue: actionCreators.setUpdateCheckItemValue,
  resetResponse: actionCreators.resetResponse,
  fetchComponentTypeComponent: sagaActions.basicActions.fetchComponentTypeComponent,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
  fetchCheckItemById: sagaActions.checkitemActions.fetchCheckItemById,
  deleteCheckitem: sagaActions.checkitemActions.deleteCheckitem,
  updateCheckitem: sagaActions.checkitemActions.updateCheckitem,
  fetchComponentTypeComponentsforcheckitems: sagaActions.checkitemActions.fetchComponentTypeComponentsforcheckitems,
  fetchComponentTypeComponentsforprinciples: sagaActions.checkitemActions.fetchComponentTypeComponentsforprinciples,
  fetchComponentTypeComponentsforstandards: sagaActions.checkitemActions.fetchComponentTypeComponentsforstandards,
  fetchComponentTypeComponentsforcheckitemvalues: sagaActions.checkitemActions.fetchComponentTypeComponentsforcheckitemvalues,
  fetchComponentTypeProperties: sagaActions.checkitemActions.fetchComponentTypeProperties,
  setReviewCategoryData: actionCreators.setReviewCategoryData,
  setSelectedStandard: actionCreators.setSelectedStandard,
  setStandardsData: actionCreators.setStandardsData,
  setSelectedPrinciple: actionCreators.setSelectedPrinciple,
  setPrinciplesData: actionCreators.setPrinciplesData,
  setSelectedValue: actionCreators.setSelectedValue,
  setValuesData: actionCreators.setValuesData,
  setSelectedCheckitem: actionCreators.setSelectedCheckitem,
  setCheckitemsData: actionCreators.setCheckitemsData,
  setPayload: actionCreators.setPayload,
  setSelectedType: actionCreators.setSelectedType,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// eslint-disable-next-line
toastr.options = {
  'closeButton': false,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-bottom-full-width',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '4000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let payload = {
      'template_id': this.props.match.params.id
      }
      this.props.fetchCheckItemById && this.props.fetchCheckItemById(payload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let checkItemTemplatesId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Check Item Template'
      }), 'component_type')
      this.props.fetchComponentTypeComponentsforcheckitems && this.props.fetchComponentTypeComponentsforcheckitems(checkItemTemplatesId)
      let principleId = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Principle'
      }), 'component_type')
      this.props.fetchComponentTypeComponentsforprinciples && this.props.fetchComponentTypeComponentsforprinciples(principleId)
      let standardId = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Standard'
      }), 'component_type')
      this.props.fetchComponentTypeComponentsforstandards && this.props.fetchComponentTypeComponentsforstandards(standardId)
      let checkItemValueId = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Check Item Value Template'
      }), 'component_type')
      this.props.fetchComponentTypeComponentsforcheckitemvalues && this.props.fetchComponentTypeComponentsforcheckitemvalues(checkItemValueId)
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(checkItemTemplatesId)
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.componentTypeProperties && nextProps.componentTypeProperties !== '') {
        if (nextProps.componentTypeProperties.error_code === null) {
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let propertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Check Item Template~Type'
          }), 'component_type_property')
          if (nextProps.componentTypeProperties.resources.length > 0) {
            nextProps.componentTypeProperties.resources.forEach(function (data, index) {
              let valueSet = _.result(_.find(data.properties, function (obj) {
                return obj.id === propertyId
              }), 'value_set')
              if (valueSet) {
                console.log(valueSet.values, 'inside if')
                nextProps.setReviewCategoryData(valueSet.values)
              }
            })
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }
      if (nextProps.deleteCheckItemResponse && nextProps.deleteCheckItemResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let userActionSettings = {...this.props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
        // this.props.setUserActionSettings(userActionSettings)
        if (nextProps.deleteCheckItemResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully deleted CheckItem ' +  nextProps.deleteCheckItemResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteCheckItemResponse.error_message, deleteCheckItemResponse.error_code)
        }
        // this.props.resetResponse()
        this.props.history.push('/checkitems')
      }
      if (nextProps.updateCheckItemResponse && nextProps.updateCheckItemResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let userActionSettings = {...this.props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
        // this.props.setUserActionSettings(userActionSettings)
        if (nextProps.updateCheckItemResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully updated CheckItem ' +  nextProps.updateCheckItemResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateCheckItemResponse.error_message, nextProps.updateCheckItemResponse.error_code)
        }
        // this.props.resetResponse()
        this.props.history.push('/checkitems')
      }
    }
  })
)(ViewCheckItem)
