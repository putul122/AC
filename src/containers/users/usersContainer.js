import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Users from '../../components/users/usersComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/usersReducer/usersReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    authenticateUser: state.basicReducer.authenticateUser,
    externalUsers: state.usersReducer.externalUsers,
    users: state.usersReducer.users,
    copyUsers: state.usersReducer.copyUsers,
    selectedUser: state.usersReducer.selectedUser,
    roles: state.usersReducer.roles,
    userRoles: state.usersReducer.userRoles,
    updatePayload: state.usersReducer.updatePayload,
    getUserResponse: state.usersReducer.getUserResponse,
    createUserResponse: state.usersReducer.createUserResponse,
    updateUserResponse: state.usersReducer.updateUserResponse,
    deleteUserResponse: state.usersReducer.deleteUserResponse,
    userActionSettings: state.usersReducer.userActionSettings,
    currentPage: state.usersReducer.currentPage,
    perPage: state.usersReducer.perPage,
    totalCount: state.usersReducer.totalCount
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchExUsers: sagaActions.userActions.fetchExUsers,
  fetchUsers: sagaActions.userActions.fetchUsers,
  fetchUser: sagaActions.userActions.fetchUser,
  updateUser: sagaActions.userActions.updateUser,
  deleteUser: sagaActions.userActions.deleteUser,
  addUser: sagaActions.userActions.addUser,
  fetchRoles: sagaActions.basicActions.fetchRoles,
  setPerPage: actionCreators.setPerPage,
  setCurrentPage: actionCreators.setCurrentPage,
  setUserActionSettings: actionCreators.setUserActionSettings,
  setRoleData: actionCreators.setRoleData,
  setUpdatePayload: actionCreators.setUpdatePayload,
  resetResponse: actionCreators.resetResponse,
  setUsersData: actionCreators.setUsersData
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
      this.props.fetchExUsers && this.props.fetchExUsers()
      this.props.fetchUsers && this.props.fetchUsers()
      this.props.fetchRoles && this.props.fetchRoles()
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      // mApp && mApp.block('#agreementSummary', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // // eslint-disable-next-line
      // mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.getUserResponse && nextProps.getUserResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.getUserResponse.error_code === null) {
          let payload = {}
          payload.users = nextProps.getUserResponse.resources
          payload.copyUsers = nextProps.getUserResponse.resources
          payload.totalCount = nextProps.getUserResponse.total_count
          nextProps.setUsersData(payload)
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.getUserResponse.error_message, nextProps.getUserResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.createUserResponse && nextProps.createUserResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let userActionSettings = {...this.props.userActionSettings, 'isAddModalOpen': false, 'selectedUser': null, 'selectedEmail': ''}
        this.props.setUserActionSettings(userActionSettings)
        if (nextProps.createUserResponse.error_code === null) {
          this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('User ' +  nextProps.createUserResponse.resources[0].first_name  +  ' added' , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createUserResponse.error_message, nextProps.createUserResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.deleteUserResponse && nextProps.deleteUserResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let userActionSettings = {...this.props.userActionSettings, 'isDeleteModalOpen': false, 'deleteUserData': ''}
        this.props.setUserActionSettings(userActionSettings)
        if (nextProps.deleteUserResponse.error_code === null) {
          this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully deleted user ' +  nextProps.deleteUserResponse.resources[0].first_name , 'Removed')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteUserResponse.error_message, nextProps.deleteUserResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateUserResponse && nextProps.updateUserResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        let userActionSettings = {...this.props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
        this.props.setUserActionSettings(userActionSettings)
        if (nextProps.updateUserResponse.error_code === null) {
          this.props.fetchUsers && this.props.fetchUsers()
          // eslint-disable-next-line
          toastr.success('Successfully updated user ' +  nextProps.updateUserResponse.resources[0].first_name , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateUserResponse.error_message, nextProps.updateUserResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
        this.props.setCurrentPage(1)
      }
    }
  })
)(Users)
