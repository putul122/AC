import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
// import debounce from 'lodash/debounce'
import Select from 'react-select'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function TemplateDetail (props) {
  console.log(props)
  let templateName = ''
  let templateCategory = ''
  let checkItemList = ''
  let categoryOptions = []
  let checkItemsOptions = []
  if (props.templateCategories && props.templateCategories !== '') {
    categoryOptions = props.templateCategories.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  if (props.templateCheckItems && props.templateCheckItems !== '') {
    checkItemsOptions = props.templateCheckItems.resources.map(function (data, index) {
      data.label = data.name
      data.type = 'NEW'
      return data
    })
  }
  if (props.templateData && props.templateData !== '' && props.templateData.error_code === null) {
    templateName = props.templateData.resources[0].name
    templateCategory = props.templateData.resources[0].review_category
    let templateCategoryId = props.templateData.resources[0].review_category_id
    let categoryObject = _.find(categoryOptions, function (obj) {
      return obj.id === templateCategoryId
    })
    if (!props.editTemplateSettings.isEditFlag) {
      console.log('categoryObject', categoryObject)
      props.setSelectedCategory(categoryObject)
    }
  }
  if (props.checkItems.length > 0) {
    console.log(props.checkItems)
    checkItemList = props.checkItems.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        {props.editTemplateSettings.isEditFlag && (<button type='button' onClick={(event) => { removeCheckItem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>)}
      </span>)
    })
  }
  let handleTitleChange = function (event) {
    let value = event.target.value
    console.log(value)
    let updateTemplateValue = {...props.updateTemplateValue}
    updateTemplateValue.name = value
    props.setUpdateTemplateValue(updateTemplateValue)
  }
  let editTemplate = function (event) {
    let editTemplateSettings = {...props.editTemplateSettings, 'isEditFlag': true}
    props.setEditTemplateSettings(editTemplateSettings)
  }
  let cancelTemplateEdit = function (event) {
    let editTemplateSettings = {...props.editTemplateSettings, 'isEditFlag': false}
    props.setEditTemplateSettings(editTemplateSettings)
    let updateTemplateValue = {...props.updateTemplateValue}
    updateTemplateValue.name = templateName
    props.setUpdateTemplateValue(updateTemplateValue)
    if (props.templateData.resources[0].check_items.length > 0) {
      let checkItems = props.templateData.resources[0].check_items.map(function (data, index) {
        data.type = 'OLD'
        return data
      })
      props.setCheckItemsData(checkItems)
    }
  }
  let openDeleteModal = function (event) {
    let editTemplateSettings = {...props.editTemplateSettings, 'isDeleteModalOpen': true}
    props.setEditTemplateSettings(editTemplateSettings)
  }
  let closeDeleteModal = function (event) {
    let editTemplateSettings = {...props.editTemplateSettings, 'isDeleteModalOpen': false}
    props.setEditTemplateSettings(editTemplateSettings)
  }
  let deleteTemplate = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let templateId = props.match.params.id
    props.deleteTemplate && props.deleteTemplate(templateId)
  }
  let handleCategorySelect = function (newValue: any, actionMeta: any) {
    console.log('cat select', newValue)
    if (actionMeta.action === 'select-option') {
      let selectedCategory = newValue
      props.setSelectedCategory(selectedCategory)
    }
    if (actionMeta.action === 'clear') {
      let selectedCategory = null
      props.setSelectedCategory(selectedCategory)
    }
  }
  let handleCheckItemSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedCheckItem = newValue
      props.setSelectedCheckItem(selectedCheckItem)
    }
    if (actionMeta.action === 'clear') {
      let selectedCheckItem = null
      props.setSelectedCheckItem(selectedCheckItem)
    }
  }
  let addCheckItem = function () {
    let checkItems = props.checkItems
    if (props.selectedCheckItem !== null) {
      checkItems.push(props.selectedCheckItem)
      props.setCheckItemsData(checkItems)
    }
    let selectedCheckItem = null
    props.setSelectedCheckItem(selectedCheckItem)
  }
  let removeCheckItem = function (index) {
    console.log('remove item', index)
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    let removeItem = checkItems.splice(index, 1)
    if (removeItem[0].type === 'OLD') {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/check_items/' + index
      let payload = JSON.parse(JSON.stringify(props.payload))
      payload.push(obj)
      props.setPayload(payload)
    }
    console.log('remove item', removeItem)
    props.setCheckItemsData(checkItems)
  }
  let saveTemplate = function (event) {
    let payload = []
    let obj = {}
    // edit name payload
    obj.op = 'replace'
    obj.path = '/name'
    obj.value = props.updateTemplateValue.name
    payload.push(obj)
    // edit description payload
    obj = {}
    obj.op = 'replace'
    obj.path = '/description'
    obj.value = props.updateTemplateValue.description
    payload.push(obj)
    // edit category payload
    if (props.selectedCategory) {
      obj = {}
      obj.op = 'replace'
      obj.path = '/review_category'
      obj.value = props.selectedCategory.id
      payload.push(obj)
    }
    // edit checkItems payload
    if (props.payload.length > 0) {
      payload = payload.concat(props.payload)
    }
    if (props.checkItems.length > 0) {
      props.checkItems.forEach(function (data, index) {
        if (data.type === 'NEW') {
          obj = {}
          obj.op = 'add'
          obj.path = '/check_items/-'
          obj.value = data.id
          payload.push(obj)
        }
      })
    }
    // props.createTemplates(payload)
    let updatePayload = {}
    updatePayload.urlPart = {}
    updatePayload.urlPart.review_template_id = parseInt(props.match.params.id)
    updatePayload.payloadPart = payload
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.updateTemplates(updatePayload)
    console.log('payload', updatePayload, props)
  }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          {props.editTemplateSettings.isEditFlag && (<br />)}
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                {props.editTemplateSettings.isEditFlag && (<div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='form-group m-form__group has-danger'>
                      <input type='text' className='form-control m-input' value={props.updateTemplateValue.name} onChange={handleTitleChange} placeholder='Trmplate Name' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <button onClick={cancelTemplateEdit} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;&nbsp;
                      <button onClick={saveTemplate} className='btn btn-outline-info btn-sm'>Save</button>
                    </div>
                  </div>
                </div>)}
                {!props.editTemplateSettings.isEditFlag && (<div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='m-portlet__head-text'>
                      {templateName}
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <a href='/templates' className='btn btn-outline-info btn-sm'>Close</a>&nbsp;&nbsp;
                      <button onClick={editTemplate} className='btn btn-outline-info btn-sm'>Edit Template</button>&nbsp;&nbsp;
                      <button onClick={openDeleteModal} className='btn btn-outline-info btn-sm'>Delete Template</button>
                    </div>
                  </div>
                </div>)}
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
                                <label htmlFor='example-email-input' className={props.editTemplateSettings.isEditFlag ? 'col-4 col-form-label' : 'col-4 '}>Review Category</label>
                                <div className='col-7'>
                                  {props.editTemplateSettings.isEditFlag && (<Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Category'
                                    isClearable
                                    defaultValue={props.selectedCategory}
                                    onChange={handleCategorySelect}
                                    isSearchable={false}
                                    name={'categorySelected'}
                                    options={categoryOptions}
                                  />)}
                                  {!props.editTemplateSettings.isEditFlag && (
                                    <span className='m-input' >{templateCategory}</span>
                                  )}
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
                            {props.editTemplateSettings.isEditFlag && (<span>
                              <span className='m-list-search__result-item'>
                                <div className='form-group m-form__group row'>
                                  <label htmlFor='example-email-input' className='col-4 col-form-label'>Select Check Item</label>
                                  <div className='col-6'>
                                    <Select
                                      // className='col-7 input-sm m-input'
                                      placeholder='Select Check Item'
                                      isClearable
                                      value={props.selectedCheckItem}
                                      onChange={handleCheckItemSelect}
                                      isSearchable={false}
                                      name={'checkItemSelected'}
                                      options={checkItemsOptions}
                                    />
                                  </div>
                                  <div className='col-2'>
                                    <button type='button' onClick={addCheckItem} className='btn btn-outline-info btn-sm'>Add</button>
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
                                            {checkItemList}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </span>)}
                            {!props.editTemplateSettings.isEditFlag && checkItemList}
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
        <div>
          <ReactModal isOpen={props.editTemplateSettings.isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Deleting Template</h6>
                    <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <h3>{templateName}</h3><br />
                    <p>Are you sure?</p>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' className={'btn btn-sm btn-outline-info'} onClick={deleteTemplate}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    TemplateDetail.propTypes = {
      editTemplateSettings: PropTypes.any,
      templateData: PropTypes.any,
      match: PropTypes.any,
      // deleteTemplate: PropTypes.func,
      updateTemplates: PropTypes.func,
      // setSelectedCheckItem: PropTypes.func,
      // setUpdateTemplateValue: PropTypes.func,
      setSelectedCategory: PropTypes.func,
      // setPayload: PropTypes.func,
      // setCheckItemsData: PropTypes.func,
      templateCheckItems: PropTypes.any,
      templateCategories: PropTypes.any,
      checkItems: PropTypes.any,
      selectedCheckItem: PropTypes.any,
      payload: PropTypes.any,
      selectedCategory: PropTypes.any,
      updateTemplateValue: PropTypes.any
 }
