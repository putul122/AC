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
    perPage: state.reviewsReducer.perPage,
    existingReviewNames: state.reviewsReducer.existingReviewNames,
    checkValidity: state.reviewsReducer.checkValidity,
    reviewProperties: state.reviewsReducer.reviewProperties,
    filterSettings: state.reviewsReducer.filterSettings,
    componentTypeProperties: state.reviewsReducer.componentTypeProperties,
    tags: state.reviewsReducer.tags,
    selectedTags: state.reviewsReducer.selectedTags
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
  verifyName: sagaActions.reviewActions.verifyName,
  fetchTags: sagaActions.reviewActions.fetchTags,
  fetchComponentTypeProperties: sagaActions.basicActions.fetchComponentTypeProperties,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  resetResponse: actionCreators.resetResponse,
  setCheckValidity: actionCreators.setCheckValidity,
  setReviewProperty: actionCreators.setReviewProperty,
  setFilterSettings: actionCreators.setFilterSettings,
  setSelectedTags: actionCreators.setSelectedTags,
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
      let componentTypeIdForReview = _.result(_.find(componentTypes, function (obj) {
        return obj.key === 'Review'
      }), 'component_type')
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeId)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchReviews && this.props.fetchReviews(payload)
      this.props.fetchReviewsSummary && this.props.fetchReviewsSummary()
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchComponentTypeProperties && this.props.fetchComponentTypeProperties(componentTypeIdForReview)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip() 
     // eslint-disable-next-line
     mApp && mApp.block('#softwareSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
     // eslint-disable-next-line
     mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidUpdate: function () {
      // eslint-disable-next-line
      var tooltips = $('.tooltip').not('.in')
      if (tooltips) {
        tooltips.remove()
      }
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
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
      if (nextProps.existingReviewNames && nextProps.existingReviewNames !== '' && nextProps.checkValidity) {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let addReviewSettings = {...this.props.addReviewSettings}
        if (nextProps.existingReviewNames.error_code === null) {
          let existingReviewNames = nextProps.existingReviewNames.resources
          let enterReviewName = addReviewSettings.reviewName
          let found = _.find(nextProps.existingReviewNames.resources, function (obj) { return obj.name.toLowerCase() === enterReviewName })
          console.log('existingReviewNames', existingReviewNames)
          console.log('enterReviewName', enterReviewName)
          console.log('found', found)
          addReviewSettings.showValidation = true
          if (found) {
            addReviewSettings.message = enterReviewName + ' name already exist'
            addReviewSettings.color = {color: 'red'}
            addReviewSettings.toAdd = false
          } else {
            addReviewSettings.message = 'Valid Name'
            addReviewSettings.color = {color: 'green'}
            addReviewSettings.toAdd = true
          }
          nextProps.setAddReviewSettings(addReviewSettings)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.existingReviewNames.error_message, nextProps.existingReviewNames.error_code)
        }
        nextProps.setCheckValidity(false)
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
      if (nextProps.filterSettings.callApi) {
        console.log('search call api')
        nextProps.setCurrentPage(1)
        let filterSettings = {...nextProps.filterSettings}
        filterSettings.callApi = false
        let statges = nextProps.reviewProperties.stages
        let stageIndex = 0
        let payload = {
          'search': '',
          'page_size': 10,
          'page': 1
        }
        if (filterSettings.myTask) {
          payload.current_user = filterSettings.myTask
        }
        if (filterSettings.Draft) {
          let draftId = _.result(_.find(statges, function (obj) {
            return obj.name === 'Draft'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = draftId
        }
        if (filterSettings.Approval) {
          let approvalId = _.result(_.find(statges, function (obj) {
            return obj.name === 'Approval'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = approvalId
        }
        if (filterSettings.Acceptance) {
          let acceptanceId = _.result(_.find(statges, function (obj) {
            return obj.name === 'Acceptance'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = acceptanceId
        }
        if (filterSettings.InProgress) {
          let inProgressId = _.result(_.find(statges, function (obj) {
            return obj.name === 'In Progress'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = inProgressId
        }
        if (filterSettings.Completed) {
          let completedId = _.result(_.find(statges, function (obj) {
            return obj.name === 'Completed'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = completedId
        }
        if (filterSettings.Cancelled) {
          let cancelledId = _.result(_.find(statges, function (obj) {
            return obj.name === 'Cancelled'
          }), 'id')
          payload['stage_ids[' + stageIndex++ + ']'] = cancelledId
        }
        if (filterSettings.selectedCategory) {
          payload['category_ids[0]'] = filterSettings.selectedCategory.id
        }
        if (filterSettings.selectedTags) {
          let search = ''
          let tagLength = filterSettings.selectedTags.length
          if (tagLength > 0) {
            filterSettings.selectedTags.forEach(function (data, index) {
              search = search + '#' + data.value
              if (index !== tagLength - 1) {
                search = search + ' '
              }
            })
          }
          console.log('search', search)
          payload.search = search
        }
        nextProps.fetchReviews(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        nextProps.setFilterSettings(filterSettings)
      }
    }
  })
)(Reviews)
