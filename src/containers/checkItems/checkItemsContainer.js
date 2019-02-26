import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import CheckItems from '../../components/checkItems/checkItemsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import _ from 'lodash'
import { actionCreators } from '../../redux/reducers/checkItemsReducer/checkItemsReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    tags: state.checkItemsReducer.tags,
    modalIsOpen: state.basicReducer.modalIsOpen,
    componentTypeComponents: state.basicReducer.componentTypeComponents,
    checkitems: state.checkItemsReducer.checkitems,
    currentPage: state.checkItemsReducer.currentPage,
    perPage: state.checkItemsReducer.perPage,
    filterSettings: state.checkItemsReducer.filterSettings
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentTypeComponents: sagaActions.basicActions.fetchComponentTypeComponents,
  fetchCheckItems: sagaActions.checkitemActions.fetchCheckItems,
  setCurrentPage: actionCreators.setCurrentPage,
  setPerPage: actionCreators.setPerPage,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  fetchTags: sagaActions.reviewActions.fetchTags,
  setFilterSettings: actionCreators.setFilterSettings
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
      console.log('my props', this.props)
      this.props.fetchTags && this.props.fetchTags()
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let appPackage = JSON.parse(localStorage.getItem('packages'))
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Check Item'
      }), 'component_type')
      console.log('component_type iddddd', componentTypeId)
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(componentTypeId)
      let payload = {
        'search': '',
        'page_size': 10,
        'page': 1
      }
      this.props.fetchCheckItems && this.props.fetchCheckItems(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
      // eslint-disable-next-line
      mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
     },
     componentWillReceiveProps: function (nextProps) {
      console.log('component will receive props', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.checkitems && nextProps.checkitems !== this.props.checkitems) {
        // eslint-disable-next-line
        mApp && mApp.unblock('#entitlementList')
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
        // eslint-disable-next-line
        mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
        }
        this.props.fetchCheckItems && this.props.fetchCheckItems(payload)
      }
      if (nextProps.filterSettings.callApi) {
        console.log('search call api')
        nextProps.setCurrentPage(1)
        let filterSettings = {...nextProps.filterSettings}
        filterSettings.callApi = false
        let payload = {
          'search': '',
          'page_size': nextProps.perPage,
          'page': 1
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
        this.props.fetchCheckItems && this.props.fetchCheckItems(payload)
        // eslint-disable-next-line
        mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        nextProps.setFilterSettings(filterSettings)
      }
    }
  })
)(CheckItems)
