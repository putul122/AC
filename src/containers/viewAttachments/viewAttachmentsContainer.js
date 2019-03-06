import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ViewAttachments from '../../components/viewAttachments/viewAttachmentsComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as viewAttachmentsActionCreators } from '../../redux/reducers/viewAttachmentsReducer/viewAttachmentsReducerReducer'
// import { actionCreators } from '../../redux/reducers/rolesReducer/rolesReducerReducer'
// import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// import { actionCreators as newDiscussionActionCreators } from '../../redux/reducers/newDiscussionReducer/newDiscussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    //   modalIsOpen: state.basicReducer.modalIsOpen
    attachments: state.viewAttachmentsReducer.attachments,
    attachmentById: state.viewAttachmentsReducer.attachmentById,
    downloadAttachmentSettings: state.viewAttachmentsReducer.downloadAttachmentSettings
    }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchAttachments: sagaActions.attachmentsActions.fetchAttachments,
  fetchAttachmentById: sagaActions.attachmentsActions.fetchAttachmentById,
  resetResponse: viewAttachmentsActionCreators.resetResponse,
  setDownloadAttachmentsActionSettings: viewAttachmentsActionCreators.setDownloadAttachmentsActionSettings
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
      console.log('*****Props', this.props)
      let contextId = ''
      if (this.props.type === 'Component') {
        contextId = this.props.match.params.id
      }
      let payload = {
        'context_type_key': this.props.type,
        'context_id': contextId
      }
      this.props.fetchAttachments && this.props.fetchAttachments(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('component will receive props', nextProps)
      if (nextProps.attachmentById && nextProps.attachmentById !== '') {
        let fileName = ''
        if (nextProps.downloadAttachmentSettings.attachmentData && nextProps.downloadAttachmentSettings.attachmentData !== '') {
          let fileExtension = nextProps.downloadAttachmentSettings.attachmentData.name.split('.').pop()
          let name = nextProps.downloadAttachmentSettings.attachmentData.name
          if (name === fileExtension) {
            // no extension
            let extension = nextProps.downloadAttachmentSettings.attachmentData.file_name.split('.').pop()
            fileName = name + '.' + extension
          } else {
            fileName = nextProps.downloadAttachmentSettings.attachmentData.name
          }
        }
        console.log('fileName', fileName)
        if (nextProps.attachmentById.type === 'image/png' || nextProps.attachmentById.type === 'image/gif' || nextProps.attachmentById.type === 'image/jpg' || nextProps.attachmentById.type === 'image/jpeg') {
          const url = window.URL.createObjectURL(new Blob([nextProps.attachmentById], {type: 'image/png'}, {type: 'image/gif'}, {type: 'image/jpg'}, {type: 'image/jpeg'}))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('target', '_blank', `${fileName}`)
          document.body.appendChild(link)
          link.click()
        } else {
          const url = window.URL.createObjectURL(new Blob([nextProps.attachmentById]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${fileName}`)
          document.body.appendChild(link)
          link.click()
        }
        this.props.resetResponse()
      }
    }
  })
)(ViewAttachments)
