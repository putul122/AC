import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import Select from 'react-select'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function ReviewDraft (props) {
  let checkItemsOptions = []
  let relationsOptions = []
  let artefactsOptions = []
  let checkItemList = ''
  let contextId = props.match.params.id
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  if (props.reviewArtefacts && props.reviewArtefacts !== '') {
    if (props.reviewArtefacts.error_code === null) {
      artefactsOptions = props.reviewArtefacts.resources.map(function (data, index) {
        data.label = data.name
        return data
      })
    }
  }
  if (props.componentTypeRelations && props.componentTypeRelations !== '') {
    if (props.componentTypeRelations.error_code === null) {
      relationsOptions = props.componentTypeRelations.resources.map(function (data, index) {
        data.label = data.name
        return data
      })
    }
  }
  if (props.reviewCheckitems && props.reviewCheckitems !== '') {
    if (props.reviewCheckitems.error_code === null) {
      checkItemsOptions = props.reviewCheckitems.resources.map(function (data, index) {
        data.label = data.name
        return data
      })
      console.log('check opt', checkItemsOptions)
    }
  }
  let handleCancelReason = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.cancelReason = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleNameChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.name = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleDescriptionChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.description = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleCategoryChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.category = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleReviewerChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.reviewer = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleApproverChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.approver = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleCancel = function (event) {
    console.log('event cancel', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.isCancel = event.target.checked
    props.setDraftEditData(draftEdit)
  }

  let handleCheckItemSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      let selectedCheckItem = newValue
      console.log(newValue)
      props.setSelectedCheckItem(selectedCheckItem)
    }
    if (actionMeta.action === 'clear') {
      let selectedCheckItem = null
      props.setSelectedCheckItem(selectedCheckItem)
    }
  }
  let handleRelationsSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      let connectArtefactSettings = {...props.connectArtefactSettings, 'selectedRelations': newValue}
      props.setConnectArtefactSettings(connectArtefactSettings)
    }
    if (actionMeta.action === 'clear') {
      let connectArtefactSettings = {...props.connectArtefactSettings, 'selectedRelations': null}
      props.setConnectArtefactSettings(connectArtefactSettings)
    }
  }
  let openConnectModal = function (event) {
    let connectArtefactSettings = {...props.connectArtefactSettings, 'isModalOpen': true, 'selectedRelations': null}
    props.setConnectArtefactSettings(connectArtefactSettings)
  }
  let closeModal = function (event) {
    let connectArtefactSettings = {...props.connectArtefactSettings, 'isModalOpen': false, 'isConnected': true}
    props.setConnectArtefactSettings(connectArtefactSettings)
  }
  let disconnectArtefact = function (event) {
    let connectArtefactSettings = {...props.connectArtefactSettings, 'isConnected': false}
    props.setConnectArtefactSettings(connectArtefactSettings)
  }
  let addcheckItem = function () {
    let selectedCheckItem = null
    props.setSelectedCheckItem(selectedCheckItem)
    let checkItems = props.draftEdit.checkItems || []
    console.log(props)
    if (props.selectedCheckItem !== null) {
      checkItems.push(props.selectedCheckItem.label)
      let draftEdit = {...props.draftEdit}
      draftEdit.checkItems = checkItems
      props.setDraftEditData(draftEdit)
      let obj = {}
      obj.op = 'add'
      obj.path = '/check_items/-'
      obj.value = props.selectedCheckItem.label
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
  }
  let removeCheckItem = function (index) {
    // if (props.userActionSettings.isUpdateModalOpen) {
    //   let obj = {}
    //   obj.op = 'remove'
    //   obj.path = '/roles/' + index
    //   let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
    //   updatePayload.push(obj)
    //   props.setUpdatePayload(updatePayload)
    // }
    let checkItems = props.draftEdit.checkItems || []
    let removeCheckItem = checkItems.splice(index, 1)
    console.log('removeCheckItem', removeCheckItem)
    let draftEdit = {...props.draftEdit}
    draftEdit.checkItems = checkItems
    props.setDraftEditData(draftEdit)
  }
  let saveReview = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let updatePayload = []
    let draftEdit = JSON.parse(JSON.stringify(props.draftEdit))
    delete draftEdit.checkItems
    for (let x in draftEdit) {
      if (draftEdit.hasOwnProperty(x)) {
        let obj = {}
        obj.op = 'replace'
        obj.path = '/' + x
        obj.value = props.draftEdit[x]
        updatePayload.push(obj)
      }
    }

    if (props.updatePayload.length > 0) {
      updatePayload = updatePayload.concat(props.updatePayload)
    }
    console.log('update payload', updatePayload)
    props.updateReviews(updatePayload)
  }
  let submitReview = function (event) {
    let updatePayload = []
    let draftEdit = JSON.parse(JSON.stringify(props.draftEdit))
    delete draftEdit.checkItems
    for (let x in draftEdit) {
      if (draftEdit.hasOwnProperty(x)) {
        let obj = {}
        obj.op = 'replace'
        obj.path = '/' + x
        obj.value = props.draftEdit[x]
        updatePayload.push(obj)
      }
    }

    if (props.updatePayload.length > 0) {
      updatePayload = updatePayload.concat(props.updatePayload)
    }

    let obj = {}
    obj.op = 'replace'
    obj.path = '/stage'
    obj.value = 'Approval'
    updatePayload.push(obj)

    if (props.draftEdit.isCancel) {
      if (props.draftEdit.cancelReason !== null && props.draftEdit.cancelReason !== '') {
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        console.log('update payload', updatePayload)
        props.updateReviews(updatePayload)
      }
    } else {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      console.log('update payload', updatePayload)
      props.updateReviews(updatePayload)
    }
  }
  let connectArtefact = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.componentId = 1
    payload.relationship = []
    props.updateComponentRelationships(payload)
  }
  if (props.draftEdit.checkItems) {
    if (props.draftEdit.checkItems.length > 0) {
      checkItemList = props.draftEdit.checkItems.map(function (data, index) {
        return (<span className='m-list-search__result-item'>
          <span className='m-list-search__result-item-text'>{data}</span>
          <button type='button' onClick={() => { removeCheckItem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
        </span>)
      })
    } else {
      checkItemList = ''
    }
  }
  console.log(props)
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
              <div className='col-md-6 col-12'>
                <div className='m-form m-form--state m-form--fit m-form--label-align-right'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='text' placeholder='Enter Review Name' value={props.draftEdit.name} onChange={handleNameChange} id='example-userName-input' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label>
                    <div className='col-8'>
                      {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                      <textarea className='form-control m-input m-input--air' onChange={handleDescriptionChange} value={props.draftEdit.description} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Select Category</label>
                    <div className='col-8'>
                      {/* <Select
                        // className='col-7 input-sm m-input'
                        placeholder='Select Category'
                        isClearable
                        // defaultValue={dvalue}
                        // value={props.userActionSettings.selectedRole}
                        // onChange={handleTemplateSelect}
                        isSearchable={false}
                        name={'templateSelected'}
                        // options={templateOptions}
                      /> */}
                      <input className='form-control m-input' type='text' onChange={handleCategoryChange} placeholder='Enter Category' value={props.draftEdit.category} />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Reviewer</label>
                    <div className='col-8'>
                      <input className='form-control m-input' onChange={handleReviewerChange} type='text' placeholder='Enter Reviewer' value={props.draftEdit.reviewer} />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Approver</label>
                    <div className='col-8'>
                      <input className='form-control m-input' onChange={handleApproverChange} type='text' placeholder='Enter Approver' value={props.draftEdit.approver} />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Artefact</label>
                    <div className='col-8'>
                      <div className='row'>
                        <div className='col-md-5'><span>Connect to Artefact</span></div>
                        <div className='col-md-7'>
                          <button onClick={openConnectModal} className='btn btn-outline-info btn-sm pull-left'>Connect</button>
                          <button onClick={disconnectArtefact} className='btn btn-outline-info btn-sm '>Disconnect</button>
                        </div>
                        {/* <div className='col-md-5 float-right'>
                          <button onClick={disconnectArtefact} className='btn btn-outline-info btn-sm pull-right'>Disconnect</button>
                        </div> */}
                      </div>
                      <br />
                      <div className='form-group m-form__group row'>
                        &nbsp;&nbsp;&nbsp;<label htmlFor='cancelReview' className='checkbox checkbox--danger'>
                          <input type='checkbox' checked={props.draftEdit.isCancel} onChange={handleCancel} /> Cancel Review
                          <span />
                        </label>
                      </div>
                    </div>
                  </div>
                  {props.draftEdit.isCancel && (<div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Cancel Reason</label>
                    <div className='col-8'>
                      {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                      <textarea className='form-control m-input m-input--air' value={props.draftEdit.cancelReason} onChange={handleCancelReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                    </div>
                  </div>)}
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Status</label>
                    <div className='col-8'>{''}</div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Reason</label>
                    <div className='col-8'>{''}</div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='col-12'>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-4 col-form-label'>Select Check Item</label>
                    <div className='col-6'>
                      <Select
                        // className='col-7 input-sm m-input'
                        placeholder='Select Check Item'
                        isClearable
                        // defaultValue={dvalue}
                        value={props.selectedCheckItem}
                        onChange={handleCheckItemSelect}
                        isSearchable={false}
                        name={'templateSelected'}
                        options={checkItemsOptions}
                      />
                    </div>
                    <div className='col-2'>
                      <button type='button' onClick={addcheckItem} className='btn btn-outline-info btn-sm'>Add</button>
                    </div>
                  </div>
                </div>
                <div className='m-section m-section--last'>
                  <div className='m-section__content'>
                    <div className='m-demo'>
                      <div className='m-demo__preview'>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>
                                        Selected Check Items
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
        <div>
          <ReactModal isOpen={props.connectArtefactSettings.isModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Connect Artefact</h6>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
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
                            value={props.connectArtefactSettings.selectedRelations}
                            onChange={handleRelationsSelect}
                            isSearchable={false}
                            name={'relationsSelected'}
                            options={relationsOptions}
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
                            name={'artefactSelected'}
                            options={artefactsOptions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeModal} className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' onClick={connectArtefact} className={'btn btn-sm btn-outline-info'}>Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        <Discussion name={props.draftEdit.name} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={props.draftEdit.name} type='Component' {...props} />
      </div>
      )
    }
    ReviewDraft.propTypes = {
    match: PropTypes.any,
    connectArtefactSettings: PropTypes.any,
    selectedCheckItem: PropTypes.any,
    // eslint-disable-next-line
    updatePayload: PropTypes.any,
    reviewCheckitems: PropTypes.any,
    draftEdit: PropTypes.any,
    componentTypeRelations: PropTypes.any,
    reviewArtefacts: PropTypes.any
 }
