import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ReviewApproval from '../../components/reviewApproval/reviewApprovalComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewApprovalReducer/reviewApprovalReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewData: state.reviewApprovalReducer.reviewData,
    isApproved: state.reviewApprovalReducer.isApproved,
    updateReviewResponse: state.reviewApprovalReducer.updateReviewResponse,
    rejectedReason: state.reviewApprovalReducer.rejectedReason,
    validationClass: state.reviewApprovalReducer.validationClass
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  updateReviews: sagaActions.reviewActions.updateReviews,
  setApproval: actionCreators.setApproval,
  resetResponse: actionCreators.resetResponse,
  setRejectedReason: actionCreators.setRejectedReason,
  setValidationClass: actionCreators.setValidationClass,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus
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
        if (nextProps.reviewData.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.reviewData.error_message, nextProps.reviewData.error_code)
        }
      }
      if (nextProps.updateReviewResponse && nextProps.updateReviewResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateReviewResponse.error_code === null) {
          // this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully updated Review ID' +  nextProps.updateReviewResponse.resources[0].review_id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateReviewResponse.error_message, nextProps.updateReviewResponse.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(ReviewApproval)
