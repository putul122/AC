import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import styles from './addTemplateComponent.scss'
// import moment from 'moment'
import debounce from 'lodash/debounce'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function TemplateDetail (props) {
  console.log(props)
  let refTemplateName
  let templateName = ''
  let templateCategory = ''
  let checkItemList = ''
  let categoryOptions = []
  // let checkItemsOptions = []
  let tagOptions = []
  let checkItemModalList = ''
  let handleCheckbox = function (value, index) {
    console.log('handle group checkbox', value, index, refTemplateName)
    let checkItemsSettings = {...props.checkItemsSettings}
    let checkItems = checkItemsSettings.checkItems
    checkItems[index].isChecked = value
    checkItemsSettings.checkItems = checkItems
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let selectCheckItems = function () {
    let checkItemsSettings = {...props.checkItemsSettings}
    console.log(checkItemsSettings.checkItems)
    let checkItems = props.checkItems
    let selectedCheckItems = checkItemsSettings.checkItems
    selectedCheckItems.forEach(function (data, index) {
      if (data.isChecked) {
        checkItems.push(data)
      }
    })
    props.setCheckItemsData(checkItems)
    closeCheckItemModal()
  }
  let closeCheckItemModal = function () {
    let checkItemsSettings = {...props.checkItemsSettings}
    let checkItems = checkItemsSettings.checkItems.map(function (data, index) {
      data.isChecked = false
      return data
    })
    checkItemsSettings.checkItems = checkItems
    checkItemsSettings.isModalOpen = false
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let openSelectCheckitem = function () {
    let checkItemsSettings = {...props.checkItemsSettings}
    checkItemsSettings.isModalOpen = true
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let handleChange = function (newValue: any, actionMeta: any) {
    // let appPackage = JSON.parse(localStorage.getItem('packages'))
    // let componentTypes = appPackage.resources[0].component_types
    // let componentTypeIdForComponents = _.result(_.find(componentTypes, function (obj) {
    //     return obj.key === 'Check Item Template'
    // }), 'component_type')
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let checkItemPayload = {}
    // checkItemPayload.id = componentTypeIdForComponents
    let checkItemsSettings = {...props.checkItemsSettings}
    if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
      let search = ''
      let newValueLength = newValue.length
      if (newValueLength > 0) {
        newValue.forEach(function (data, index) {
          search = search + '#' + data.value
          if (index !== newValueLength - 1) {
            search = search + ' '
          }
        })
      }
      console.log('search', search)
      checkItemPayload.search = search
      props.fetchCheckItems && props.fetchCheckItems(checkItemPayload)
      checkItemsSettings.selectedTags = newValue
    }
    if (actionMeta.action === 'clear') {
      checkItemPayload = {}
      props.fetchCheckItems && props.fetchCheckItems(checkItemPayload)
      checkItemsSettings.selectedTags = null
    }
    props.setCheckitemsSettings(checkItemsSettings)
  }
  if (props.templateCategories && props.templateCategories !== '') {
    categoryOptions = props.templateCategories.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  // if (props.templateCheckItems && props.templateCheckItems !== '') {
  //   checkItemsOptions = props.templateCheckItems.resources.map(function (data, index) {
  //     data.label = data.name
  //     data.type = 'NEW'
  //     return data
  //   })
  // }
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
    checkItemList = props.checkItems.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        {props.editTemplateSettings.isEditFlag && (<button type='button' onClick={(event) => { removeCheckItem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>)}
      </span>)
    })
  }
  let handleTitleChange = debounce((e) => {
    console.log(e, refTemplateName)
    if (refTemplateName) {
      console.log('if ', refTemplateName.value)
      let value = refTemplateName.value
      if (value.trim() !== '') {
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let componentTypes = appPackage.resources[0].component_types
        let componentTypeId = _.result(_.find(componentTypes, function (obj) {
            return obj.key === 'Review Template'
        }), 'component_type')
        let payload = {}
        payload.id = componentTypeId
        payload.params = {}
        payload.params.search = value
        props.verifyName(payload)
        let editTemplateSettings = {...props.editTemplateSettings, 'name': value, 'validationClass': 'form-group m-form__group row'}
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setEditTemplateSettings(editTemplateSettings)
      } else {
        let editTemplateSettings = {...props.editTemplateSettings, 'name': value, 'showValidation': false, 'message': ''}
        props.setEditTemplateSettings(editTemplateSettings)
      }
    } else {
      console.log('else')
      let editTemplateSettings = {...props.editTemplateSettings, 'name': '', 'showValidation': false, 'message': '', 'validationClass': 'form-group m-form__group row'}
      props.setEditTemplateSettings(editTemplateSettings)
    }
  }, 500)
  let editTemplate = function (event) {
    props.setValidationClass('form-group m-form__group row')
    let editTemplateSettings = {...props.editTemplateSettings, 'isEditFlag': true, 'validationClass': 'form-group m-form__group row', 'showValidation': false}
    props.setEditTemplateSettings(editTemplateSettings)
  }
  let cancelTemplateEdit = function (event) {
    let editTemplateSettings = {...props.editTemplateSettings, 'isEditFlag': false, 'name': templateName}
    props.setEditTemplateSettings(editTemplateSettings)
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
  // let handleCheckItemSelect = function (newValue: any, actionMeta: any) {
  //   if (actionMeta.action === 'select-option') {
  //     let selectedCheckItem = newValue
  //     props.setSelectedCheckItem(selectedCheckItem)
  //   }
  //   if (actionMeta.action === 'clear') {
  //     let selectedCheckItem = null
  //     props.setSelectedCheckItem(selectedCheckItem)
  //   }
  // }
  // let addCheckItem = function () {
  //   let checkItems = props.checkItems
  //   if (props.selectedCheckItem !== null) {
  //     checkItems.push(props.selectedCheckItem)
  //     props.setCheckItemsData(checkItems)
  //   }
  //   let selectedCheckItem = null
  //   props.setSelectedCheckItem(selectedCheckItem)
  // }
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
    if (props.editTemplateSettings.name.trim() !== '' && props.editTemplateSettings.toUpdate) {
      let payload = []
      let obj = {}
      // edit name payload
      obj.op = 'replace'
      obj.path = '/name'
      obj.value = props.editTemplateSettings.name
      payload.push(obj)
      // edit description payload
      obj = {}
      obj.op = 'replace'
      obj.path = '/description'
      obj.value = props.editTemplateSettings.description
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
    } else {
      let editTemplateSettings = {...props.editTemplateSettings, 'validationClass': 'form-group m-form__group row has-danger'}
      props.setEditTemplateSettings(editTemplateSettings)
    }
  }
  if (props.checkItemsSettings.checkItems.length > 0) {
    checkItemModalList = props.checkItemsSettings.checkItems.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'><input onChange={(event) => { handleCheckbox(event.target.checked, index) }} type='checkbox' style={{cursor: 'pointer'}} />{data.name}</span>
      </span>)
    })
  } else {
    checkItemModalList = []
    checkItemModalList.push(<span>No Data to Display</span>)
  }
  if (props.tags && props.tags !== '') {
    tagOptions = props.tags.resources.map(function (data, index) {
      let option = {}
      option.id = index
      option.value = data
      option.label = data
      return option
    })
  }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                {props.editTemplateSettings.isEditFlag && (<div className='row' style={{width: '100%'}}>
                  <div className='col-8 m-form m-form--state m-form--fit'>
                    <div className={props.editTemplateSettings.validationClass}>
                      <input type='text' className='form-control m-input' defaultValue={props.editTemplateSettings.name} onKeyUp={handleTitleChange} ref={input => (refTemplateName = input)} placeholder='Template Name' aria-describedby='basic-addon2' />
                      {props.editTemplateSettings.showValidation && (<div style={props.editTemplateSettings.color} className='form-control-feedback has-danger'>{props.editTemplateSettings.message}</div>)}
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      {/* <button onClick={cancelTemplateEdit} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;&nbsp;
                      <button onClick={saveTemplate} className='btn btn-outline-info btn-sm'>Save</button> */}
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={cancelTemplateEdit} className='m-btn btn btn-secondary'>Cancel</button>
                        <button type='button' onClick={saveTemplate} className='m-btn btn btn-secondary'>Save</button>
                      </div>
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
                      <a href='/templates' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Back' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                        <i className='fa flaticon-list-1 fa-2x' />
                      </a>&nbsp;&nbsp;
                      <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Edit Template' onClick={editTemplate} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                        <i className='fa flaticon-edit-1 fa-2x' />
                      </a>&nbsp;&nbsp;
                      <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Delete Template' onClick={openDeleteModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                        <i className='fa flaticon-delete-1 fa-2x' />
                      </a>&nbsp;&nbsp;
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
                                  <div className='col-6' />
                                  <div className='col-6 float-right' >
                                    <button type='button' onClick={openSelectCheckitem} className='btn btn-outline-info btn-sm pull-right'>Select Check Item</button>
                                  </div>
                                </div>
                                {/* <div className='form-group m-form__group row'>
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
                                </div> */}
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
                    {/* <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' className={'btn btn-sm btn-outline-info'} onClick={deleteTemplate}>Delete</button> */}
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeDeleteModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={deleteTemplate} className='m-btn btn btn-secondary'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.checkItemsSettings.isModalOpen}
            onRequestClose={closeCheckItemModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Select Check Item</h6>
                    <button type='button' onClick={closeCheckItemModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(50vh - 65px)', 'overflow': 'auto'}}>
                    <div className='col-lg-12'>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-3 col-form-label'>Tags</label>
                        <div className='col-9'>
                          <CreatableSelect
                            className='input-sm m-input'
                            placeholder='Enter Tags'
                            isClearable
                            isMulti
                            onChange={handleChange}
                            value={props.checkItemsSettings.selectedTags}
                            options={tagOptions}
                          />
                        </div>
                      </div>
                      <div className='m-section m-section--last'>
                        <div className='m-section__content'>
                          <div className='m-demo'>
                            <div className='m-demo__preview'>
                              <div className='m-list-search'>
                                <div className='m-list-search__results'>
                                  {checkItemModalList}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeCheckItemModal} className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' onClick={selectCheckItems} className={'btn btn-sm btn-outline-info'}>Select</button>
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
      validationClass: PropTypes.any,
      editTemplateSettings: PropTypes.any,
      templateData: PropTypes.any,
      // eslint-disable-next-line
      match: PropTypes.any,
      // deleteTemplate: PropTypes.func,
      // updateTemplates: PropTypes.func,
      // setSelectedCheckItem: PropTypes.func,
      // setUpdateTemplateValue: PropTypes.func,
      setSelectedCategory: PropTypes.func,
      // setPayload: PropTypes.func,
      // setCheckItemsData: PropTypes.func,
      // templateCheckItems: PropTypes.any,
      templateCategories: PropTypes.any,
      checkItems: PropTypes.any,
      // selectedCheckItem: PropTypes.any,
      // eslint-disable-next-line
      payload: PropTypes.any,
      selectedCategory: PropTypes.any,
      // updateTemplateValue: PropTypes.any,
      checkItemsSettings: PropTypes.any,
      tags: PropTypes.any
 }
