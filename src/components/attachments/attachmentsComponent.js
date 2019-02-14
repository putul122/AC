import React from 'react'
import PropTypes from 'prop-types'
// import DownloadLink from 'react-download-link'
// import styles from './loginComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     border: 'none',
//     background: 'none',
//     transform: 'translate(-50%, -50%)',
//     width: '100%'
//   }
// }
export default function Attachments (props) {
 console.log('data for attachments', props.attachments, props.updateAttachmentValue, props.setAttachmentsActionSettings, props.deleteAttachment, props.createAttachments, props.updateAttachment, props.createAttachmentResponse)
 let attachments = props.attachments.resources
 let attachmentsList = ''
 let newFileName = ''
 let uploadFile = ''
 let uploadNewFile = ''
let openAddAttachmentModal = function (event) {
  event.preventDefault()
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isAddAttachmentModalOpen': true, 'formData': null}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
 }
let openDeleteAttachmentModal = function (data) {
  console.log('*****', data)
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isDeleteAttachmentModalOpen': true, 'deleteAttachmentData': data}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
 }
let openUpdateAttachmentModal = function (data) {
  console.log('update user', data)
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isEditAttachmentModalOpen': true, 'updateAttachmentData': data, 'formData': null}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
}
let closeAddAttachmentModal = function () {
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isAddAttachmentModalOpen': false}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
}
let closeDeleteAttachmentModal = function () {
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isDeleteAttachmentModalOpen': false, 'deleteAttachmentData': ''}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
}
let closeUpdateAttachmentModal = function () {
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isEditAttachmentModalOpen': false, 'updateAttachmentData': ''}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
}
let handleChangeFile = function (event) {
  console.log('Upload file value', uploadFile.value)
  console.log('######', event)
  let files = event.target.files
  let formData = new FormData()
  formData.append('file', files[0])
  // Make a request to server and send formData
  console.log('file type', formData)
  console.log('files', files)
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isAddAttachmentModalOpen': true, 'formData': formData}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
  console.log(props.attachmentsActionSettings.formData)
}
// console.log('form data', formData)
let handleNewFile = function (event) {
  console.log('Upload file value', uploadNewFile.value)
  console.log('######', event)
  let files = event.target.files
  let formData = new FormData()
  formData.append('file', files[0])
  // Make a request to server and send formData
  console.log('file type', formData)
  console.log('files', files)
  let attachmentsActionSettings = {...props.attachmentsActionSettings, 'isEditAttachmentModalOpen': true, 'formData': formData}
  props.setAttachmentsActionSettings(attachmentsActionSettings)
  console.log(props.attachmentsActionSettings.formData)
}

let addAttachment = function (event) {
  let attachmentsActionSettings = {...props.attachmentsActionSettings}
  event.preventDefault()
  let payload = {}
  payload.contextId = props.match.params.id
  payload.contextType = props.type
  payload.name = newFileName.value
  payload.formData = attachmentsActionSettings.formData
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  props.createAttachments(payload)
  closeAddAttachmentModal()
 }
let editAttachment = function (event) {
  let attachmentsActionSettings = {...props.attachmentsActionSettings}
  console.log('updated', props.attachmentsActionSettings.updateAttachmentData)
  event.preventDefault()
  let payload = {}
  payload.attachmentId = props.attachmentsActionSettings.updateAttachmentData.id
  payload.contextId = props.match.params.id
  payload.contextType = props.type
  payload.name = props.updateAttachmentValue.name
  payload.formData = attachmentsActionSettings.formData
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  props.updateAttachment(payload)
  closeUpdateAttachmentModal()
}

let removeAttachment = function () {
  let payload = {}
  payload.attachment_id = props.attachmentsActionSettings.deleteAttachmentData.id
  // eslint-disable-next-line
  mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  console.log(payload)
  props.deleteAttachment(payload)
  closeDeleteAttachmentModal()
}
let editAttachmentName = function (event) {
  console.log('****', event.target.value)
  event.preventDefault()
  let updateAttachmentValue = {...props.updateAttachmentValue, 'name': event.target.value}
  props.setUpdateAttachmentValue(updateAttachmentValue)
  console.log('*&*&*&', updateAttachmentValue)
}

if (typeof attachments !== 'undefined') {
  attachmentsList = attachments.map(function (data, index) {
    console.log(index)
    let iconlink = data.links.find(function (link) { return link.rel === 'icon' })
    // let attachmentLink = data.links.find(function (link) { return link.rel === 'self' })
    // console.log('########', attachmentLink)
    return (
      <div className='col-2' style={{'textAlign': 'center'}}>
        <div className='m-widget24'>
          <div className='m-widget24__item' style={{'marginBottom': '40px'}}>
            <h4 className='m-widget24__title' style={{'marginLeft': '0px', 'marginTop': '0px'}}>
              <a href='javascript:void(0);'>{data.name}</a>
            </h4>
            <br />
            <p className='m-widget24__desc' style={{'margin': '0px'}}>
              <img src={iconlink ? iconlink.href : ''} alt={data.name} width='40px' />
            </p>
            <br />
            <span className='m-widget24__desc' style={{'margin': '0px'}}>
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Edit Attachment' onClick={(event) => { event.preventDefault(); openUpdateAttachmentModal(data) }} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-edit-1 fa-2x' />
              </a>&nbsp;&nbsp;
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Delete Attachment' onClick={(event) => { event.preventDefault(); openDeleteAttachmentModal(data) }} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-delete-1 fa-2x' />
              </a>&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
    )
  })
}
  return (
    <div>
      <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
        <br />
        {/* <div className='m-portlet__head' />
        </div> */}
        <div className='m-portlet__body'>
          <div className='row m-row--no-padding m-row--col-separator-xl'>
            <div className='col-xl-12'>
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' onClick={openAddAttachmentModal} data-placement='top' data-original-title='Add Attachment' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air' style={{'float': 'right'}}>
                <i className='fa flaticon-plus fa-2x' />
              </a>
              <div className='row m-row--no-padding m-row--col-separator-xl' style={{width: '100%'}}>
                {attachmentsList}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactModal isOpen={props.attachmentsActionSettings.isAddAttachmentModalOpen}
          onRequestClose={closeAddAttachmentModal}
          className='modal-dialog modal-lg'
          style={{'content': {'top': '20%'}}}
          >
          <div className={''}>
            <div className=''>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='exampleModalLabel'>New Attachment</h4>
                  <button type='button' onClick={closeAddAttachmentModal} className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='form-group row'>
                    <div className='col-4'><label htmlFor='text' className='form-control-label'>Name of attachment</label></div>
                    <div className='col-8'><input type='text'className='form-control' ref={input => (newFileName = input)} autoComplete='off' required /></div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-4'><label htmlFor='text' className='form-control-label'>Select File</label></div>
                    <div className='col-8'><input type='file' className='form-control m-input' onChange={handleChangeFile} ref={input => (uploadFile = input)} autoComplete='off' required /></div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={closeAddAttachmentModal} className='m-btn btn btn-secondary'>Close</button>
                        <button type='button' onClick={addAttachment} className='m-btn btn btn-secondary'>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
      <div>
        <ReactModal isOpen={props.attachmentsActionSettings.isDeleteAttachmentModalOpen}
          onRequestClose={closeDeleteAttachmentModal}
          className='modal-dialog modal-lg'
          style={{'content': {'top': '20%'}}}
          >
          <div className={''}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='exampleModalLabel'>Delete Attachment</h4>
                  <button type='button' onClick={closeDeleteAttachmentModal} className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <p>Confirm deletion {props.attachmentsActionSettings.deleteAttachmentData.name}</p>
                </div>
                <div className='modal-footer'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={closeDeleteAttachmentModal} className='m-btn btn btn-secondary'>Close</button>
                        <button type='button' onClick={removeAttachment} className='m-btn btn btn-secondary'>Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
      <div>
        <ReactModal isOpen={props.attachmentsActionSettings.isEditAttachmentModalOpen}
          onRequestClose={closeUpdateAttachmentModal}
          className='modal-dialog modal-lg'
          style={{'content': {'top': '20%'}}}
          >
          {/* <button onClick={closeLinkUpdateModal} ><i className='la la-close' /></button> */}
          <div className={''}>
            <div className=''>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title' id='exampleModalLabel'>Edit Attachment</h4>
                  <button type='button' onClick={closeUpdateAttachmentModal} className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>×</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='form-group row'>
                    <div className='col-4'><label htmlFor='text' className='form-control-label'>Name of Attachment</label></div>
                    <div className='col-8'><input type='text' className='form-control' onChange={editAttachmentName} value={props.updateAttachmentValue.name} autoComplete='off' required /></div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-4'><label htmlFor='text' className='form-control-label'>Select File</label></div>
                    <div className='col-8'><input type='file' className='form-control' onChange={handleNewFile} ref={input => (uploadNewFile = input)} autoComplete='off' required /></div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={closeUpdateAttachmentModal} className='m-btn btn btn-secondary'>Cancel</button>
                        <button type='button' onClick={editAttachment} className='m-btn btn btn-secondary'>Update</button>
                      </div>
                    </div>
                  </div>
                  {/* <button type='button' onClick={closeLinkUpdateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                  <button onClick={editProjectEntitlement} className='btn btn-outline-info btn-sm'>Update</button> */}
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </div>
  )
}

Attachments.propTypes = {
  attachments: PropTypes.any,
  attachmentsActionSettings: PropTypes.any,
  setAttachmentsActionSettings: PropTypes.func,
  createAttachments: PropTypes.func,
  createAttachmentResponse: PropTypes.any,
  deleteAttachment: PropTypes.func,
  updateAttachment: PropTypes.func,
  updateAttachmentValue: PropTypes.any
  // setUpdateAttachmentValue: PropTypes.func
}
