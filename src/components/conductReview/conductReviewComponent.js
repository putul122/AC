import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'
import Select from 'react-select'
import api from '../../constants'

export default function ConductReview (props) {
  console.log('props conduct', props)
  let reviewName = ''
  let ReviewStatus = ''
  let ReviewReason = ''
  let documentReference = ''
  let documentVersion = ''
  let documentHyperLink = 'javascript:void(0);'
  let Artefact = ''
  let Artefectid = ''
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
  let openComponentModal = function () {
    if (Artefectid !== null && Artefectid !== '') {
      let payload = {}
      payload.isModalOpen = true
      payload.componentId = Artefectid
      payload.callAPI = true
      props.setModalSettings(payload)
    } else {
      alert('Artefact Id not set')
    }
  }
  let onRadioChange = function (value) {
    props.setComplaint(value)
  }
  let handleCommentChange = function (comment, data) {
    console.log(data, comment)
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    data.compliance_comment = comment
    let index = _.findIndex(checkItems, function (obj) { return obj.id === data.id })
    console.log('index', index)
    if (index >= 0) {
      checkItems[index] = data
      console.log(data)
      console.log('checkItems', checkItems)
      props.setCheckItems(checkItems)
    } else {
      console.log('else')
    }
  }
  let onCheckItemRadioChange = function (compliance, data) {
    console.log(data, compliance)
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    data.compliance = compliance
    let index = _.findIndex(checkItems, function (obj) { return obj.id === data.id })
    console.log('index', index)
    if (index >= 0) {
      checkItems[index] = data
      console.log(data)
      console.log('checkItems', checkItems)
      props.setCheckItems(checkItems)
    } else {
      console.log('else')
    }
  }
  let onCheckItemCheckboxChange = function (isChecked, compliance, data) {
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    if (isChecked) {
      data.compliance = compliance
    } else {
      data.compliance = null
      data.compliance_comment = null
    }
    let index = _.findIndex(checkItems, function (obj) { return obj.id === data.id })
    if (index >= 0) {
      checkItems[index] = data
      props.setCheckItems(checkItems)
    } else {
      console.log('else')
    }
  }
  let handleCheckItemSelectOption = function (data) {
    return function (newValue: any, actionMeta: any) {
      console.group('Value Changed first select')
      console.log(newValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
      console.log('data', data)
      let checkItems = JSON.parse(JSON.stringify(props.checkItems))
      let index = _.findIndex(checkItems, function (obj) { return obj.id === data.id })
      console.log('index', index)
      if (actionMeta.action === 'select-option') {
        if (index >= 0) {
          data.compliance = newValue.name
          checkItems[index] = data
          props.setCheckItems(checkItems)
        } else {
          console.log('else')
        }
      }
      if (actionMeta.action === 'clear') {
        if (index >= 0) {
          data.compliance = null
          data.compliance_comment = null
          checkItems[index] = data
          props.setCheckItems(checkItems)
        } else {
          console.log('else')
        }
      }
    }
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
    ReviewStatus = props.reviewData.resources[0].status
    ReviewReason = props.reviewData.resources[0].reason
    documentReference = props.reviewData.resources[0].document_reference
    documentVersion = props.reviewData.resources[0].document_version
    if (documentReference !== '' && documentReference !== null) {
      documentHyperLink = api.documentReferenceLink + documentReference
    }
    // let complianceStatus = props.reviewData.resources[0].compliance_status || ''
    // props.setComplaint(complianceStatus)
    Artefact = props.reviewData.resources[0].review_artefact_name
    Artefectid = props.reviewData.resources[0].review_artefact_id
  }
  if (props.checkItems.length > 0) {
    let notToDisplay = []
    props.checkItems.forEach(function (data, index) {
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
    let checkItems = props.checkItems.map(function (data, index) {
      if (notToDisplay.includes(data.id)) {
        data.display = false
      } else {
        data.display = true
      }
      return data
    }) || []
    console.log('check item render', checkItems)
    checkItemList = _.filter(checkItems, function (checkItem) {
          return checkItem.display
      }).map(function (data, index) {
      console.log('checkitem data', data)
      if (data.type === null || data.type === 'Radio') {
        let valueList = ''
        if (data.values.length > 0) {
          valueList = data.values.map(function (valueData, valueIndex) {
            return (<span><label htmlFor='example-email-input' className=''>
              <input type='radio' name={'checkitems_' + index + '_' + valueIndex} value={valueData.name} checked={data.compliance === valueData.name} onChange={(e) => onCheckItemRadioChange(valueData.name, data)} /> {valueData.name + '  '}
              <span />
            </label>&nbsp;&nbsp;&nbsp;</span>)
          })
        }
        console.log('valueList', valueList, typeof valueList)
        return (<span className='m-list-search__result-item' key={index}>
          <div className='form-group m-form__group row'>
            <label htmlFor='example-email-input' className='col-3 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
            <div className='col-9 float-left' >
              <div className='m-radio-inline pull-left' style={{width: '100%'}}>
                <div className='row pull-left' style={{width: '100%'}}>
                  <div className='col-md-4'>
                    {valueList}
                  </div>
                  <div className='col-md-8'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='example-email-input' className='col-2'><b>Comment</b></label>
                      <div className='col-10'>
                        <input type='text' className='form-control lg-input' value={data.compliance_comment || ''} onChange={(event) => { handleCommentChange(event.target.value, data) }} name='example_8' />
                      </div>
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
            return (<span><label htmlFor='example-email-input' className=''>
              <input type='checkbox' name={'checkitems_' + index + '_' + valueIndex} value={valueData.name} checked={data.compliance === valueData.name} onChange={(e) => onCheckItemCheckboxChange(e.target.checked, valueData.name, data)} /> {valueData.name + '  '}
              <span />
            </label>&nbsp;&nbsp;&nbsp;</span>)
          })
        }
        console.log('valueList', valueList, typeof valueList)
        return (<span className='m-list-search__result-item' key={index}>
          <div className='form-group m-form__group row'>
            <label htmlFor='example-email-input' className='col-3 col-form-label'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></label>
            <div className='col-9 float-left' >
              <div className='row pull-left' style={{width: '100%'}}>
                <div className='col-md-4'>
                  {valueList}
                </div>
                <div className='col-md-8'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-2'><b>Comment</b></label>
                    <div className='col-10'>
                      <input type='text' className='form-control lg-input' value={data.compliance_comment || ''} onChange={(event) => { handleCommentChange(event.target.value, data) }} name='example_8' />
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
                    onChange={handleCheckItemSelectOption(data)}
                    // isSearchable={false}
                    name={'dropdown'}
                    options={dropdownOptions}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-2'><b>Comment</b></label>
                    <div className='col-10'>
                      <input type='text' className='form-control lg-input' value={data.compliance_comment || ''} onChange={(event) => { handleCommentChange(event.target.value, data) }} name='example_8' />
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
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    let obj = {}
    if (props.complaint !== '') {
      obj = {}
      obj.op = 'replace'
      obj.path = '/compliance_status'
      obj.value = props.complaint
      updatePayload.push(obj)
    }
    if (props.reason.trim() !== '') {
      obj = {}
      obj.op = 'replace'
      obj.path = '/reason'
      obj.value = props.reason
      updatePayload.push(obj)
    }
    // Set payload for checkItems Value
    if (props.checkItems.length > 0) {
      props.checkItems.forEach(function (data, index) {
        obj = {}
        obj.op = 'replace'
        obj.path = '/check_items/' + index + '/compliance'
        obj.value = data.compliance
        updatePayload.push(obj)
        obj = {}
        obj.op = 'replace'
        obj.path = '/check_items/' + index + '/compliance_comment'
        obj.value = data.compliance_comment
        updatePayload.push(obj)
      })
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
    let obj = {}
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
    // Set payload for checkItems Value
    if (props.checkItems.length > 0) {
      props.checkItems.forEach(function (data, index) {
        obj = {}
        obj.op = 'replace'
        obj.path = '/check_items/' + index + '/compliance'
        obj.value = data.compliance
        updatePayload.push(obj)
        obj = {}
        obj.op = 'replace'
        obj.path = '/check_items/' + index + '/compliance_comment'
        obj.value = data.compliance_comment
        updatePayload.push(obj)
      })
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
      let cancelledId = _.result(_.find(props.reviewProperties.stages, function (obj) {
        return obj.name === 'Cancelled'
      }), 'id')
      // set Cancel stage
      let obj = {}
      obj.op = 'replace'
      obj.path = '/stage'
      obj.value = cancelledId
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
          <div className='col-xs-4 col-sm-6 col-md-8' ><h2>Conduct Review</h2></div>
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
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
                      {Artefact && (<a href='javascript:void(0);' onClick={openComponentModal} >{Artefact}</a>)}
                      {!Artefact && (<span>Not Connected</span>)}
                      {/* <a href={'/review_artefact/' + Artefectid}>{Artefact}</a> */}
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
                      <span className='m-input' >{documentReference && (<a href={documentHyperLink} >{documentReference}</a>)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row' style={{width: '100%'}}>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'><b>Compliant?</b></label>
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

            {ReviewStatus === 'Not Accepted' && (<div className='row' style={{width: '100%'}}>
              <div className='col-md-12'>
                <div className='form-group m-form__group row'>
                  <label htmlFor='example-email-input' className='col-4'><b>Not Accepted Reason</b></label>
                  <div className='col-8'>
                    {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                    <span className='m-input m-input--air'>{ReviewReason}</span>
                  </div>
                </div>
              </div>
            </div>)}
            <div className='m-form m-form--state m-form--fit'>
              <div className='row' style={{width: '100%'}}>
                <div className='col-md-12'>
                  {/* m-checkbox m-checkbox--danger */}
                  &nbsp;&nbsp;&nbsp;<label htmlFor='cancelReview' className=''>
                    <input type='checkbox' checked={props.checkboxSelected.draft} onChange={(event) => { handleCheckbox('Draft') }} /> <b>Return to Draft</b>
                    <span />
                  </label>
                </div>
                {props.checkboxSelected.draft && (<div className='col-md-12 m-demo'>
                  <div className={props.validationClass.draft}>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Reason<span className='text-danger'>*</span></label>
                    <div className='col-8 m-demo__preview'>
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
                  {/* <button onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                  <button onClick={saveReview} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                  <button onClick={submitReview} className='btn btn-outline-info btn-sm'>Submit</button> */}
                  <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                    <button type='button' onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='m-btn btn btn-secondary'>Close</button>
                    <button type='button' onClick={saveReview} className='m-btn btn btn-secondary'>Save</button>
                    <button onClick={submitReview} className='m-btn btn btn-secondary'>Submit</button>&nbsp;&nbsp;
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
    ConductReview.propTypes = {
      match: PropTypes.any,
      reviewData: PropTypes.any,
      reason: PropTypes.any,
      reviewProperties: PropTypes.any,
      complaint: PropTypes.any,
      // returnToDraft: PropTypes.any,
      // cancelReview: PropTypes.any,
      checkboxSelected: PropTypes.any,
      checkItems: PropTypes.any,
      validationClass: PropTypes.any,
      updateReviews: PropTypes.func,
      createDiscussion: PropTypes.func,
      // setComplaint: PropTypes.func,
      setValidationClass: PropTypes.func
  }
