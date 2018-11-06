import React from 'react'
import Select from 'react-select'
// import moment from 'moment'
// import PropTypes from 'prop-types'
// import styles from './addcheckItemComponent.scss'
// import DataModelComponent from '../dataModel/dataModelComponent'
// import _ from 'lodash'
// import ReactModal from 'react-modal'
// import Select from 'react-select'
// import CreatableSelect from 'react-select/lib/Creatable'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// ReactModal.setAppElement('#root')
// const NEWCOMPONENT = '99999'
// const customStylescrud = { content: { top: '20%', background: 'none', border: '0px', overflow: 'none' } }
// var divStyle = {
//   width: '900px',
//   height: '600px',
//   // 'overflowY': 'scroll',
//   // 'overflowX': 'scroll',
//   'border': '1px solid #000000',
//   'background-color': '#FFFFFF'
// }
// const formatAmount = (x) => {
//   let parts = x.toString().split('.')
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//   if (typeof parts[1] !== 'undefined') {
//     parts[1] = parts[1].substring(0, 2)
//   }
//   return parts.join('.')
// }
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     border: 'none',
//     background: 'none',
//     transform: 'translate(-50%, -50%)'
//   }
// }

export default function addcheckItem (props) {
  console.log('ED C', props)
  // let entitlementName = ''
  // let entitlementDescription = ''
  // let entitlementPurchased = ''
  // let entitlementConsumed = ''
  // let entitlementCost = ''
  // if (props.entitlement && props.entitlement !== '') {
  //   entitlementName = props.entitlement.resources[0].name
  //   entitlementDescription = props.entitlement.resources[0].description
  //   entitlementPurchased = props.entitlement.resources[0].purchased
  //   entitlementConsumed = props.entitlement.resources[0].consumption_ratio_percent || ''
  //   entitlementCost = props.entitlement.resources[0].cost
  // }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <br />
          <div className='m-portlet__head' style={{'height': '50%'}}>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                <div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='form-group m-form__group has-danger'>
                      <input type='text' className='form-control m-input m--margin-top-10' value={''} placeholder='Check Item Name' aria-describedby='basic-addon2' />
                      <input type='text' className='form-control m-input m--margin-top-10' value={''} placeholder='Check Item Description' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right m--margin-top-10'>
                    <div className='pull-right'>
                      <a href='/checkitems' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={''} className='btn btn-outline-info btn-sm'>Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='row'>
              <div className='col-xl-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Details</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Type</label>
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
                            <span className='m-list-search__result-item'>
                              <div className='m-section m-section--last'>
                                <div className='m-section__content'>
                                  <div className='m-demo'>
                                    <div className='m-demo__preview'>
                                      <div className='m-list-search'>
                                        <div className='m-list-search__results'>
                                          <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                      Values
                                                  </span>
                                          <div className='form-group m-form__group m--margin-top-30 row'>
                                            {/* <label htmlFor='example-text-input' className='col-1 col-form-label'>Type</label> */}
                                            <div className='col-10'>
                                              <input className='form-control m-input' type='text' defaultValue='Artisanal kale' id='example-text-input' />
                                            </div>
                                            <button className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                          </div>
                                          <span className='m-list-search__result-item'>
                                            <div className='m-section m-section--last'>
                                              <div className='m-section__content'>
                                                <div className='m-demo'>
                                                  <div className='m-demo__preview'>
                                                    <div className='m-list-search'>
                                                      <div className='m-list-search__results'>
                                                        <span className='m-list-search__result-item'>
                                                          <span className='m-list-search__result-item-text'>Yes</span>
                                                          <button type='button' className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
                                                        </span>
                                                        <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                                    Select Check Item
                                                                </span>
                                                        <div className='form-group m-form__group m--margin-top-30 row'>
                                                          {/* <label htmlFor='example-text-input' className='col-1 col-form-label'>Type</label> */}
                                                          <div className='col-10'>
                                                            <input className='form-control m-input' type='text' defaultValue='Artisanal kale' id='example-text-input' />
                                                          </div>
                                                          <button className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                                        </div>
                                                        <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                                    Selected Check Item
                                                                </span>
                                                        <div className='m-demo__preview' />
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
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Principles</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label>
                                <div className='col-6'>
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
                                <button className='btn btn-outline-info col-2 btn-sm'>Add</button>
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
                                                     Selected Principles
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
              <div className='col-xl-4'>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Standards</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label>
                                <div className='col-6'>
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
                                <button className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                <button className='btn btn-outline-info col-2 btn-sm'>New</button>
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
                                                     Selected Standards
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
    addcheckItem.propTypes = {
    // entitlement: PropTypes.any
    // entitlementProperties: PropTypes.any,
    // entitlementRelationships: PropTypes.any,
    // updateEntitlementSettings: PropTypes.any,
    // isEditComponent: PropTypes.any,
    // entitlementPropertiesPayload: PropTypes.any,
    // copiedEntitlementProperties: PropTypes.any,
    // copiedEntitlementData: PropTypes.any,
    // relationshipPropertyPayload: PropTypes.any,
    // relationshipProperty: PropTypes.any,
    // relationshipActionSettings: PropTypes.any,
    // addNewConnectionSettings: PropTypes.any,
    // componentTypeComponentConstraints: PropTypes.any,
    // componentTypeComponents: PropTypes.any
 }
