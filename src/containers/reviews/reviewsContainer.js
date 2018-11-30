import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Reviews from '../../components/reviews/reviewsComponent'
import _ from 'lodash'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewsReducer/reviewsReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponents: state.basicReducer.componentTypeComponents,
    createReviewResponse: state.reviewsReducer.createReviewResponse,
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
  createReviews: sagaActions.reviewActions.createReviews,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  resetResponse: actionCreators.resetResponse,
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
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Review Template'
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
      console.log('component will receive props', nextProps)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.reviews && nextProps.reviews !== this.props.reviews) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareList')
        if (nextProps.reviews.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.reviews.error_message, nextProps.reviews.error_code)
        }
      }
      if (nextProps.reviewsSummary && nextProps.reviewsSummary !== this.props.reviewsSummary) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#softwareSummary')
        if (nextProps.reviewsSummary.error_code !== null) {
          // eslint-disable-next-line
          toastr.error(nextProps.reviewsSummary.error_message, nextProps.reviewsSummary.error_code)
        }
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchReviews && this.props.fetchReviews(payload)
      }
      if (nextProps.createReviewResponse && nextProps.createReviewResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let addReviewSettings = {...this.props.addReviewSettings, 'isModalOpen': false, 'templateSelected': null}
        this.props.setAddReviewSettings(addReviewSettings)
        if (nextProps.createReviewResponse.error_code === null) {
          this.props.fetchReviews && this.props.fetchReviews(payload)
          // eslint-disable-next-line
          toastr.success('New Review added' , 'Nice!')
          this.props.history.push('/review_draft/' + nextProps.createReviewResponse.resources[0].id)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createReviewResponse.error_message, nextProps.createReviewResponse.error_code)
        }
        this.props.resetResponse()
      }
    }
  })
)(Reviews)
