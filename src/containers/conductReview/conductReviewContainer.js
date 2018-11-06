import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ConductReview from '../../components/conductReview/conductReviewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/usersReducer/usersReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {}
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication
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
      // this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // // eslint-disable-next-line
      // // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // let payload = {
      //   'search': '',
      //   'page_size': 10,
      //   'page': 1
      // }
      // this.props.fetchAgreements && this.props.fetchAgreements(payload)
      // this.props.fetchAgreementsSummary && this.props.fetchAgreementsSummary()
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      // if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
      //   if (!nextProps.authenticateUser.resources[0].result) {
      //     this.props.history.push('/')
      //   }
      // }
    }
  })
)(ConductReview)
