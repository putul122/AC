import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
// import styles from './acceptReviewComponent.scss'
// import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'

export default function ReviewAcceptance (props) {
  let reviewName = ''
  let reviewComplaint = ''
  let documentReference = ''
  let documentVersion = ''
  let Artefact = ''
  let Category = ''
  let checkItemList = ''
  let contextId = props.match.params.id
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
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let onRadioChange = function (value) {
    let isAccepeted = value
    props.setAcceptance(isAccepeted)
    let validationClass = {...props.validationClass}
    validationClass.acceptance = 'form-group m-form__group row'
    props.setValidationClass(validationClass)
  }
  if (props.reviewData && props.reviewData !== null & props.reviewData.error_code === null) {
    reviewName = props.reviewData.resources[0].name
    // Description = props.reviewData.resources[0].description
    Category = props.reviewData.resources[0].review_category
    reviewComplaint = props.reviewData.resources[0].compliance_status
    documentReference = props.reviewData.resources[0].document_reference
    documentVersion = props.reviewData.resources[0].document_version
    Artefact = props.reviewData.resources[0].review_artefact_name
    if (props.reviewData.resources[0].check_items.length > 0) {
      checkItemList = props.reviewData.resources[0].check_items.map(function (data, index) {
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
              <label htmlFor='example-email-input' className='col-4 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
              <div className='col-8 float-left' >
                <div className='m-radio-inline pull-left' style={{width: '100%'}}>
                  {valueList}
                  <label htmlFor='example-email-input' className='col-8'>
                    <span className=''>{data.compliance_comment || ''}</span>
                    <span />
                  </label>
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
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    if (props.isAccepeted) {
      if (props.isAccepeted === 'No') {
        if (props.notAcceptedReason.trim() !== '') {
          let obj = {}
          obj.op = 'replace'
          obj.path = '/reason'
          obj.value = props.notAcceptedReason
          updatePayload.push(obj)
        }
      }
    }
    console.log('update payload', updatePayload)
    let payload = {}
    payload.reviewId = contextId
    payload.data = updatePayload
    props.updateReviews(payload)
  }
  let submitReview = function (event) {
    let updatePayload = []
    let obj = {}
    if (props.isAccepeted) {
      if (props.isAccepeted === 'Yes') {
        let CompletedId = _.result(_.find(props.reviewProperties.stages, function (obj) {
          return obj.name === 'Completed'
        }), 'id')
        // setting Stage payload
        obj = {}
        obj.op = 'replace'
        obj.path = '/stage'
        obj.value = CompletedId
        updatePayload.push(obj)
        // setting Status payload
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
      } else if (props.isAccepeted === 'No') {
        if (props.notAcceptedReason.trim() !== '' && props.notAcceptedReason !== null) {
          let inProgressId = _.result(_.find(props.reviewProperties.stages, function (obj) {
            return obj.name === 'In Progress'
          }), 'id')
          // setting Stage payload
          obj = {}
          obj.op = 'replace'
          obj.path = '/stage'
          obj.value = inProgressId
          updatePayload.push(obj)
          // setting Status payload
          obj = {}
          obj.op = 'replace'
          obj.path = '/status'
          obj.value = 'Not Accepted'
          updatePayload.push(obj)
          // setting Reason payload
          obj = {}
          obj.op = 'replace'
          obj.path = '/reason'
          obj.value = props.notAcceptedReason
          updatePayload.push(obj)
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          console.log('update payload', updatePayload)
          let payload = {}
          payload.reviewId = contextId
          payload.data = updatePayload
          props.updateReviews(payload)
        } else {
          let validationClass = {...props.validationClass}
          validationClass.notAcceptedReason = 'form-group m-form__group row has-danger'
          props.setValidationClass(validationClass)
        }
        if (props.notAcceptedReason.trim() !== '') {
          let discussionPayload = {}
          discussionPayload.name = 'Not Accepted'
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
          console.log('discussion message', discussionPayload)
          props.createDiscussion(discussionPayload)
        }
      }
    } else {
      let validationClass = {...props.validationClass}
      validationClass.acceptance = 'form-group m-form__group row has-danger'
      props.setValidationClass(validationClass)
    }
  }
  let handleNotAcceptReason = function (event) {
    let notAcceptedReason = event.target.value
    props.setNotAcceptedReason(notAcceptedReason)
    if (notAcceptedReason !== '') {
      let validationClass = {...props.validationClass}
      validationClass.notAcceptedReason = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
  }
  return (
    <div>
      <div className='row clearfix'>
        <div className='col-xs-4 col-sm-6 col-md-8' ><h2>Accept Review</h2></div>
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
                  <label htmlFor='example-email-input' className='col-4'><b>Review Type</b></label>
                  <div className='col-8'>
                    <span className='m-input'>{Category}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='col-12'>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-4'><b>Review Document No</b></label>
                  <div className='col-8'>
                    <span className='m-input' >{documentReference}</span>
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
                  <label htmlFor='example-email-input' className='col-4'><b>Compliant</b></label>
                  <div className='col-8'>
                    <span className='m-input' >{reviewComplaint}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='col-12'>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-4'><b>Review Document Version</b></label>
                  <div className='col-8'>
                    <span className='m-input' >{documentVersion}</span>
                  </div>
                </div>
              </div>
            </div>
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
          <div className='row' style={{width: '100%'}}>
            <div className='col-12 m-form m-form--state m-form--fit'>
              <div className={props.validationClass.acceptance}>
                <label htmlFor='example-email-input' className='col-3 col-form-label'>Accept Review<span className='text-danger' >*</span></label>
                <div className='col-9 float-right'>
                  <div className='m-radio-inline'>
                    <label htmlFor='example-email-input' className=''>
                      <input type='radio' name='example_8' value='Yes' checked={props.isAccepeted === 'Yes'} onChange={(e) => onRadioChange('Yes')} /> Yes
                      <span />
                    </label>&nbsp;
                    <label htmlFor='example-email-input' className=''>
                      <input type='radio' name='example_8' value='No' checked={props.isAccepeted === 'No'} onChange={(e) => onRadioChange('No')} /> No
                      <span />
                    </label>
                  </div>
                </div>
              </div>
              {props.isAccepeted === 'No' && (<div className={props.validationClass.notAcceptedReason}>
                <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason<span className='text-danger'>*</span></label>
                <div className='col-8'>
                  {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                  <textarea className='form-control m-input m-input--air' value={props.notAcceptedReason} onChange={handleNotAcceptReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
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
      <Discussion name={'reviewName'} type='Component' {...props} />
      <NewDiscussion contextId={contextId} name={'reviewName'} type='Component' {...props} />
      <CheckItemModal />
    </div>)
    }
 ReviewAcceptance.propTypes = {
  match: PropTypes.any,
  reviewData: PropTypes.any,
  isAccepeted: PropTypes.any,
  setNotAcceptedReason: PropTypes.func,
  setValidationClass: PropTypes.func,
  notAcceptedReason: PropTypes.any,
  validationClass: PropTypes.any
 }
