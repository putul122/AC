import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import TemplateDetail from '../../components/templateDetail/templateDetailComponent'
import _ from 'lodash'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/templateDetailReducer/templateDetailReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    templateData: state.templateDetailReducer.templateData,
    templateCategories: state.templateDetailReducer.templateCategories,
    templateCheckItems: state.templateDetailReducer.templateCheckItems,
    componentTypeProperties: state.templateDetailReducer.componentTypeProperties,
    selectedCategory: state.templateDetailReducer.selectedCategory,
    selectedCheckItem: state.templateDetailReducer.selectedCheckItem,
    checkItems: state.templateDetailReducer.checkItems,
    updateTemplateValue: state.templateDetailReducer.updateTemplateValue,
    editTemplateSettings: state.templateDetailReducer.editTemplateSettings,
    updateTemplateResponse: state.templateDetailReducer.updateTemplateResponse,
    deleteTemplateResponse: state.templateDetailReducer.deleteTemplateResponse,
    payload: state.templateDetailReducer.payload,
    validationClass: state.templateDetailReducer.validationClass,
    checkItemsSettings: state.templateDetailReducer.checkItemsSettings,
    processCheckItems: state.templateDetailReducer.processCheckItems,
    tags: state.templateDetailReducer.tags,
    existingTemplateNames: state.templateDetailReducer.existingTemplateNames,
    checkValidity: state.templateDetailReducer.checkValidity
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchCheckItems: sagaActions.checkitemActions.fetchCheckItems,
  fetchComponentTypeProperties: sagaActions.basicActions.fetchComponentTypeProperties,
  fetchTemplateById: sagaActions.templateActions.fetchTemplateById,
  deleteTemplate: sagaActions.templateActions.deleteTemplate,
  updateTemplates: sagaActions.templateActions.updateTemplates,
  setEditTemplateSettings: actionCreators.setEditTemplateSettings,
  resetResponse: actionCreators.resetResponse,
  setTemplateCategoryData: actionCreators.setTemplateCategoryData,
  setUpdateTemplateValue: actionCreators.setUpdateTemplateValue,
  setCheckItemsData: actionCreators.setCheckItemsData,
  setSelectedCategory: actionCreators.setSelectedCategory,
  setSelectedCheckItem: actionCreators.setSelectedCheckItem,
  setPayload: actionCreators.setPayload,
  setValidationClass: actionCreators.setValidationClass,
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // // eslint-disable-next-line
      // // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      // let componentTypeId = _.result(_.find(componentTypes, function (obj) {
      //     return obj.key === 'Check Item Template'
      // }), 'component_type')
      let componentTypeIdForCategory = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Review Template'
      }), 'component_type')
      this.props.fetchCheckItems && this.props.fetchCheckItems({})
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForCategory)
      let payload = {}
      payload.review_template_id = this.props.match.params.id
      this.props.fetchTemplateById && this.props.fetchTemplateById(payload)
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
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }

      if (nextProps.componentTypeProperties && nextProps.componentTypeProperties !== '' && nextProps.componentTypeProperties !== this.props.componentTypeProperties) {
        if (nextProps.componentTypeProperties.error_code === null) {
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let propertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review Template~Review Category'
          }), 'component_type_property')
          if (nextProps.componentTypeProperties.resources.length > 0) {
            nextProps.componentTypeProperties.resources.forEach(function (data, index) {
              console.log('data-------------', data)
              let valueSet = _.result(_.find(data.properties, function (obj) {
                return obj.id === propertyId
              }), 'value_set')
              console.log('valueset ----', valueSet)
              if (valueSet) {
                console.log(valueSet.values, 'inside if')
                nextProps.setTemplateCategoryData(valueSet.values)
              }
            })
          }
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }

      if (nextProps.templateData && nextProps.templateData !== '' && nextProps.templateData.error_code === null && nextProps.templateData !== this.props.templateData) {
        let editTemplateSettings = {...nextProps.editTemplateSettings, 'isEditFlag': false}
        editTemplateSettings.name = nextProps.templateData.resources[0].name || ''
        editTemplateSettings.description = nextProps.templateData.resources[0].description || ''
        nextProps.setEditTemplateSettings(editTemplateSettings)
        // let updateTemplateValue = this.props.updateTemplateValue
        // updateTemplateValue.name = nextProps.templateData.resources[0].name || ''
        // updateTemplateValue.description = nextProps.templateData.resources[0].description || ''
        // updateTemplateValue.originalCheckItems = nextProps.templateData.resources[0].check_items || []
        nextProps.setUpdateTemplateValue(editTemplateSettings)
        if (nextProps.templateData.resources[0].check_items.length > 0) {
          let checkItems = nextProps.templateData.resources[0].check_items.map(function (data, index) {
            data.type = 'OLD'
            return data
          })
          this.props.setCheckItemsData(checkItems)
        }
      }

      if (nextProps.deleteTemplateResponse && nextProps.deleteTemplateResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let editTemplateSettings = {...this.props.editTemplateSettings, 'isDeleteModalOpen': false}
        this.props.setEditTemplateSettings(editTemplateSettings)
        if (nextProps.deleteTemplateResponse.error_code === null) {
          // eslint-disable-next-line
          toastr.success('Successfully deleted Template ' +  nextProps.deleteTemplateResponse.resources[0].name , 'Removed')
          this.props.history.push('/templates')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteTemplateResponse.error_message, nextProps.deleteTemplateResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateTemplateResponse && nextProps.updateTemplateResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let editTemplateSettings = {...this.props.editTemplateSettings, 'isEditFlag': false}
        this.props.setEditTemplateSettings(editTemplateSettings)
        if (nextProps.updateTemplateResponse.error_code === null) {
          let payload = {}
          payload.review_template_id = this.props.match.params.id
          this.props.fetchTemplateById && this.props.fetchTemplateById(payload)
          // eslint-disable-next-line
          toastr.success('Successfully updated Template Id ' +  nextProps.updateTemplateResponse.resources[0].review_template_id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateTemplateResponse.error_message, nextProps.updateTemplateResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.existingTemplateNames && nextProps.existingTemplateNames !== '' && nextProps.checkValidity) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let editTemplateSettings = {...this.props.editTemplateSettings}
        if (nextProps.existingTemplateNames.error_code === null) {
          let existingTemplateNames = nextProps.existingTemplateNames.resources
          let enterTemplateName = nextProps.editTemplateSettings.name
          let found = _.find(nextProps.existingTemplateNames.resources, function (obj) { return ((obj.name.toLowerCase() === enterTemplateName) && (obj.id !== parseInt(nextProps.match.params.id))) })
          console.log('existingTemplateNames', existingTemplateNames)
          console.log('enterTemplateName', enterTemplateName)
          console.log('found', found)
          editTemplateSettings.showValidation = true
          if (found) {
            editTemplateSettings.message = enterTemplateName + ' name already exist'
            editTemplateSettings.color = {color: 'red'}
            editTemplateSettings.toUpdate = false
          } else {
            editTemplateSettings.message = 'Valid Name'
            editTemplateSettings.color = {color: 'green'}
            editTemplateSettings.toUpdate = true
          }
          nextProps.setEditTemplateSettings(editTemplateSettings)
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
)(TemplateDetail)
