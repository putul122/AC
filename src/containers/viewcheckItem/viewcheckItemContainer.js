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
    selectedType: state.addcheckItemReducer.selectedType,
    modalIsOpen: state.basicReducer.modalIsOpen,
    modalSettings: state.viewcheckItemReducer.modalSettings,
    tags: state.viewcheckItemReducer.tags,
    existingCheckItemNames: state.viewcheckItemReducer.existingCheckItemNames,
    checkValidity: state.viewcheckItemReducer.checkValidity,
    selectedTags: state.viewcheckItemReducer.selectedTags,
    processTags: state.viewcheckItemReducer.processTags
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setEditCheckItemSettings: actionCreators.setEditCheckItemSettings,
  setUpdateCheckItemValue: actionCreators.setUpdateCheckItemValue,
  resetResponse: actionCreators.resetResponse,
  fetchCheckItemById: sagaActions.checkitemActions.fetchCheckItemById,
  deleteCheckitem: sagaActions.checkitemActions.deleteCheckitem,
  updateCheckitem: sagaActions.checkitemActions.updateCheckitem,
  fetchComponentTypeComponentsforcheckitems: sagaActions.checkitemActions.fetchComponentTypeComponentsforcheckitems,
  fetchComponentTypeComponentsforprinciples: sagaActions.checkitemActions.fetchComponentTypeComponentsforprinciples,
  fetchComponentTypeComponentsforstandards: sagaActions.checkitemActions.fetchComponentTypeComponentsforstandards,
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
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setModalSetting: actionCreators.setModalSetting,
  verifyName: sagaActions.checkitemActions.verifyName,
  fetchTags: sagaActions.reviewActions.fetchTags,
  setCheckValidity: actionCreators.setCheckValidity,
  setSelectedTags: actionCreators.setSelectedTags,
  setProcessTags: actionCreators.setProcessTags
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchComponentTypeComponentsforstandards && this.props.fetchComponentTypeComponentsforstandards(standardId)
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(checkItemTemplatesId)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentDidUpdate: function () {
      // eslint-disable-next-line
      var tooltips = $('.tooltip').not('.in')
      if (tooltips) {
        tooltips.remove()
      }
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.checkitembyId && nextProps.checkitembyId !== this.props.checkitembyId && this.props.checkitembyId === '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.checkitembyId.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.checkitembyId.error_message, nextProps.checkitembyId.error_code)
          this.props.history.push('/checkitems')
        }
      }
      if (nextProps.tags && nextProps.tags !== '' && nextProps.checkitembyId && nextProps.checkitembyId !== '' && nextProps.processTags) {
        console.log('call', nextProps)
        if (nextProps.tags.error_code === null) {
          let tag = nextProps.checkitembyId.resources[0].tag || ''
          let selectedTags = [] // console.log('tag', tag, nextProps.tags)
          if (tag) {
            let parts = tag.toString().split(' ')
            if (parts.length > 0) {
              parts.forEach(function (data, index) {
                console.log('data -----0', data)
                nextProps.tags.resources.forEach(function (element, idx) {
                  if (element === data) {
                    let option = {}
                    option.id = idx
                    option.value = element
                    option.label = element
                    selectedTags.push(option)
                  }
                })
              })
            }
          }
          nextProps.setSelectedTags(selectedTags)
          nextProps.setProcessTags(false)
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
      if (nextProps.deleteCheckItemResponse && nextProps.deleteCheckItemResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
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
      if (nextProps.existingCheckItemNames && nextProps.existingCheckItemNames !== '' && nextProps.checkValidity) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let editCheckItemsSettings = {...this.props.editCheckItemsSettings}
        if (nextProps.existingCheckItemNames.error_code === null) {
          let existingCheckItemNames = nextProps.existingCheckItemNames.resources
          let enterCheckItemName = nextProps.updateCheckItemValue.name.trim().toLowerCase()
          let found = _.find(nextProps.existingCheckItemNames.resources, function (obj) { return ((obj.name.trim().toLowerCase() === enterCheckItemName) && (obj.id !== parseInt(nextProps.match.params.id))) })
          console.log('existingCheckItemNames', existingCheckItemNames)
          console.log('enterCheckItemName', enterCheckItemName)
          console.log('found', found)
          editCheckItemsSettings.showValidation = true
          if (found) {
            editCheckItemsSettings.message = enterCheckItemName + ' name already exist'
            editCheckItemsSettings.color = {color: 'red'}
            editCheckItemsSettings.toUpdate = false
          } else {
            editCheckItemsSettings.message = 'Valid Name'
            editCheckItemsSettings.color = {color: 'green'}
            editCheckItemsSettings.toUpdate = true
          }
          nextProps.setEditCheckItemSettings(editCheckItemsSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.existingCheckItemNames.error_message, nextProps.existingCheckItemNames.error_code)
        }
        nextProps.setCheckValidity(false)
      }
    }
  })
)(ViewCheckItem)
