import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Reviews from '../../components/reviews/reviewsComponent'
import _ from 'lodash'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewsReducer/reviewsReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponents: state.basicReducer.componentTypeComponents,
    addReviewSettings: state.reviewsReducer.addReviewSettings,
    reviews: state.reviewsReducer.reviews,
    reviewsSummary: state.reviewsReducer.reviewsSummary,
    currentPage: state.reviewsReducer.currentPage,
    perPage: state.reviewsReducer.perPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
  setAddReviewSettings: actionCreators.setAddReviewSettings,
  fetchReviewsSummary: sagaActions.reviewActions.fetchReviewsSummary,
  fetchReviews: sagaActions.reviewActions.fetchReviews,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage
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
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Review'
      }), 'component_type')
      console.log('component_type iddddd', componentTypeId)
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeId)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchReviews && this.props.fetchReviews(payload)
      this.props.fetchReviewsSummary && this.props.fetchReviewsSummary()
    },
    componentDidMount: function () {
     // eslint-disable-next-line
     mApp && mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
     // eslint-disable-next-line
     mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.reviews && nextProps.reviews !== this.props.reviews) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareList')
      }
      if (nextProps.reviewsSummary && nextProps.reviewsSummary !== this.props.reviewsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareSummary')
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        // eslint-disable-next-line
        mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchReviews && this.props.fetchReviews(payload)
      }
    }
  })
)(Reviews)
