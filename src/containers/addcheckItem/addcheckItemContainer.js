import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import AddCheckItem from '../../components/addcheckItem/addcheckItemComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/addcheckItemReducer/addcheckItemReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    // componentTypeComponents: state.basicReducer.componentTypeComponents,
    componentTypeComponentCheckitems: state.addcheckItemReducer.componentTypeComponentCheckitems,
    componentTypeComponentPrinciples: state.addcheckItemReducer.componentTypeComponentPrinciples,
    componentTypeComponentStandards: state.addcheckItemReducer.componentTypeComponentStandards,
    // componentTypeComponentCheckitemsvalues: state.addcheckItemReducer.componentTypeComponentCheckitemsvalues,
    componentTypeProperties: state.addcheckItemReducer.componentTypeProperties,
    reviewCategories: state.addcheckItemReducer.reviewCategories,
    selectedStandard: state.addcheckItemReducer.selectedStandard,
    standards: state.addcheckItemReducer.standards,
    selectedPrinciple: state.addcheckItemReducer.selectedPrinciple,
    principles: state.addcheckItemReducer.principles,
    selectedValue: state.addcheckItemReducer.selectedValue,
    values: state.addcheckItemReducer.values,
    selectedCheckitem: state.addcheckItemReducer.selectedCheckitem,
    checkitems: state.addcheckItemReducer.checkitems,
    addCheckitemValue: state.addcheckItemReducer.addCheckitemValue,
    newStandardValue: state.addcheckItemReducer.newStandardValue,
    modalIsOpen: state.basicReducer.modalIsOpen,
    createCheckItemResponse: state.addcheckItemReducer.createCheckItemResponse,
    addStandard: state.addcheckItemReducer.addStandard,
    selectedType: state.addcheckItemReducer.selectedType,
    tags: state.addcheckItemReducer.tags,
    existingCheckItemNames: state.addcheckItemReducer.existingCheckItemNames,
    checkValidity: state.addcheckItemReducer.checkValidity,
    addSettings: state.addcheckItemReducer.addSettings,
    selectedTags: state.addcheckItemReducer.selectedTags
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentTypeComponentsforcheckitems: sagaActions.checkitemActions.fetchComponentTypeComponentsforcheckitems,
  fetchComponentTypeComponentsforprinciples: sagaActions.checkitemActions.fetchComponentTypeComponentsforprinciples,
  fetchComponentTypeComponentsforstandards: sagaActions.checkitemActions.fetchComponentTypeComponentsforstandards,
  // fetchComponentTypeComponentsforcheckitemvalues: sagaActions.checkitemActions.fetchComponentTypeComponentsforcheckitemvalues,
  fetchComponentTypeProperties: sagaActions.checkitemActions.fetchComponentTypeProperties,
  createCheckItem: sagaActions.checkitemActions.createCheckItem,
  addStandard: sagaActions.checkitemActions.addStandard,
  setReviewCategoryData: actionCreators.setReviewCategoryData,
  setSelectedStandard: actionCreators.setSelectedStandard,
  setStandardsData: actionCreators.setStandardsData,
  setSelectedPrinciple: actionCreators.setSelectedPrinciple,
  setPrinciplesData: actionCreators.setPrinciplesData,
  setSelectedValue: actionCreators.setSelectedValue,
  setValuesData: actionCreators.setValuesData,
  setSelectedCheckitem: actionCreators.setSelectedCheckitem,
  setCheckitemsData: actionCreators.setCheckitemsData,
  setAddCheckitemValue: actionCreators.setAddCheckitemValue,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setNewStandardValue: actionCreators.setNewStandardValue,
  setSelectedType: actionCreators.setSelectedType,
  verifyName: sagaActions.checkitemActions.verifyName,
  fetchTags: sagaActions.reviewActions.fetchTags,
  setAddSettings: actionCreators.setAddSettings,
  setCheckValidity: actionCreators.setCheckValidity,
  setSelectedTags: actionCreators.setSelectedTags
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
      // let checkItemValueId = _.result(_.find(componentTypes, function (obj) {
      //   return obj.key === 'Check Item Value Template'
      // }), 'component_type')
      // this.props.fetchComponentTypeComponentsforcheckitemvalues && this.props.fetchComponentTypeComponentsforcheckitemvalues(checkItemValueId)
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(checkItemTemplatesId)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('&&&&', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
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
      if (nextProps.createCheckItemResponse && nextProps.createCheckItemResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.createCheckItemResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully added CheckItem ' +  nextProps.createCheckItemResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createCheckItemResponse.error_message, nextProps.createCheckItemResponse.error_code)
        }
        // this.props.resetResponse()
        this.props.history.push('/checkitems')
      }
      if (nextProps.existingCheckItemNames && nextProps.existingCheckItemNames !== '' && nextProps.checkValidity) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let addSettings = {...this.props.addSettings}
        if (nextProps.existingCheckItemNames.error_code === null) {
          let existingCheckItemNames = nextProps.existingCheckItemNames.resources
          let enterCheckItemName = nextProps.addCheckitemValue.name.trim().toLowerCase()
          let found = _.find(nextProps.existingCheckItemNames.resources, function (obj) { return obj.name.trim().toLowerCase() === enterCheckItemName })
          console.log('existingCheckItemNames', existingCheckItemNames)
          console.log('enterCheckItemName', enterCheckItemName)
          console.log('found', found)
          addSettings.showValidation = true
          if (found) {
            addSettings.message = enterCheckItemName + ' name already exist'
            addSettings.color = {color: 'red'}
            addSettings.toAdd = false
          } else {
            addSettings.message = 'Valid Name'
            addSettings.color = {color: 'green'}
            addSettings.toAdd = true
          }
          nextProps.setAddSettings(addSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.existingCheckItemNames.error_message, nextProps.existingCheckItemNames.error_code)
        }
        nextProps.setCheckValidity(false)
      }
    }
  })
)(AddCheckItem)
