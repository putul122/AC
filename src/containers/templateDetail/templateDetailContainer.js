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
    payload: state.templateDetailReducer.payload
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
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
  setPayload: actionCreators.setPayload
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
      let componentTypeId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Check Item Template'
      }), 'component_type')
      let componentTypeIdForCategory = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Review Template'
      }), 'component_type')
      console.log('component_type iddddd', componentTypeId)
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeId)
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForCategory)
      let payload = {}
      payload.review_template_id = this.props.match.params.id
      this.props.fetchTemplateById && this.props.fetchTemplateById(payload)
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }

      if (nextProps.componentTypeProperties && nextProps.componentTypeProperties !== '' && nextProps.componentTypeProperties !== this.props.componentTypeProperties) {
        if (nextProps.componentTypeProperties.error_code === null) {
          let propertiesData = nextProps.componentTypeProperties.resources[0].properties
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let propertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review Template~Review Category'
          }), 'component_type_property')
          let valueSet = _.result(_.find(propertiesData, function (obj) {
            return obj.id === propertyId
          }), 'value_set')
          console.log('valueset', valueSet)
          this.props.setTemplateCategoryData(valueSet.values)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }

      if (nextProps.templateData && nextProps.templateData !== '' && nextProps.templateData.error_code === null && nextProps.templateData !== this.props.templateData) {
        let updateTemplateValue = this.props.updateTemplateValue
        updateTemplateValue.name = nextProps.templateData.resources[0].name || ''
        updateTemplateValue.description = nextProps.templateData.resources[0].description || ''
        updateTemplateValue.originalCheckItems = nextProps.templateData.resources[0].check_items || []
        this.props.setUpdateTemplateValue(updateTemplateValue)
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
    }
  })
)(TemplateDetail)
