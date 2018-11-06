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

export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      console.log('dashboard', this.props)
      this.props.fetchPackage && this.props.fetchPackage()
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      this.props.fetchReviewsSummary && this.props.fetchReviewsSummary()
    },
    componentDidMount: function () {
      // // eslint-disable-next-line
      // mApp.block('#supplierSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp.block('#applicationSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp.block('#entitlementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
    }
  })
)(Dashboard)
