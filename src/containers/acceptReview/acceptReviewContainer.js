import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import _ from 'lodash'
import AcceptReview from '../../components/acceptReview/acceptReviewComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/acceptReviewReducer/acceptReviewReducerReducer'
import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
import { actionCreators as checkItemModalActionCreators } from '../../redux/reducers/checkItemModalReducer/checkItemModalReducerReducer'
import { actionCreators as componentModalViewActionCreators } from '../../redux/reducers/componentModalViewReducer/componentModalViewReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    reviewData: state.acceptReviewReducer.reviewData,
    isAccepeted: state.acceptReviewReducer.isAccepeted,
    updateReviewResponse: state.acceptReviewReducer.updateReviewResponse,
    notAcceptedReason: state.acceptReviewReducer.notAcceptedReason,
    validationClass: state.acceptReviewReducer.validationClass,
    componentTypeProperties: state.acceptReviewReducer.componentTypeProperties,
    reviewProperties: state.acceptReviewReducer.reviewProperties,
    createDiscussionResponse: state.acceptReviewReducer.createDiscussionResponse
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchReviewById: sagaActions.reviewActions.fetchReviewById,
  updateReviews: sagaActions.reviewActions.updateReviews,
  setAcceptance: actionCreators.setAcceptance,
  resetResponse: actionCreators.resetResponse,
  setNotAcceptedReason: actionCreators.setNotAcceptedReason,
  setValidationClass: actionCreators.setValidationClass,
  setReviewProperty: actionCreators.setReviewProperty,
  fetchComponentTypeProperties: sagaActions.basicActions.fetchComponentTypeProperties,
  createDiscussion: sagaActions.discussionActions.createDiscussion,
  setDiscussionModalOpenStatus: newDiscussionActionCreators.setDiscussionModalOpenStatus,
  setModalSetting: checkItemModalActionCreators.setModalSetting,
  setCheckItemData: checkItemModalActionCreators.setCheckItemData,
  setModalSettings: componentModalViewActionCreators.setModalSettings
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
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeIdForReview = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Review'
      }), 'component_type')
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForReview)
    },
    componentDidMount: function () {
       // eslint-disable-next-line
       $('[data-toggle="m-tooltip"]').tooltip()
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
          // eslint-disable-next-line
          toastr.success('Successfully updated Review ' +  nextProps.updateReviewResponse.resources[0].id , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateReviewResponse.error_message, nextProps.updateReviewResponse.error_code)
        }
        this.props.resetResponse()
        this.props.history.push('/reviews')
      }
      if (nextProps.componentTypeProperties && nextProps.componentTypeProperties !== '' && nextProps.componentTypeProperties !== this.props.componentTypeProperties) {
        if (nextProps.componentTypeProperties.error_code === null) {
          // let propertiesData = nextProps.componentTypeProperties.resources[0].properties
          let reviewProperties = {...this.props.reviewProperties}
          let appPackage = JSON.parse(localStorage.getItem('packages'))
          let componentTypeProperties = appPackage.resources[0].component_type_properties
          let categoryPropertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review~Review Category'
          }), 'component_type_property')
          let stagePropertyId = _.result(_.find(componentTypeProperties, function (obj) {
            return obj.key === 'Review~Stage'
          }), 'component_type_property')
          if (nextProps.componentTypeProperties.resources.length > 0) {
            nextProps.componentTypeProperties.resources.forEach(function (data, index) {
              console.log('data-------------', data)
              let category = _.result(_.find(data.properties, function (obj) {
                return obj.id === categoryPropertyId
              }), 'value_set')
              console.log('valueset ----', category)
              if (category) {
                console.log(category.values, 'inside if')
                reviewProperties.category = category.values || []
               //  this.props.setCategoryData(valueSet.values)
              }
              let stages = _.result(_.find(data.properties, function (obj) {
                return obj.id === stagePropertyId
              }), 'value_set')
              console.log('valueset ----', stages)
              if (stages) {
                console.log(stages.values, 'inside if stages')
                reviewProperties.stages = stages.values || []
               //  this.props.setCategoryData(valueSet.values)
              }
            })
          }
          this.props.setReviewProperty && this.props.setReviewProperty(reviewProperties)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.componentTypeProperties.error_message, nextProps.componentTypeProperties.error_code)
        }
      }
    }
  })
)(AcceptReview)
