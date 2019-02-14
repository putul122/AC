import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Attachments from '../../components/attachments/attachmentsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as attachmentsActionCreators } from '../../redux/reducers/attachmentsReducer/attachmentsReducerReducer'
// import { actionCreators } from '../../redux/reducers/rolesReducer/rolesReducerReducer'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    //   modalIsOpen: state.basicReducer.modalIsOpen
    attachments: state.attachmentsReducer.attachments,
    attachmentsActionSettings: state.attachmentsReducer.attachmentsActionSettings,
    createAttachmentResponse: state.attachmentsReducer.createAttachmentResponse,
    deleteAttachmentResponse: state.attachmentsReducer.deleteAttachmentResponse,
    updateAttachmentResponse: state.attachmentsReducer.updateAttachmentResponse,
    attachmentData: state.attachmentsReducer.attachmentData,
    updateAttachmentValue: state.attachmentsReducer.updateAttachmentValue
   }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchAttachments: sagaActions.attachmentsActions.fetchAttachments,
  setAttachmentsActionSettings: attachmentsActionCreators.setAttachmentsActionSettings,
  createAttachments: sagaActions.attachmentsActions.createAttachments,
  deleteAttachment: sagaActions.attachmentsActions.deleteAttachment,
  updateAttachment: sagaActions.attachmentsActions.updateAttachment,
  fetchAttachmentById: sagaActions.attachmentsActions.fetchAttachmentById,
  resetResponse: attachmentsActionCreators.resetResponse,
  setUpdateAttachmentValue: attachmentsActionCreators.setUpdateAttachmentValue
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
// eslint-disable-next-line
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      // this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      // // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let contextId = ''
      // let TypeKey = this.props.TypeKey
      if (this.props.type === 'Component') {
        contextId = this.props.match.params.id
      }
      let payload = {
        'context_type_key': this.props.type,
        'context_id': contextId
      }
      this.props.fetchAttachments && this.props.fetchAttachments(payload)
    },
    componentDidMount: function () {
      // eslint-disable-next-line
      $('[data-toggle="m-tooltip"]').tooltip()
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
      console.log('&*&*&', nextProps)
    //   if (nextProps.packages && nextProps.packages !== this.props.packages) {
    //     localStorage.setItem('packages', JSON.stringify(nextProps.packages))
    //   }
      let contextId = ''
      if (this.props.type === 'Component') {
        contextId = this.props.match.params.id
      }
      let payload = {
        'context_type_key': this.props.type,
        'context_id': contextId
      }
      if (nextProps.createAttachmentResponse && nextProps.createAttachmentResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.createAttachmentResponse.error_code === null) {
          this.props.fetchAttachments && this.props.fetchAttachments(payload)
          // eslint-disable-next-line
          toastr.success('The Attachment' +  nextProps.createAttachmentResponse.resources[0].name  +  ' added' , 'Nice!')
        } else {
          // eslint-disable-next-line
          toastr.error(nextProps.createAttachmentResponse.error_message, nextProps.createAttachmentResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.deleteAttachmentResponse && nextProps.deleteAttachmentResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.deleteAttachmentResponse.error_code === null) {
          this.props.fetchAttachments && this.props.fetchAttachments(payload)
          // eslint-disable-next-line
          toastr.success('The Attachment' + nextProps.deleteAttachmentResponse.resources[0].name + 'is successfully deleted', 'Zapped')
          } else {
          // eslint-disable-next-line
          toastr.error(nextProps.deleteAttachmentResponse.error_message, nextProps.deleteAttachmentResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.updateAttachmentResponse && nextProps.updateAttachmentResponse !== '') {
        // eslint-disable-next-line
        mApp && mApp.unblockPage()
        if (nextProps.updateAttachmentResponse.error_code === null) {
          this.props.fetchAttachments && this.props.fetchAttachments(payload)
          // eslint-disable-next-line
          toastr.success(' The Attachment ' +  nextProps.updateAttachmentResponse.resources[0].name +  ' is successfully updated ', 'Nice')
          } else {
          // eslint-disable-next-line
          toastr.error(nextProps.updateAttachmentResponse.error_message, nextProps.updateAttachmentResponse.error_code)
        }
        this.props.resetResponse()
      }
      if (nextProps.attachmentsActionSettings.updateAttachmentData && nextProps.attachmentsActionSettings.updateAttachmentData !== '' && nextProps.attachmentsActionSettings.updateAttachmentData !== this.props.attachmentsActionSettings.updateAttachmentData) {
        let updateAttachmentValue = this.props.updateAttachmentValue
        updateAttachmentValue.name = nextProps.attachmentsActionSettings.updateAttachmentData.name || ''
        this.props.setUpdateAttachmentValue(updateAttachmentValue)
      }
    }
  })
)(Attachments)
