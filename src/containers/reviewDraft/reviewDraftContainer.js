import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import ReviewDraft from '../../components/reviewDraft/reviewDraftComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewDraftReducer/reviewDraftReducerReducer'

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
    updatePayload: state.reviewDraftReducer.updatePayload
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
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  fetchReviewArtefacts: sagaActions.reviewActions.fetchReviewArtefacts,
  updateReviews: sagaActions.reviewActions.updateReviews,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
  fetchcomponentTypeRelations: sagaActions.basicActions.fetchcomponentTypeRelations,
  updateComponentRelationships: sagaActions.basicActions.updateComponentRelationships
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {
        'review_id': this.props.match.params.id
      }
      this.props.fetchReviewById && this.props.fetchReviewById(payload)
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeIdForComponents = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Check Item'
      }), 'component_type')
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeIdForComponents)
      let componentTypeIdForRelations = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Review'
      }), 'component_type')
      this.props.fetchcomponentTypeRelations && this.props.fetchcomponentTypeRelations(componentTypeIdForRelations)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
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
      if (nextProps.reviewData && nextProps.reviewData !== '' && nextProps.reviewData !== this.props.reviewData) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (!nextProps.reviewData.errorCode && nextProps.reviewData.resources && nextProps.reviewData.resources.length > 0) {
          let draftEdit = {...this.props.draftEdit}
          draftEdit.name = nextProps.reviewData.resources[0].name
          draftEdit.description = nextProps.reviewData.resources[0].description
          draftEdit.category = nextProps.reviewData.resources[0].review_category
          draftEdit.reviewer = nextProps.reviewData.resources[0].reviewer
          draftEdit.approver = nextProps.reviewData.resources[0].approver
          draftEdit.checkItems = nextProps.reviewData.resources[0].check_items
          draftEdit.isCancel = nextProps.reviewData.resources[0].cancel_reason !== null || false
          draftEdit.cancelReason = nextProps.reviewData.resources[0].cancel_reason
          this.props.setDraftEditData(draftEdit)
        }
      }
      if (nextProps.updateReviewResponse && nextProps.updateReviewResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateReviewResponse.error_code === null) {
          // this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully updated Review ' +  nextProps.updateReviewResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateReviewResponse.error_message, nextProps.updateReviewResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.connectArtefactResponse && nextProps.connectArtefactResponse !== '') {
        let connectArtefactSettings = {...this.props.connectArtefactSettings, 'isModalOpen': false}
          this.props.setConnectArtefactSettings(connectArtefactSettings)
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.connectArtefactResponse.error_code === null) {
          // this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully updated Review ' +  nextProps.connectArtefactResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.connectArtefactResponse.error_message, nextProps.connectArtefactResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.connectArtefactSettings && nextProps.connectArtefactSettings.selectedRelations !== null && nextProps.connectArtefactSettings.selectedRelations !== this.props.connectArtefactSettings.selectedRelations) {
        let componentTypeIdForArtefact = nextProps.connectArtefactSettings.selectedRelations.id
        this.props.fetchReviewArtefacts && this.props.fetchReviewArtefacts(componentTypeIdForArtefact)
      }
    }
  })
)(ReviewDraft)
