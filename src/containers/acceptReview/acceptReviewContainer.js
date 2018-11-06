import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import AcceptReview from '../../components/acceptReview/acceptReviewComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
// import { actionCreators } from '../../redux/reducers/applicationsReducer/applicationsReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser
    // applicationSummary: state.applicationsReducer.applicationSummary,
    // application: state.applicationsReducer.application,
    // applicationSoftwares: state.applicationsReducer.applicationSoftwares,
    // currentPage: state.applicationsReducer.currentPage,
    // expandSettings: state.applicationsReducer.expandSettings,
    // businessUnits: state.applicationsReducer.businessUnits,
    // defaultSelect: state.applicationsReducer.defaultSelect,
    // perPage: state.applicationsReducer.perPage
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  // fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  // fetchApplicationsSummary: sagaActions.applicationActions.fetchApplicationsSummary,
  // fetchApplications: sagaActions.applicationActions.fetchApplications,
  // fetchApplicationSoftwares: sagaActions.applicationActions.fetchApplicationSoftwares,
  // setCurrentPage: actionCreators.setCurrentPage,
  // setPerPage: actionCreators.setPerPage,
  // setExpandSettings: actionCreators.setExpandSettings,
  // resetResponse: actionCreators.resetResponse,
  // fetchBusinessUnits: sagaActions.basicActions.fetchBusinessUnits,
  // setDefaultSelect: actionCreators.setDefaultSelect
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
      },
    componentDidMount: function () {
      },
    componentWillReceiveProps: function (nextProps) {
      console.log('****', nextProps)
      }
  })
)(AcceptReview)
