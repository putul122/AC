import React from 'react'
// import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import Select from 'react-select'

export default function AddTemplate (props) {
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <br />
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                <div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='form-group m-form__group has-danger'>
                      <input type='text' className='form-control m-input' value={''} placeholder='Trmplate Name' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <a href='/templates' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={''} className='btn btn-outline-info btn-sm'>Save</button>
                    </div>
                  </div>
                </div>
                {/* <h3 className='m-portlet__head-text'>
                  Basic Portlet <small>portlet sub title</small>
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-5'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Details
                                    </span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Category</label>
                                <div className='col-8'>
                                  <Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Category'
                                    isClearable
                                    // defaultValue={dvalue}
                                    // onChange={handleRelationshipPropertySelect(index, childIndex)}
                                    isSearchable={false}
                                    name={'roleSelected'}
                                    // options={childPropertyOption}
                                  />
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
              <div className='col-md-7 pull-right'>
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
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Select Check Item</label>
                                <div className='col-6'>
                                  <Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Check Item'
                                    isClearable
                                    // defaultValue={dvalue}
                                    // onChange={handleRelationshipPropertySelect(index, childIndex)}
                                    isSearchable={false}
                                    name={'roleSelected'}
                                    // options={childPropertyOption}
                                  />
                                </div>
                                <div className='col-2'>
                                  <button type='button' className='btn btn-outline-info btn-sm'>Add</button>
                                </div>
                              </div>
                            </span>
                            <span className='m-list-search__result-item'>
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
                                            <span className='m-list-search__result-item-icon'><i className='flaticon-interface-3 m--font-warning' /></span>
                                            <span className='m-list-search__result-item-text'>Annual finance report</span>
                                            <button type='button' className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
                                          </span>
                                          <span className='m-list-search__result-item'>
                                            <span className='m-list-search__result-item-icon'><i className='flaticon-share m--font-success' /></span>
                                            <span className='m-list-search__result-item-text'>Company meeting schedule</span>
                                            <button type='button' className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
                                          </span>
                                          <span className='m-list-search__result-item'>
                                            <span className='m-list-search__result-item-icon'><i className='flaticon-paper-plane m--font-info' /></span>
                                            <span className='m-list-search__result-item-text'>Project quotations</span>
                                            <button type='button' className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
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
          </div>
        </div>
      </div>
      )
    }
    AddTemplate.propTypes = {
    // agreements: PropTypes.any,
    // agreementsSummary: PropTypes.any,
    // currentPage: PropTypes.any,
    // addAgreementSettings: PropTypes.any,
    // perPage: PropTypes.any
 }
