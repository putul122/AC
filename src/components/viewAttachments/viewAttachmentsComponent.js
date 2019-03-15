import React from 'react'
import PropTypes from 'prop-types'

export default function ViewAttachments (props) {
 console.log('data for attachments', props.attachments, props.downloadAttachmentSettings, props.setDownloadAttachmentsActionSettings)
 let attachments = props.attachments.resources
 let attachmentsList = ''

 let downloadFile = function (data) {
  let downloadAttachmentSettings = {...props.downloadAttachmentSettings, 'attachmentData': data}
  props.setDownloadAttachmentsActionSettings(downloadAttachmentSettings)
  console.log('DATAofattachment', downloadAttachmentSettings)
  let payload = {}
  payload.attachment_id = downloadAttachmentSettings.attachmentData.id
  console.log('PPPP', payload)
  props.fetchAttachmentById(payload)
 }

 if (typeof attachments !== 'undefined') {
  attachmentsList = attachments.map(function (data, index) {
    let iconlink = data.links.find(function (link) { return link.rel === 'icon' })
    // let attachmentlink = data.links.find(function (link) { return link.rel === 'self' })
    // console.log(attachmentlink)
    return (
      <div className='col-2' style={{'textAlign': 'center'}}>
        {/* <div className='m-list-search'>
          <div className='m-list-search__results'>
            <span className='m-list-search__result-category m-list-search__result-category--first'>
            Attachments
            </span>
          </div>
        </div> */}
        <div className='m-widget24'>
          <div className='m-widget24__item' style={{'marginBottom': '40px'}}>
            <h4 className='m-widget24__title' style={{'marginLeft': '0px', 'marginTop': '0px'}}>
              <a href={'javascript:void(0);'} id='onlyattachment' onClick={(event) => { event.preventDefault(); downloadFile(data) }}>{data.name}</a>
            </h4>
            <br />
            <p className='m-widget24__desc' style={{'margin': '0px'}}>
              <img src={iconlink ? iconlink.href : ''} alt={data.name} width='40px' />
            </p>
            <br />
          </div>
        </div>
      </div>
    )
  })
}
  return (
    <div>
      <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
        <div className='m-portlet__body'>
          <div className='row m-row--no-padding m-row--col-separator-xl'>
            <div className='col-xl-12'>
              <div className='m-list-search'>
                <div className='m-list-search__results'>
                  <span className='m-list-search__result-category m-list-search__result-category--first'>
                  Attachments
                  </span>
                </div>
              </div>
              <div className='row m-row--no-padding m-row--col-separator-xl' style={{width: '100%'}}>
                {attachmentsList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ViewAttachments.propTypes = {
  attachments: PropTypes.any,
  setDownloadAttachmentsActionSettings: PropTypes.func,
  downloadAttachmentSettings: PropTypes.any
}
