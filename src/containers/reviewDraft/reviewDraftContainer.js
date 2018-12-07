import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import ReviewDraft from '../../components/reviewDraft/reviewDraftComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewDraftReducer/reviewDraftReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators as checkItemModalActionCreators } from '../../redux/reducers/checkItemModalReducer/checkItemModalReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewData: state.reviewDraftReducer.reviewData,
    connectArtefact: state.reviewDraftReducer.connectArtefact,
    draftEdit: state.reviewDraftReducer.draftEdit,
    componentTypeRelations: state.reviewDraftReducer.componentTypeRelations,
    reviewCheckitems: state.reviewDraftReducer.reviewCheckitems,
    reviewArtefacts: state.reviewDraftReducer.reviewArtefacts,
    updateReviewResponse: state.reviewDraftReducer.updateReviewResponse,
    connectArtefactResponse: state.reviewDraftReducer.connectArtefactResponse,
    selectedCheckItem: state.reviewDraftReducer.selectedCheckItem,
    connectArtefactSettings: state.reviewDraftReducer.connectArtefactSettings,
    updatePayload: state.reviewDraftReducer.updatePayload,
    componentTypeProperties: state.reviewDraftReducer.componentTypeProperties,
    reviewCategories: state.reviewDraftReducer.reviewCategories,
    reviewProperties: state.reviewDraftReducer.reviewProperties,
    validationClass: state.reviewDraftReducer.validationClass,
    selectedCategory: state.reviewDraftReducer.selectedCategory,
    firstLoad: state.reviewDraftReducer.firstLoad,
    users: state.reviewDraftReducer.users,
    selectedApprover: state.reviewDraftReducer.selectedApprover,
    selectedReviewer: state.reviewDraftReducer.selectedReviewer
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setConnectArtefactSettings: actionCreators.setConnectArtefactSettings,
  setUpdatePayload: actionCreators.setUpdatePayload,
  setSelectedCheckItem: actionCreators.setSelectedCheckItem,
  resetResponse: actionCreators.resetResponse,
  setDraftEditData: actionCreators.setDraftEditData,
  setCategoryData: actionCreators.setCategoryData,
  setReviewProperty: actionCreators.setReviewProperty,
  setValidationClass: actionCreators.setValidationClass,
  setSelectedCategory: actionCreators.setSelectedCategory,
  setFirstLoad: actionCreators.setFirstLoad,
  setSelectedApprover: actionCreators.setSelectedApprover,
  setSelectedReviewer: actionCreators.setSelectedReviewer,
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  fetchReviewArtefacts: sagaActions.reviewActions.fetchReviewArtefacts,
  updateReviews: sagaActions.reviewActions.updateReviews,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
  fetchcomponentTypeRelations: sagaActions.basicActions.fetchcomponentTypeRelations,
  fetchcomponentTypeConstraints: sagaActions.basicActions.fetchcomponentTypeConstraints,
  connectDisconnectArtefact: sagaActions.reviewActions.connectDisconnectArtefact,
  fetchComponentTypeProperties: sagaActions.basicActions.fetchComponentTypeProperties,
  fetchUsers: sagaActions.userActions.fetchUsers,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setModalSetting: checkItemModalActionCreators.setModalSetting,
  setCheckItemData: checkItemModalActionCreators.setCheckItemData
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
      console.log('props', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      this.props.fetchUsers && this.props.fetchUsers()
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'review_id': this.props.match.params.id
      }
      this.props.fetchReviewById && this.props.fetchReviewById(payload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let connectionTypes = appPackage.resources[0].connection_types
      let componentTypeIdForComponents = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Check Item Template'
      }), 'component_type')
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeIdForComponents)
      let componentTypeIdForReview = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Review'
      }), 'component_type')
      let payloadRelations = {}
      payloadRelations.componentTypeId = componentTypeIdForReview
      payloadRelations.connectionTypeId = _.result(_.find(connectionTypes, function (obj) {
        return obj.key === 'Assesses'
      }), 'connection_type')
      this.props.fetchcomponentTypeRelations && this.props.fetchcomponentTypeRelations(payloadRelations)
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForReview)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
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
      if (nextProps.reviewData && nextProps.reviewData !== '' && nextProps.reviewData !== this.props.reviewData && this.props.reviewData === '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        console.log('running 123')
        if (nextProps.reviewData.error_code === null && nextProps.reviewData.resources && nextProps.reviewData.resources.length > 0) {
          let draftEdit = {...this.props.draftEdit}
          draftEdit.name = nextProps.reviewData.resources[0].name || ''
          draftEdit.description = nextProps.reviewData.resources[0].description || ''
          draftEdit.category = nextProps.reviewData.resources[0].review_category_id || ''
          draftEdit.reviewer = nextProps.reviewData.resources[0].reviewer || ''
          draftEdit.approver = nextProps.reviewData.resources[0].approver || ''
          let checkItems = nextProps.reviewData.resources[0].check_items || []
          if (checkItems.length > 0) {
            checkItems = checkItems.map(function (data, index) {
              data.type = 'OLD'
              return data
            })
          }
          draftEdit.checkItems = checkItems
          draftEdit.isCancel = nextProps.reviewData.resources[0].status === 'Cancelled' || false
          draftEdit.cancelReason = nextProps.reviewData.resources[0].reason || ''
          this.props.setDraftEditData(draftEdit)
        } else {
          console.log('else', nextProps.reviewData)
        }
      }
      if (nextProps.componentTypeProperties && nextProps.componentTypeProperties !== '' && nextProps.componentTypeProperties !== this.props.componentTypeProperties) {
        if (nextProps.componentTypeProperties.error_code === null) {
          // let propertiesData = nextProps.componentTypeProperties.resources[0].properties
          let reviewProperties = {...this.props.reviewProperties}
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let categoryPropertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review~Review Category'
          }), 'component_type_property')
          let stagePropertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review~Stage'
          }), 'component_type_property')
          if (nextProps.componentTypeProperties.resources.length > 0) {
            nextProps.componentTypeProperties.resources.forEach(function (data, index) {
              console.log('data-------------', data)
              let category = _.result(_.find(data.properties, function (obj) {
                return obj.id === categoryPropertyId
              }), 'value_set')
              console.log('valueset ----', category)
              if (category) {
                console.log(category.values, 'inside if')
                reviewProperties.category = category.values || []
               //  this.props.setCategoryData(valueSet.values)
              }
              let stages = _.result(_.find(data.properties, function (obj) {
                return obj.id === stagePropertyId
              }), 'value_set')
              console.log('valueset ----', stages)
              if (stages) {
                console.log(stages.values, 'inside if stages')
                reviewProperties.stages = stages.values || []
               //  this.props.setCategoryData(valueSet.values)
              }
            })
          }
          this.props.setReviewProperty && this.props.setReviewProperty(reviewProperties)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }
      if (nextProps.updateReviewResponse && nextProps.updateReviewResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateReviewResponse.error_code === null) {
          // this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully updated Review Id' +  nextProps.updateReviewResponse.resources[0].review_id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateReviewResponse.error_message, nextProps.updateReviewResponse.error_code)
        }
        this.props.resetResponse()
        this.props.history.push('/reviews')
      }
      if (nextProps.connectArtefactResponse && nextProps.connectArtefactResponse !== '') {
        let connectArtefactSettings = {...this.props.connectArtefactSettings, 'isModalOpen': false}
          this.props.setConnectArtefactSettings(connectArtefactSettings)
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.connectArtefactResponse.error_code === null) {
          let payload = {
            'review_id': this.props.match.params.id
          }
          this.props.fetchReviewById && this.props.fetchReviewById(payload)
          // this.props.fetchUsers && this.props.fetchUsers()
          let connectArtefactOperation = localStorage.getItem('connectArtefact')
          // eslint-disable-next-line
          toastr.success('Successfully ' + connectArtefactOperation + ' Artefact ', 'Nice!')
          localStorage.removeItem('connectArtefact')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.connectArtefactResponse.error_message, nextProps.connectArtefactResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.connectArtefactSettings && nextProps.connectArtefactSettings.selectedRelations !== null && nextProps.connectArtefactSettings.selectedRelations !== this.props.connectArtefactSettings.selectedRelations) {
        let componentTypeId = nextProps.connectArtefactSettings.selectedRelations.target_component_type.id
        this.props.fetchReviewArtefacts && this.props.fetchReviewArtefacts(componentTypeId)
      }
      if (nextProps.reviewData !== '' && nextProps.reviewProperties && nextProps.reviewProperties.category && nextProps.reviewProperties.category.length > 0 && nextProps.users.resources.length > 0 && nextProps.firstLoad) {
        console.log('inside if -----------------------------------reviewProperties', nextProps, nextProps.reviewData)
        if (nextProps.reviewData && nextProps.reviewData !== null & nextProps.reviewData.error_code === null) {
          let defaultCategoryId = nextProps.reviewData.resources[0].review_category_id
          let defaultCategoryObject = _.find(nextProps.reviewProperties.category, function (obj) {
            return obj.id === defaultCategoryId
          })
          console.log('defaultcategoryObject', defaultCategoryObject)
          defaultCategoryObject = defaultCategoryObject || null
          if (defaultCategoryObject) {
            defaultCategoryObject.label = defaultCategoryObject.name
            nextProps.setSelectedCategory(defaultCategoryObject)
            nextProps.setFirstLoad(false)
          }
          let reviewerId = nextProps.reviewData.resources[0].reviewer_id
          let defaultReviewerObject = _.find(nextProps.users.resources, function (obj) {
            return obj.id === reviewerId
          })
          console.log('defaultReviewerObject', defaultReviewerObject)
          defaultReviewerObject = defaultReviewerObject || null
          if (defaultReviewerObject) {
            defaultReviewerObject.label = defaultReviewerObject.first_name + ' ' + defaultReviewerObject.last_name
            nextProps.setSelectedReviewer(defaultReviewerObject)
            nextProps.setFirstLoad(false)
          }
          let approverId = nextProps.reviewData.resources[0].approver_id
          let defaultApproverObject = _.find(nextProps.users.resources, function (obj) {
            return obj.id === approverId
          })
          console.log('defaultApproverObject', defaultApproverObject)
          defaultApproverObject = defaultApproverObject || null
          if (defaultApproverObject) {
            defaultApproverObject.label = defaultApproverObject.first_name + ' ' + defaultApproverObject.last_name
            nextProps.setSelectedApprover(defaultApproverObject)
            nextProps.setFirstLoad(false)
          }
        }
      }
      // if (nextProps.selectedCategory && nextProps.selectedCategory !== null) {
      //   console.log('00000000000000000000', nextProps)
      //   alert(JSON.parse(this.props.selectedCategory))
      // }
    }
  })
)(ReviewDraft)
