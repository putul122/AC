import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SignUp from '../../components/signUp/signUpComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as signUpActionCreators } from '../../redux/reducers/signUpReducer/signUpReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.signUpReducer.isLoggedin,
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    clientAccessToken: state.basicReducer.clientAccessToken,
    createUserResponse: state.signUpReducer.createUserResponse,
    createUserProcess: state.signUpReducer.createUserProcess
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  createUser: sagaActions.signUpActions.createUser,
  setCreateUserProcessStatus: signUpActionCreators.setCreateUserProcessStatus,
  toggleFlipInX: basicActionCreators.toggleFlipInX
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
    componentDidMount: function () {},
    componentWillReceiveProps (nextProps) {
      console.log('next props', nextProps)
      if (nextProps.isLoggedin) {
        localStorage.setItem('isLoggedin', nextProps.isLoggedin)
      }
      if (nextProps.createUserResponse) {
        if (!nextProps.createUserResponse.error_code) {
          localStorage.setItem('userAccessToken', nextProps.createUserResponse.resources[0]['access_token'])
          localStorage.setItem('isLoggedin', true)
          // this.props.history.push('/registering')
          // eslint-disable-next-line
          toastr.success('You are logged in', 'Success !')
          this.props.history.push('/dashboard')
          // window.location.href = window.location.origin + '/dashboard'
        } else {
          // eslint-disable-next-line
          // toastr.error(nextProps.createUserResponse.error_message, nextProps.createUserResponse.error_code)
          // window.location.href = window.location.origin
        }
        if (nextProps.createUserResponse !== this.props.createUserResponse) {
          this.props.setCreateUserProcessStatus(false)
        }
      }
    }
  })
)(SignUp)
