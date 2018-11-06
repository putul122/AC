import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ViewReview from '../../components/viewReview/viewReviewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/viewReviewReducer/viewReviewReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    // agreements: state.viewReviewReducer.agreements,
    // agreementsSummary: state.viewReviewReducer.agreementsSummary,
    // currentPage: state.viewReviewReducer.currentPage,
    // addAgreementSettings: state.agreementDetailReducer.addAgreementSettings,
    // addAgreementResponse: state.agreementDetailReducer.addAgreementResponse,
    // perPage: state.viewReviewReducer.perPage,
    modalIsOpen: state.basicReducer.modalIsOpen,
    principlemodalIsOpen: state.viewReviewReducer.principlemodalIsOpen,
    standardmodalIsOpen: state.viewReviewReducer.standardmodalIsOpen,
    reviewbyId: state.viewReviewReducer.reviewbyId
    // standardmodalIsOpen: state.
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  // fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  // fetchAgreements: sagaActions.agreementActions.fetchAgreements,
  // fetchAgreementsSummary: sagaActions.agreementActions.fetchAgreementsSummary,
  // addAgreement: sagaActions.agreementActions.addAgreement,
  // setCurrentPage: actionCreators.setCurrentPage,
  // setPerPage: actionCreators.setPerPage,
  // setAddAgreementSettings: actionCreators.setAddAgreementSettings
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setPrincipleModalOpenStatus: actionCreators.setPrincipleModalOpenStatus,
  setStandardModalOpenStatus: actionCreators.setStandardModalOpenStatus
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
    }
  })
)(ViewReview)
