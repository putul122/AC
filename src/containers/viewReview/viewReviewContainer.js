import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ViewReview from '../../components/viewReview/viewReviewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators as checkItemModalActionCreators } from '../../redux/reducers/checkItemModalReducer/checkItemModalReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewbyId: state.viewReviewReducer.reviewbyId
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  // fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
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
      mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.reviewbyId && nextProps.reviewbyId !== '' && nextProps.reviewbyId !== this.props.reviewbyId) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.reviewbyId.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.reviewbyId.error_message, nextProps.reviewbyId.error_code)
        }
      }
    }
 })
)(ViewReview)
