import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ReviewArtefactData from '../../components/reviewArtefact/reviewArtefactComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/reviewArtefactReducer/reviewArtefactReducerReducer'
// import _ from 'lodash'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewData: state.reviewArtefactReducer.reviewData,
    reviewArtefactPropertiesdata: state.reviewArtefactReducer.reviewArtefactPropertiesdata,
    reviewArtefactRelationshipsdata: state.reviewArtefactReducer.reviewArtefactRelationshipsdata,
    showTabs: state.reviewArtefactReducer.showTabs,
    componentTypeComponentData: state.reviewArtefactReducer.componentTypeComponentData
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  fetchReviewArtefactProperties: sagaActions.basicActions.fetchReviewArtefactProperties,
  fetchReviewArtefactRelationships: sagaActions.basicActions.fetchReviewArtefactRelationships,
  fetchComponentTypeComponent: sagaActions.basicActions.fetchComponentTypeComponent,
  setCurrentTab: actionCreators.setCurrentTab
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
      console.log('****props', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // let contextId = ''
      // let TypeKey = this.props.TypeKey
      // if (this.props.type === 'Component') {
      //   contextId = this.props.match.params.id
      // } else {
      //   let appPackage = JSON.parse(localStorage.getItem('packages'))
      //   let componentTypes = appPackage.resources[0].component_types
      //   let componentId = _.result(_.find(componentTypes, function (obj) {
      //       return obj.key === TypeKey
      //   }), 'component_type_property')
      //   contextId = componentId
      // }
      let artefectdatapayload = {
        'component_id': this.props.match.params.id
      }
      this.props.fetchComponentTypeComponent && this.props.fetchComponentTypeComponent(artefectdatapayload)
      let payload = {
        'review_artefact_id': this.props.match.params.id
      }
      this.props.fetchReviewArtefactProperties && this.props.fetchReviewArtefactProperties(payload)
      this.props.fetchReviewArtefactRelationships && this.props.fetchReviewArtefactRelationships(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('******', nextProps)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    }
  })
)(ReviewArtefactData)
