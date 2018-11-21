import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Dashboard from '../../components/dashboard/dashboardComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/dashboardReducer/dashboardReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewsSummary: state.dashboardReducer.reviewsSummary,
    packages: state.basicReducer.packages
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchReviewsSummary: sagaActions.reviewActions.fetchReviewsSummary,
  fetchPackage: sagaActions.basicActions.fetchPackage
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
      this.props.fetchPackage && this.props.fetchPackage()
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      this.props.fetchReviewsSummary && this.props.fetchReviewsSummary()
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp.block('#supplierSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.packages && nextProps.packages !== this.props.packages) {
        localStorage.setItem('packages', JSON.stringify(nextProps.packages))
      }
      if (nextProps.reviewsSummary && nextProps.reviewsSummary !== '' && nextProps.reviewsSummary !== this.props.reviewsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.reviewsSummary.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.reviewsSummary.error_message, nextProps.reviewsSummary.error_code)
        }
      }
    }
  })
)(Dashboard)
