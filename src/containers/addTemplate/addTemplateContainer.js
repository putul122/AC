import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import AddTemplate from '../../components/addTemplate/addTemplateComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/addTemplateReducer/addTemplateReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeProperties: state.addTemplateReducer.componentTypeProperties,
    templateCategories: state.addTemplateReducer.templateCategories,
    templateCheckItems: state.addTemplateReducer.templateCheckItems,
    selectedCategory: state.addTemplateReducer.selectedCategory,
    selectedCheckItem: state.addTemplateReducer.selectedCheckItem,
    checkItems: state.addTemplateReducer.checkItems,
    addTemplateValue: state.addTemplateReducer.addTemplateValue,
    addTemplateResponse: state.addTemplateReducer.addTemplateResponse,
    validationClass: state.addTemplateReducer.validationClass,
    addSettings: state.addTemplateReducer.addSettings,
    existingTemplateNames: state.addTemplateReducer.existingTemplateNames,
    checkValidity: state.addTemplateReducer.checkValidity,
    checkItemsSettings: state.addTemplateReducer.checkItemsSettings,
    processCheckItems: state.addTemplateReducer.processCheckItems,
    tags: state.addTemplateReducer.tags
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchCheckItems: sagaActions.checkitemActions.fetchCheckItems,
  fetchComponentTypeProperties: sagaActions.basicActions.fetchComponentTypeProperties,
  createTemplates: sagaActions.templateActions.createTemplates,
  setTemplateCategoryData: actionCreators.setTemplateCategoryData,
  setAddTemplateValue: actionCreators.setAddTemplateValue,
  setCheckItemsData: actionCreators.setCheckItemsData,
  setSelectedCategory: actionCreators.setSelectedCategory,
  setSelectedCheckItem: actionCreators.setSelectedCheckItem,
  setValidationClass: actionCreators.setValidationClass,
  setAddSettings: actionCreators.setAddSettings,
  setCheckValidity: actionCreators.setCheckValidity,
  setCheckitemsSettings: actionCreators.setCheckitemsSettings,
  setProcessCheckItems: actionCreators.setProcessCheckItems,
  verifyName: sagaActions.templateActions.verifyName,
  fetchTags: sagaActions.reviewActions.fetchTags
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
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      // let componentTypeId = _.result(_.find(componentTypes, function (obj) {
      //     return obj.key === 'Check Item Template'
      // }), 'component_type')
      let componentTypeIdForCategory = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Review Template'
      }), 'component_type')
      let payload = {}
      this.props.fetchCheckItems && this.props.fetchCheckItems(payload)
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForCategory)
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('nextProps', nextProps)
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
            return obj.key === 'Review Template~Review Category'
          }), 'component_type_property')
          if (nextProps.componentTypeProperties.resources.length > 0) {
            nextProps.componentTypeProperties.resources.forEach(function (data, index) {
              let valueSet = _.result(_.find(data.properties, function (obj) {
                return obj.id === propertyId
              }), 'value_set')
              if (valueSet) {
                nextProps.setTemplateCategoryData(valueSet.values)
              }
            })
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }

      if (nextProps.addTemplateResponse && nextProps.addTemplateResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        // let userActionSettings = {...this.props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
        // this.props.setUserActionSettings(userActionSettings)
        if (nextProps.addTemplateResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully added Template ' +  nextProps.addTemplateResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.addTemplateResponse.error_message, nextProps.addTemplateResponse.error_code)
        }
        // this.props.resetResponse()
        this.props.history.push('/templates')
      }
      if (nextProps.existingTemplateNames && nextProps.existingTemplateNames !== '' && nextProps.checkValidity) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let addSettings = {...this.props.addSettings}
        if (nextProps.existingTemplateNames.error_code === null) {
          let existingTemplateNames = nextProps.existingTemplateNames.resources
          let enterTemplateName = nextProps.addSettings.templateName
          let found = _.find(nextProps.existingTemplateNames.resources, function (obj) { return obj.name.trim().toLowerCase() === enterTemplateName.trim() })
          console.log('existingTemplateNames', existingTemplateNames)
          console.log('enterTemplateName', enterTemplateName)
          console.log('found', found)
          addSettings.showValidation = true
          if (found) {
            addSettings.message = enterTemplateName + ' name already exist'
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
          toastr.error(nextProps.existingTemplateNames.error_message, nextProps.existingTemplateNames.error_code)
        }
        nextProps.setCheckValidity(false)
      }
      if (nextProps.templateCheckItems && nextProps.templateCheckItems !== '' && nextProps.processCheckItems) {
        console.log()
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.templateCheckItems.error_code === null) {
          let checkItemsSettings = {...nextProps.checkItemsSettings}
          checkItemsSettings.checkItems = nextProps.templateCheckItems.resources.map(function (data, index) {
            data.isChecked = false
            data.type = 'NEW'
            return data
          })
          nextProps.setCheckitemsSettings(checkItemsSettings)
          nextProps.setProcessCheckItems(false)
        }
      }
    }
  })
)(AddTemplate)
