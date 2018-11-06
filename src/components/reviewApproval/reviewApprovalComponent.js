import React from 'react'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import Select from 'react-select'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function ReviewApproval (props) {
  let reviewName = ''
  console.log(reviewName)
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className='m-portlet__body'>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Name</label>
                    <div className='col-8'>
                      <span>C12345 HLD Review</span>
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
                                  <div className='col-8'><p>Some Description</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Select Category</b></div>
                                  <div className='col-8'><p>Application Architecture Compliance Review</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Reviewer</b></div>
                                  <div className='col-8'><p>Louis Horn</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Approver</b></div>
                                  <div className='col-8'><p>Naas Rautenbach</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Review Artefact</b></div>
                                  <div className='col-8'><p>C12345</p></div>
                                </div>
                              </span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  {/* <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label> */}
                                  <div className='col-4'><b>Description</b></div>
                                  <div className='col-8'><p>Some Description</p></div>
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
              <div className='col-12'>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-3 col-form-label'>Review Approved*</label>
                  <div className='col-9 float-right'>
                    <div className='m-radio-inline'>
                      <label htmlFor='example-email-input' className='m-radio'>
                        <input type='radio' name='example_8' value='1' /> Approved
                        <span />
                      </label>
                      <label htmlFor='example-email-input' className='m-radio'>
                        <input type='radio' name='example_8' value='2' /> Rejected
                        <span />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason*</label>
                  <div className='col-8'>
                    {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                    <textarea className='form-control m-input m-input--air' id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-6' />
              <div className='col-6 float-right'>
                <div className='pull-right'>
                  <button onClick={''} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                  <button onClick={''} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                  <button onClick={''} className='btn btn-outline-info btn-sm'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal isOpen={''}
            onRequestClose={''}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Connect Artefact</h6>
                    <button type='button' onClick={''} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-lg-12'>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-6 col-form-label'>Select Relationship & Artefact Type</label>
                        <div className='col-6'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Relationship & Artefact Type'
                            isClearable
                            // defaultValue={dvalue}
                            // value={props.userActionSettings.selectedRole}
                            // onChange={handleTemplateSelect}
                            isSearchable={false}
                            name={'templateSelected'}
                            // options={templateOptions}
                          />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-6 col-form-label'>Select Artefact</label>
                        <div className='col-6'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Artefact'
                            isClearable
                            // defaultValue={dvalue}
                            // value={props.userActionSettings.selectedRole}
                            // onChange={handleTemplateSelect}
                            isSearchable={false}
                            name={'templateSelected'}
                            // options={templateOptions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={''} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' className={'btn btn-sm btn-outline-info'} onClick={''}>Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    ReviewApproval.propTypes = {
    // agreementsSummary: PropTypes.any,
    // currentPage: PropTypes.any,
    // addAgreementSettings: PropTypes.any,
    // perPage: PropTypes.any
 }
