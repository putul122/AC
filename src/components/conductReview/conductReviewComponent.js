import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'

export default function ConductReview (props) {
  console.log('props conduct', props)
  let reviewName = ''
  let Artefact = ''
  let Category = ''
  let checkItemList = ''
  let contextId = props.match.params.id
  let onRadioChange = function (value) {
    props.setComplaint(value)
  }
  let handelReason = function (event) {
    let value = event.target.value
    props.setReason(value)
    if (props.reason !== '') {
      let validationClass = {...props.validationClass}
      validationClass.draft = 'form-group m-form__group row'
      validationClass.cancel = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
  }
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  // let handleReturnToDraft = function () {
  //   let returnToDraft = !props.returnToDraft
  //   props.setReturnDraft(returnToDraft)
  // }
  // let handleCancelReview = function () {
  //   let cancelReview = !props.cancelReview
  //   props.setCancelReview(cancelReview)
  // }
  let handleCheckbox = function (type) {
    props.setReason('')
    let checkboxSelected = {...props.checkboxSelected}
    if (type === 'Cancel') {
      checkboxSelected.cancel = !checkboxSelected.cancel
      checkboxSelected.draft = false
    } else {
      checkboxSelected.draft = !checkboxSelected.draft
      checkboxSelected.cancel = false
    }
    props.setCheckbox(checkboxSelected)
  }
  if (props.reviewData && props.reviewData !== null & props.reviewData.error_code === null) {
    reviewName = props.reviewData.resources[0].name
      // Description = props.reviewData.resources[0].description
      Category = props.reviewData.resources[0].review_category
      // Reviewer = props.reviewData.resources[0].reviewer
      // Approver = props.reviewData.resources[0].approver
      // let complianceStatus = props.reviewData.resources[0].compliance_status || ''
      // props.setComplaint(complianceStatus)
      Artefact = props.reviewData.resources[0].review_artefact_name
      if (props.reviewData.resources[0].check_items.length > 0) {
        checkItemList = props.reviewData.resources[0].check_items.map(function (data, index) {
          return (<span className='m-list-search__result-item' key={index}>
            <div className='form-group m-form__group row'>
              <label htmlFor='example-email-input' className='col-4 col-form-label'>{data.name}</label>
              <div className='col-8 float-left' >
                <div className='m-radio-inline pull-left'>
                  <label htmlFor='example-email-input' className='m-radio'>
                    <input type='radio' name='example_8' value='1' /> Yes
                    <span />
                  </label>
                  <label htmlFor='example-email-input' className='m-radio'>
                    <input type='radio' name='example_8' value='2' /> No
                    <span />
                  </label>
                  <label htmlFor='example-email-input' className=''>
                    <input type='text' className='form-control lg-input' name='example_8' value='' />
                    <span />
                  </label>
                </div>
              </div>
            </div>
          </span>)
        })
      } else {
        checkItemList = ''
      }
  }
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    if (props.complaint !== '') {
      let obj = {}
      obj.op = 'replace'
      obj.path = '/compliance_status'
      obj.value = props.complaint
      updatePayload.push(obj)
    }
    if (props.reason.trim() !== '') {
      let obj = {}
      obj.op = 'replace'
      obj.path = '/reason'
      obj.value = props.reason
      updatePayload.push(obj)
    }
    let payload = {}
    payload.reviewId = contextId
    payload.data = updatePayload
    props.updateReviews(payload)
    console.log(payload)
  }
  let submitReview = function (event) {
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    if (props.reason !== '') {
      let obj = {}
      obj.op = 'replace'
      obj.path = '/reason'
      obj.value = props.reason
      updatePayload.push(obj)
    }
    if (props.complaint !== '') {
      let obj = {}
      obj.op = 'replace'
      obj.path = '/compliance_status'
      obj.value = props.complaint
      updatePayload.push(obj)
    }
    if (props.checkboxSelected.draft) {
      let draftId = _.result(_.find(props.reviewProperties.stages, function (obj) {
        return obj.name === 'Draft'
      }), 'id')
      // set Return to Draft stage
      let obj = {}
      obj.op = 'replace'
      obj.path = '/stage'
      obj.value = draftId
      updatePayload.push(obj)
      // set Return to Draft status
      obj = {}
      obj.op = 'replace'
      obj.path = '/status'
      obj.value = 'Returned'
      updatePayload.push(obj)
      if (props.reason.trim() === '') {
        let validationClass = {...props.validationClass}
        validationClass.draft = 'form-group m-form__group row has-danger'
        validationClass.cancel = 'form-group m-form__group row'
        props.setValidationClass(validationClass)
      } else {
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        let payload = {}
        payload.reviewId = contextId
        payload.data = updatePayload
        props.updateReviews(payload)
      }
    } else if (props.checkboxSelected.cancel) {
      let completedId = _.result(_.find(props.reviewProperties.stages, function (obj) {
        return obj.name === 'Completed'
      }), 'id')
      // set Cancel stage
      let obj = {}
      obj.op = 'replace'
      obj.path = '/stage'
      obj.value = completedId
      updatePayload.push(obj)
      // set Cancel status
      obj = {}
      obj.op = 'replace'
      obj.path = '/status'
      obj.value = 'Cancelled'
      updatePayload.push(obj)
      if (props.reason.trim() === '') {
        let validationClass = {...props.validationClass}
        validationClass.draft = 'form-group m-form__group row'
        validationClass.cancel = 'form-group m-form__group row has-danger'
        props.setValidationClass(validationClass)
      } else {
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        let payload = {}
        payload.reviewId = contextId
        payload.data = updatePayload
        props.updateReviews(payload)
      }
    } else {
      let acceptanceId = _.result(_.find(props.reviewProperties.stages, function (obj) {
        return obj.name === 'Acceptance'
      }), 'id')
      // set Approved stage
      let obj = {}
      obj.op = 'replace'
      obj.path = '/stage'
      obj.value = acceptanceId
      updatePayload.push(obj)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      console.log('update payload', updatePayload)
      let payload = {}
      payload.reviewId = contextId
      payload.data = updatePayload
      props.updateReviews(payload)
    }
    if ((props.checkboxSelected.draft || props.checkboxSelected.cancel) && props.reason.trim() !== '') {
      let discussionPayload = {}
      if (props.checkboxSelected.draft) {
        discussionPayload.name = 'Return to Draft'
      } else if (props.checkboxSelected.cancel) {
        discussionPayload.name = 'Cancel Review'
      }
      discussionPayload.context = {}
      discussionPayload.context.artefact_type = {}
      discussionPayload.context.artefact_type.key = 'Component'
      discussionPayload.context.id = contextId
      discussionPayload.discussion_type = {}
      discussionPayload.discussion_type.key = 'User'
      discussionPayload.messages = []
      let message = {}
      message.name = props.reason
      message.mentions = []
      message.references = []
      message.tags = []
      discussionPayload.messages.push(message)
      console.log('discussion message', discussionPayload)
      props.createDiscussion(discussionPayload)
    }
  }
  console.log(reviewName)
    return (
      <div>
        <div className='row clearfix'>
          <div className='col-xs-4 col-sm-6 col-md-8' />
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
              <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button>
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
                    <label htmlFor='example-email-input' className='col-4'><b>Name</b></label>
                    <div className='col-8'>
                      <span className='m-input' >{reviewName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6' />
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4'><b>Review Type</b></label>
                    <div className='col-8'>
                      <span lassName='m-input'>{Category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4'><b>Review Artefact</b></label>
                    <div className='col-8'>
                      <span lassName='m-input' >{Artefact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'><b>Complaint?</b></label>
                    <div className='col-8'>
                      <div className='m-radio-inline'>
                        <label htmlFor='example-email-input' className=''>
                          &nbsp;<input type='radio' name='example_8' value='Yes' checked={props.complaint === 'Yes'} onChange={(e) => onRadioChange('Yes')} /> Yes
                          <span />
                        </label>&nbsp;&nbsp;&nbsp;
                        <label htmlFor='example-email-input' className=''>
                          &nbsp;<input type='radio' name='example_8' value='Partial' checked={props.complaint === 'Partial'} onChange={(e) => onRadioChange('Partial')} /> Partial
                          <span />
                        </label>&nbsp;&nbsp;&nbsp;
                        <label htmlFor='example-email-input' className=''>
                          &nbsp;<input type='radio' name='example_8' value='Partial' checked={props.complaint === 'No'} onChange={(e) => onRadioChange('No')} /> No
                          <span />
                        </label>
                      </div>
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
              </div>
            </div>
            <div className='m-form m-form--state m-form--fit'>
              <div className='row' style={{width: '100%'}}>
                <div className='col-md-12'>
                  {/* m-checkbox m-checkbox--danger */}
                  &nbsp;&nbsp;&nbsp;<label htmlFor='cancelReview' className=''>
                    <input type='checkbox' checked={props.checkboxSelected.draft} onChange={(event) => { handleCheckbox('Draft') }} /> <b>Return to Draft</b>
                    <span />
                  </label>
                </div>
                {props.checkboxSelected.draft && (<div className='col-md-12'>
                  <div className={props.validationClass.draft}>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason<span className='text-danger'>*</span></label>
                    <div className='col-8'>
                      {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                      <textarea className='form-control m-input m-input--air' value={props.reason} onChange={handelReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                    </div>
                  </div>
                </div>)}
              </div>
              <div className='row' style={{width: '100%'}}>
                <div className='col-md-12'>
                  &nbsp;&nbsp;&nbsp;<label htmlFor='cancelReview' className=''>
                    <input type='checkbox' checked={props.checkboxSelected.cancel} onChange={(event) => { handleCheckbox('Cancel') }} /> <b>Cancel Review</b>
                    <span />
                  </label>
                </div>
                {props.checkboxSelected.cancel && (<div className='col-md-12'>
                  <div className={props.validationClass.cancel}>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Cancel Reason<span className='text-danger'>*</span></label>
                    <div className='col-8'>
                      {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                      <textarea className='form-control m-input m-input--air' value={props.reason} onChange={handelReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-6' />
              <div className='col-6 float-right'>
                <div className='pull-right'>
                  <button onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                  <button onClick={saveReview} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                  <button onClick={submitReview} className='btn btn-outline-info btn-sm'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Discussion name={reviewName} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={reviewName} type='Component' {...props} />
      </div>
      )
    }
    ConductReview.propTypes = {
      match: PropTypes.any,
      reviewData: PropTypes.any,
      reason: PropTypes.any,
      reviewProperties: PropTypes.any,
      complaint: PropTypes.any,
      // returnToDraft: PropTypes.any,
      // cancelReview: PropTypes.any,
      checkboxSelected: PropTypes.any,
      validationClass: PropTypes.any,
      updateReviews: PropTypes.func,
      createDiscussion: PropTypes.func,
      // setComplaint: PropTypes.func,
      setValidationClass: PropTypes.func
  }
