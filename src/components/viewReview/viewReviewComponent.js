import React from 'react'
import PropTypes from 'prop-types'
import './viewReviewComponent.scss'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'
import Select from 'react-select'
import _ from 'lodash'
import api from '../../constants'

export default function ViewReview (props) {
  console.log('*****', props.reviewbyId)
  let reviewname
  let reviewdescription
  let reviewstage
  let Reviewer = ''
  let Approver = ''
  let documentReference = ''
  let documentVersion = ''
  let documentHyperLink = 'javascript:void(0);'
  // let reviewId
  let ReviewCategory = ''
  let ReviewArtefact = ''
  let reviewArtefactId = ''
  let contextId = props.match.params.id
  let checkItemList = ''
  let complianceStatus = ''
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let openModal = function (data) {
    console.log('run me')
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
  // console.log(props.agreementsSummary, props.agreements, props.currentPage)
  if (props.reviewbyId && props.reviewbyId !== '') {
    // reviewId = props.reviewbyId.resources[0].id
    reviewname = props.reviewbyId.resources[0].name
    reviewdescription = props.reviewbyId.resources[0].description
    reviewstage = props.reviewbyId.resources[0].stage
    Approver = props.reviewbyId.resources[0].approver
    Reviewer = props.reviewbyId.resources[0].reviewer
    ReviewCategory = props.reviewbyId.resources[0].review_category
    ReviewArtefact = props.reviewbyId.resources[0].review_artefact_name
    reviewArtefactId = props.reviewbyId.resources[0].review_artefact_id
    complianceStatus = props.reviewbyId.resources[0].compliance_status
    documentReference = props.reviewbyId.resources[0].document_reference
    documentVersion = props.reviewbyId.resources[0].document_version
    if (documentReference !== '' && documentReference !== null) {
      documentHyperLink = api.documentReferenceLink + documentReference
    }
    if (props.reviewbyId.resources[0].check_items.length > 0) {
      let notToDisplay = []
      props.reviewbyId.resources[0].check_items.forEach(function (data, index) {
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
      let checkItems = props.reviewbyId.resources[0].check_items.map(function (data, index) {
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
  //  let openPrincipleModal = function (event) {
  //   event.preventDefault()
  //   props.setPrincipleModalOpenStatus(true)
  //   // props.setModalOpenStatus(false)
  //   console.log('props', props.setModalOpenStatus)
  //  }
  //  let openStandardModal = function (event) {
  //   event.preventDefault()
  //   props.setStandardModalOpenStatus(true)
  //   // props.setModalOpenStatus(false)
  //   console.log('props', props.setStandardModalOpenStatus)
  //  }
  // let closeModal = function () {
  //   props.setModalOpenStatus(false)
  // }
  // let closePrincipleModal = function () {
  //   props.setPrincipleModalOpenStatus(false)
  // }
  // let closeStandardModal = function () {
  //   props.setStandardModalOpenStatus(false)
  // }
    return (
      <div>
        <div className='row clearfix'>
          <div className='col-xs-4 col-sm-6 col-md-8' ><h2>Review Details</h2></div>
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
              <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button>
            </span>
          </div>
        </div>
        <br />
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className=''>
            <div className=''>
              <div className='m-portlet__body'>
                <div className='row'>
                  <div className='col-xl-6'>
                    <div className='m-section m-section--last'>
                      <div className='m-section__content'>
                        <div className='m-demo'>
                          <div className='m-demo__preview'>
                            <div className='m-list-search'>
                              <div className='m-list-search__results'>
                                <span className='m-list-search__result-category m-list-search__result-category--first'>Review Details</span>
                                <div className='m-widget13'>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text' style={{'width': '25%', 'color': '#000000'}}>
                                      Name:
                                    </span>
                                    <span className='m-widget13__text'>{reviewname}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text' style={{'width': '25%', 'color': '#000000'}}>
                                      Description:
                                    </span>
                                    <span className='m-widget13__text'>{reviewdescription}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                      Review Category:
                                    </span>
                                    <span className='m-widget13__text'>{ReviewCategory}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                    Reviewer:
                                    </span>
                                    <span className='m-widget13__text'>{Reviewer}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                    Approver:
                                    </span>
                                    <span className='m-widget13__text'>{Approver}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                    Review Artefact:
                                    </span>
                                    <span className='m-widget13__text'>
                                      {ReviewArtefact && (<a href='javascript:void(0);' onClick={openComponentModal} >{ReviewArtefact}</a>)}
                                      {!ReviewArtefact && (<span>Not Connected</span>)}
                                      {/* <a href='javascript:void(0);' onClick={openComponentModal} >{ReviewArtefact}</a> */}
                                    </span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                    Review Document No:
                                    </span>
                                    <span className='m-widget13__text'>{documentReference && (<a href={documentHyperLink} >{documentReference}</a>)}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                    Review Document Version:
                                    </span>
                                    <span className='m-widget13__text'>{documentVersion}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                      Review Stage:
                                    </span>
                                    <span className='m-widget13__text  m--font-brand'>{reviewstage}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder m-widget13__text-bolder' style={{'width': '25%', 'color': '#000000'}}>
                                      Compliance Status:
                                    </span>
                                    <span className='m-widget13__text  m--font-brand'>{complianceStatus}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6'>
                    <div className='m-section m-section--last'>
                      <div className='m-section__content'>
                        <div className='m-demo'>
                          <div className='m-demo__preview'>
                            <div className='m-list-search'>
                              <div className='m-list-search__results'>
                                <span className='m-list-search__result-category m-list-search__result-category--first'>Selected Check Items</span>
                                {checkItemList}
                                {/* <div className='m-widget13'>
                                  <div className='m-widget13__item row'>
                                    <div className='col-sm-12 m-radio-inline'>
                                      <label htmlFor='example-text-input'>
                                        <a href='' style={{'margin': '20px'}} onClick={openModal}>Has Cloud Solution been considered</a>
                                      </label>
                                      <label htmlFor='example-text-input' className='m-radio'>
                                        <input type='radio' name='example_3' value='1' />Yes
                                        <span />
                                      </label>
                                      <label htmlFor='example-text-input' className='m-radio'>
                                        <input type='radio' name='example_3' value='2' />No
                                        <span />
                                      </label>
                                      <label htmlFor='example-text-input'>
                                        <span style={{'margin': '20px'}}>No affordable options available </span>
                                      </label>
                                    </div>
                                  </div>
                                </div> */}
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
        </div>
        <Discussion name={reviewname} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={reviewname} type='Component' {...props} />
        <CheckItemModal />
      </div>
      )
    }
    ViewReview.propTypes = {
      match: PropTypes.any,
      // setModalSetting: PropTypes.func,
      reviewbyId: PropTypes.any
      // clickCheckItemData: PropTypes.any
 }
