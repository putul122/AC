import React from 'react'
// import _ from 'lodash'
import PropTypes from 'prop-types'
// import styles from './acceptReviewComponent.scss'
// import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'

export default function ReviewAcceptance (props) {
  let reviewName = ''
  let Artefact = ''
  let Category = ''
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let onRadioChange = function (value) {
    let isAccepeted = value
    console.log(value)
    props.setAcceptance(isAccepeted)
  }
  if (props.reviewData && props.reviewData !== null & props.reviewData.error_code === null) {
    reviewName = props.reviewData.resources[0].name
    // Description = props.reviewData.resources[0].description
    Category = props.reviewData.resources[0].review_category
    // Reviewer = props.reviewData.resources[0].reviewer
    // Approver = props.reviewData.resources[0].approver
    Artefact = props.reviewData.resources[0].review_artefact_name
  }
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    if (props.isAccepeted) {
      if (props.isAccepeted === 'No') {
        let obj = {}
        obj.op = 'replace'
        obj.path = '/reject_reason'
        obj.value = props.notAcceptedReason
        updatePayload.push(obj)
      }
    }
    console.log('update payload', updatePayload)
    props.updateReviews(updatePayload)
  }
  let submitReview = function (event) {
    let updatePayload = []
    let obj = {}
    if (props.isAccepeted) {
      if (props.isAccepeted === 'Yes') {
        obj = {}
        obj.op = 'replace'
        obj.path = '/stage'
        obj.value = 'Completed'
        updatePayload.push(obj)
        obj = {}
        obj.op = 'replace'
        obj.path = '/compliance_status'
        obj.value = 'Accepted'
        updatePayload.push(obj)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        props.updateReviews(updatePayload)
      } else if (props.isAccepeted === 'No') {
        if (props.notAcceptedReason !== '' && props.notAcceptedReason !== null) {
          obj = {}
          obj.op = 'replace'
          obj.path = '/stage'
          obj.value = 'In Progress'
          updatePayload.push(obj)
          obj = {}
          obj.op = 'replace'
          obj.path = '/compliance_status'
          obj.value = 'Not Accepted'
          updatePayload.push(obj)
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          console.log('update payload', updatePayload)
          props.updateReviews(updatePayload)
        }
      }
    }
  }
  let handleNotAcceptReason = function (event) {
    let notAcceptedReason = event.target.value
    props.setNotAcceptedReason(notAcceptedReason)
  }
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
                          <span className='m-list-search__result-item'>
                            <div className='form-group m-form__group row'>
                              <label htmlFor='example-email-input' className='col-4 col-form-label'>Has Cloud Solution been considered</label>
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
                                    <span>No affordable options available</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row' style={{width: '100%'}}>
            <div className='col-12 m-form__content'>
              <div className='form-group m-form__group row'>
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
              {props.isAccepeted === 'No' && (<div className='form-group m-form__group row'>
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
    </div>)
    }
 ReviewAcceptance.propTypes = {
  match: PropTypes.any,
  reviewData: PropTypes.any,
  isAccepeted: PropTypes.any,
  setNotAcceptedReason: PropTypes.func,
  notAcceptedReason: PropTypes.any
 }
