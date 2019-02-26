import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Select from 'react-select'
import moment from 'moment'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import ViewAttachments from '../../containers/viewAttachments/viewAttachmentsContainer'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'
import api from '../../constants'

export default function ReviewApproval (props) {
  console.log(props)
  let reviewName = ''
  // let reviewComplaint = ''
  let Description = ''
  let Category = ''
  // let Reviewer = ''
  // let Approver = ''
  let Artefact = ''
  let DocumentReference = ''
  let DocumentVersion = ''
  let documentHyperLink = 'javascript:void(0);'
  let reviewArtefactId
  let checkItemList = ''
  let Compliant = ''
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let openModal = function (data) {
    props.setCheckItemData(data)
    let modalSettings = {
      'isViewCheckItemOpen': true,
      'isStandardModalOpen': false,
      'isPrincipleModalOpen': false,
      'principleData': '',
      'standardData': ''
    }
    props.setModalSetting(modalSettings)
  }
  let openComponentModal = function () {
    if (reviewArtefactId !== null && reviewArtefactId !== '') {
      let payload = {}
      payload.isModalOpen = true
      payload.componentId = reviewArtefactId
      payload.callAPI = true
      props.setModalSettings(payload)
    } else {
      alert('Artefact Id not set')
    }
  }
  let onRadioChange = function (value) {
    let isApproved = value
    console.log(value)
    props.setApproval(isApproved)
    let validationClass = {...props.validationClass}
    validationClass.approval = 'form-group m-form__group row'
    props.setValidationClass(validationClass)
  }
  // let saveReview = function (event) {
  //   // eslint-disable-next-line
  //   mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  //   let updatePayload = []
  //   if (props.isApproved) {
  //     if (props.isApproved === 'Rejected') {
  //       let obj = {}
  //       obj.op = 'replace'
  //       obj.path = '/reason'
  //       obj.value = props.rejectedReason
  //       updatePayload.push(obj)
  //     }
  //   }
  //   console.log('update payload', updatePayload)
  //   let payload = {}
  //   payload.reviewId = contextId
  //   payload.data = updatePayload
  //   props.updateReviews(payload)
  // }
  let submitReview = function (event) {
    let updatePayload = []
    if (props.isApproved === null) {
      let validationClass = {...props.validationClass}
      validationClass.approval = 'form-group m-form__group row has-danger'
      props.setValidationClass(validationClass)
    }
    if (props.isApproved) {
      if (props.isApproved === 'Approved') {
        let completedId = _.result(_.find(props.reviewProperties.stages, function (obj) {
          return obj.name === 'Completed'
        }), 'id')
        // set Completed stage
        let obj = {}
        obj.op = 'replace'
        obj.path = '/stage'
        obj.value = completedId
        updatePayload.push(obj)
        // set Completed status
        obj = {}
        obj.op = 'replace'
        obj.path = '/status'
        obj.value = 'Completed'
        updatePayload.push(obj)
        // setting Completed date when approved
        obj = {}
        obj.op = 'replace'
        obj.path = '/completed_date'
        obj.value = moment().format()
        updatePayload.push(obj)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        let payload = {}
          payload.reviewId = contextId
          payload.data = updatePayload
          props.updateReviews(payload)
      } else if (props.isApproved === 'Rejected') {
        if (props.rejectedReason.trim() !== '' && props.rejectedReason !== null) {
          let inProgressId = _.result(_.find(props.reviewProperties.stages, function (obj) {
            return obj.name === 'In Progress'
          }), 'id')
          // set In Progress stage
          let obj = {}
          obj.op = 'replace'
          obj.path = '/stage'
          obj.value = inProgressId
          updatePayload.push(obj)
          // set Rejected status
          obj = {}
          obj.op = 'replace'
          obj.path = '/status'
          obj.value = 'Rejected'
          updatePayload.push(obj)
          // set Rejected reason
          obj = {}
          obj.op = 'replace'
          obj.path = '/reason'
          obj.value = props.rejectedReason
          updatePayload.push(obj)
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          console.log('update payload', updatePayload)
          let payload = {}
          payload.reviewId = contextId
          payload.data = updatePayload
          props.updateReviews(payload)
          // to create Discussion
          if (props.rejectedReason.trim() !== '') {
            let discussionPayload = {}
            discussionPayload.name = 'Rejected'
            discussionPayload.context = {}
            discussionPayload.context.artefact_type = {}
            discussionPayload.context.artefact_type.key = 'Component'
            discussionPayload.context.id = contextId
            discussionPayload.discussion_type = {}
            discussionPayload.discussion_type.key = 'User'
            discussionPayload.messages = []
            let message = {}
            message.name = props.notAcceptedReason
            message.mentions = []
            message.references = []
            message.tags = []
            discussionPayload.messages.push(message)
            props.createDiscussion(discussionPayload)
          }
        } else {
          let validationClass = {...props.validationClass}
          validationClass.rejectReason = 'form-group m-form__group row has-danger'
          props.setValidationClass(validationClass)
        }
      }
    }
  }
  let handleRejectedReason = function (event) {
    let rejectedReason = event.target.value
    props.setRejectedReason(rejectedReason)
    if (rejectedReason !== '') {
      let validationClass = {...props.validationClass}
      validationClass.rejectReason = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
  }
  if (props.reviewData && props.reviewData !== null & props.reviewData.error_code === null) {
    reviewName = props.reviewData.resources[0].name
    Description = props.reviewData.resources[0].description
    Category = props.reviewData.resources[0].review_category
    // Reviewer = props.reviewData.resources[0].reviewer
    // Approver = props.reviewData.resources[0].approver
    Artefact = props.reviewData.resources[0].review_artefact_name
    Compliant = props.reviewData.resources[0].compliance_status
    reviewArtefactId = props.reviewData.resources[0].review_artefact_id
    DocumentReference = props.reviewData.resources[0].document_reference
    DocumentVersion = props.reviewData.resources[0].document_version
    // reviewComplaint = props.reviewData.resources[0].complaint
    if (DocumentReference !== '' && DocumentReference !== null) {
      documentHyperLink = api.documentReferenceLink + DocumentReference
    }
    if (props.reviewData.resources[0].check_items.length > 0) {
      let notToDisplay = []
      props.reviewData.resources[0].check_items.forEach(function (data, index) {
        let compliance = data.compliance
        if (data.values.length > 0) {
          data.values.forEach(function (value, idx) {
            if (compliance === value.name) {
              // remove id from notToDisplay
              let notToDisplayIndex = notToDisplay.indexOf(data.id)
              if (notToDisplayIndex > -1) {
                notToDisplay.splice(notToDisplayIndex, 1)
              }
            } else {
              // add id to notToDisplay
              if (value.requires_check_items.length > 0) {
                value.requires_check_items.forEach(function (requireCheckItem, ix) {
                  notToDisplay.push(requireCheckItem.id)
                })
              }
            }
          })
        }
      })
      let checkItems = props.reviewData.resources[0].check_items.map(function (data, index) {
        if (notToDisplay.includes(data.id)) {
          data.display = false
        } else {
          data.display = true
        }
        return data
      }) || []
      checkItemList = _.filter(checkItems, function (checkItem) {
          return checkItem.display
      }).map(function (data, index) {
        if (data.type === null || data.type === 'Radio') {
          let valueList = ''
          if (data.values.length > 0) {
            valueList = data.values.map(function (valueData, valueIndex) {
              return (<span><label htmlFor='example-email-input' className='m-radio'>
                <input type='radio' name={'checkitems_' + index + '_' + valueIndex} value={valueData.name} checked={data.compliance === valueData.name} /> {valueData.name}
                <span />
              </label>&nbsp;&nbsp;&nbsp;</span>)
            })
          }
          console.log('valueList', valueList, typeof valueList)
          return (<span className='m-list-search__result-item' key={index}>
            <div className='form-group m-form__group row'>
              <label htmlFor='example-email-input' className='col-3 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
              <div className='col-9 float-left' >
                <div className='m-radio-inline pull-left row' style={{width: '100%'}}>
                  <div className='col-md-4'>
                    {valueList}
                  </div>
                  <div className='col-md-8'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='example-email-input' className='col-3'><b>Comment:</b></label>
                      <div className='col-9'>
                        <span className=' m-input'>{data.compliance_comment || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>)
        }
        if (data.type === 'Check') {
          let valueList = ''
          if (data.values.length > 0) {
            valueList = data.values.map(function (valueData, valueIndex) {
              return (<span><label htmlFor='example-email-input' className='m-checkbox'>
                <input type='checkbox' name={'checkitems_' + index + '_' + valueIndex} value={valueData.name} checked={data.compliance === valueData.name} /> {valueData.name}
                <span />
              </label>&nbsp;&nbsp;&nbsp;</span>)
            })
          }
          console.log('valueList', valueList, typeof valueList)
          return (<span className='m-list-search__result-item' key={index}>
            <div className='form-group m-form__group row'>
              <label htmlFor='example-email-input' className='col-3 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
              <div className='col-9 float-left' >
                <div className='m-radio-inline pull-left row' style={{width: '100%'}}>
                  <div className='col-md-4'>
                    {valueList}
                  </div>
                  <div className='col-md-8'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='example-email-input' className='col-3'><b>Comment:</b></label>
                      <div className='col-9'>
                        <span className=' m-input'>{data.compliance_comment || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>)
        }
        if (data.type === 'Dropdown') {
          let dropdownOptions = []
          let defaultValue = null
          if (data.values.length > 0) {
            dropdownOptions = data.values.map(function (value, index) {
              value.label = value.name
              return value
            })
            defaultValue = _.find(dropdownOptions, function (obj) { return obj.name === data.compliance })
          }
          return (<span className='m-list-search__result-item' key={index}>
            <div className='form-group m-form__group row'>
              <label htmlFor='example-email-input' className='col-3 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
              <div className='col-9 float-left' >
                <div className='row pull-left' style={{width: '100%'}}>
                  <div className='col-md-4'>
                    <Select
                      // className='col-7 input-sm m-input'
                      placeholder='Select Options'
                      isClearable
                      defaultValue={defaultValue}
                      // value={props.userActionSettings.selectedRole}
                      // onChange={handleCheckItemSelectOption(data)}
                      // isSearchable={false}
                      // isDisabled
                      name={'dropdown'}
                      options={dropdownOptions}
                    />
                  </div>
                  <div className='col-md-8'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='example-email-input' className='col-3'><b>Comment:</b></label>
                      <div className='col-9'>
                        <span className=' m-input'>{data.compliance_comment || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>)
        }
      })
    } else {
      checkItemList = ''
    }
  }
    return (
      <div className=''>
        <div className='row clearfix'>
          <div className='col-xs-4 col-sm-6 col-md-8' ><h2>Approve Review</h2></div>
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
              {/* <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button> */}
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
          </div>
        </div>
        <br />
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className='m-portlet__body'>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Name</b></label>
                    <div className='col-7'>
                      <span className='m-input' >{reviewName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Review Artefact</b></label>
                    <div className='col-7'>
                      <span lassName='m-input' >
                        {Artefact && (<a href='javascript:void(0);' onClick={openComponentModal} >{Artefact}</a>)}
                        {!Artefact && (<span>Not Connected</span>)}
                        {/* <a href={'/review_artefact/' + ArtefactId}>{Artefact}</a> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Review Type</b></label>
                    <div className='col-7'>
                      <span className='m-input'>{Category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Review Document No</b></label>
                    <div className='col-7'>
                      <span className='m-input' >{DocumentReference && (<a href={documentHyperLink} >{DocumentReference}</a>)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Description</b></label>
                    <div className='col-7'>
                      <span className='m-input' >{Description}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Review Document Version</b></label>
                    <div className='col-7'>
                      <span className='m-input' >{DocumentVersion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-5'><b>Compliant</b></label>
                    <div className='col-7'>
                      <span className='m-input' >{Compliant}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6' />
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-12'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Check Items
                                    </span>
                            {checkItemList}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ViewAttachments type='Component' {...props} />
                </div>
              </div>
            </div>
            <div className='row ' style={{width: '100%'}}>
              <div className='col-12 m-form m-form--state m-form--fit'>
                <div className={props.validationClass.approval}>
                  <label htmlFor='example-email-input' className='col-3 col-form-label'>Review Approved<span className='text-danger' >*</span></label>
                  <div className='col-9 float-right'>
                    <div className='m-radio-inline'>
                      <label htmlFor='example-email-input' className=''>
                        <input type='radio' name='example_8' value='Approved' checked={props.isApproved === 'Approved'} onChange={(e) => onRadioChange('Approved')} /> Approved
                        <span />
                      </label>&nbsp;
                      <label htmlFor='example-email-input' className=''>
                        <input type='radio' name='example_8' value='Rejected' checked={props.isApproved === 'Rejected'} onChange={(e) => onRadioChange('Rejected')} /> Rejected
                        <span />
                      </label>
                    </div>
                  </div>
                </div>
                {props.isApproved === 'Rejected' && (<div className={props.validationClass.rejectReason}>
                  <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason<span className='text-danger'>*</span></label>
                  <div className='col-8'>
                    {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                    <textarea className='form-control m-input m-input--air' value={props.rejectedReason} onChange={handleRejectedReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                  </div>
                </div>)}
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-6' />
              <div className='col-6 float-right'>
                <div className='pull-right'>
                  {/* <button onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                  <button onClick={saveReview} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                  <button onClick={submitReview} className='btn btn-outline-info btn-sm'>Submit</button> */}
                  <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                    <button type='button' onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='m-btn btn btn-secondary'>Close</button>
                    <button type='button' onClick={submitReview} className='m-btn btn btn-secondary'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Discussion name={reviewName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={reviewName} type='Component' {...props} />
        <CheckItemModal />
      </div>
      )
    }
    ReviewApproval.propTypes = {
      match: PropTypes.any,
      reviewData: PropTypes.any,
      isApproved: PropTypes.any,
      // setRejectedReason: PropTypes.func,
      rejectedReason: PropTypes.any,
      validationClass: PropTypes.any
      // setValidationClass: PropTypes.func
 }
