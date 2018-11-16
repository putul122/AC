import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'

export default function ReviewApproval (props) {
  console.log(props)
  let reviewName = ''
  let Description = ''
  let Category = ''
  let Reviewer = ''
  let Approver = ''
  let Artefact = ''
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let onRadioChange = function (value) {
    let isApproved = value
    console.log(value)
    props.setApproval(isApproved)
  }
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    if (props.isApproved) {
      if (props.isApproved === 'Rejected') {
        let obj = {}
        obj.op = 'replace'
        obj.path = '/reject_reason'
        obj.value = props.rejectedReason
        updatePayload.push(obj)
      }
    }
    console.log('update payload', updatePayload)
    props.updateReviews(updatePayload)
  }
  let submitReview = function (event) {
    let updatePayload = []
    if (props.isApproved) {
      if (props.isApproved === 'Approved') {
        let obj = {}
        obj.op = 'replace'
        obj.path = '/stage'
        obj.value = 'In Progress'
        updatePayload.push(obj)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        props.updateReviews(updatePayload)
      } else if (props.isApproved === 'Rejected') {
        if (props.rejectedReason !== '' && props.rejectedReason !== null) {
          let obj = {}
          obj.op = 'replace'
          obj.path = '/stage'
          obj.value = 'Draft'
          updatePayload.push(obj)
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          console.log('update payload', updatePayload)
          props.updateReviews(updatePayload)
        }
      }
    }
  }
  let handleRejectedReason = function (event) {
    let rejectedReason = event.target.value
    props.setRejectedReason(rejectedReason)
  }
  if (props.reviewData && props.reviewData !== null & props.reviewData.error_code === null) {
    reviewName = props.reviewData.resources[0].name
    Description = props.reviewData.resources[0].description
    Category = props.reviewData.resources[0].review_category
    Reviewer = props.reviewData.resources[0].reviewer
    Approver = props.reviewData.resources[0].approver
    Artefact = props.reviewData.resources[0].review_artefact_name
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
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Name</label>
                    <div className='col-8'>
                      <span>{reviewName}</span>
                    </div>
                  </div>
                  <div className='m-section m-section--last'>
                    <div className='m-section__content'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <span className='m-list-search__result-category m-list-search__result-category--first'>
                                          Review Details
                                      </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Description</b></div>
                                  <div className='col-8'><p>{Description}</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Review Category</b></div>
                                  <div className='col-8'><p>{Category}</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Reviewer</b></div>
                                  <div className='col-8'><p>{Reviewer}</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Approver</b></div>
                                  <div className='col-8'><p>{Approver}</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Review Artefact</b></div>
                                  <div className='col-8'><p>{Artefact}</p></div>
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
              <div className='col-md-6'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Selected Check Items
                                    </span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-7 col-form-label'>Has Cloud Solution been considered</label>
                                <div className='col-5 float-right' />
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
                {props.isApproved === 'Rejected' && (<div className='form-group m-form__group row'>
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
    ReviewApproval.propTypes = {
      match: PropTypes.any,
      reviewData: PropTypes.any,
      isApproved: PropTypes.any,
      setRejectedReason: PropTypes.func,
      rejectedReason: PropTypes.any
 }
