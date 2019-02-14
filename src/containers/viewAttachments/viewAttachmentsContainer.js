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
    downloadAttachmentSettings: state.attachmentsReducer.downloadAttachmentSettings
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
        console.log('**&&^&', nextProps.attachmentById)
         if (nextProps.attachments && nextProps.attachments !== '') {
            fileName = nextProps.attachments.resources[0].name
         }
        console.log('&*&&', fileName)
        const url = window.URL.createObjectURL(new Blob([nextProps.attachmentById]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}`)
        document.body.appendChild(link)
        link.click()
        // if (nextProps.attachmentById.type === 'image/png') {
        //   if (nextProps.attachments && nextProps.attachments !== '') {
        //     fileName = nextProps.attachments.resources[0].name
        //   }
        //   console.log('HIIIIIII')
        //   const url = window.URL.createObjectURL(new Blob([nextProps.attachmentById]))
        //   const link = document.createElement('a')
        //   link.href = url
        //   // link.setAttribute('target', 'blank', `${fileName}`)
        //   window.open(url + '/' + `${fileName}`)
        //   document.body.appendChild(link)
        //   link.click()
        // }
        this.props.resetResponse()
      }
    }
  })
)(ViewAttachments)
