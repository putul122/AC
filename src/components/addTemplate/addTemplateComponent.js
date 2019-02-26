import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import debounce from 'lodash/debounce'
import _ from 'lodash'
import CreatableSelect from 'react-select/lib/Creatable'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function AddTemplate (props) {
  console.log('add props', props, props.addTemplateValue)
  let categoryOptions = []
  // let checkItemsOptions = []
  let checkItemList = ''
  let templateName = ''
  let tagOptions = []
  let checkItemModalList = ''
  let handleCheckbox = function (value, index) {
    let checkItemsSettings = {...props.checkItemsSettings}
    let checkItems = checkItemsSettings.checkItems
    checkItems[index].isChecked = value
    checkItemsSettings.checkItems = checkItems
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let selectCheckItems = function () {
    let checkItemsSettings = {...props.checkItemsSettings}
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
  //     return data
  //   })
  // }
  if (props.checkItems.length > 0) {
    console.log(props.checkItems)
    checkItemList = props.checkItems.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removeCheckItem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('checkItemList', checkItemList)
  } else {
    checkItemList = ''
    console.log('else checkItemList', checkItemList)
  }
  let handleNameChange = debounce((e) => {
    console.log(e, templateName)
    if (templateName) {
      console.log('if ', templateName.value)
      let value = templateName.value
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
        let addSettings = {...props.addSettings, 'templateName': value, 'validationClass': 'form-group m-form__group row'}
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setAddSettings(addSettings)
      } else {
        let addSettings = {...props.addSettings, 'templateName': value, 'showValidation': false, 'message': ''}
        props.setAddSettings(addSettings)
      }
    } else {
      console.log('else')
      let addSettings = {...props.addSettings, 'templateName': '', 'showValidation': false, 'message': '', 'validationClass': 'form-group m-form__group row'}
      props.setAddSettings(addSettings)
    }
  }, 500)
  // = function (event) {
  //   let value = event.target.value
  //   let addTemplateValue = {...props.addTemplateValue}
  //   addTemplateValue.name = value
  //   props.setAddTemplateValue(addTemplateValue)
  //   if (value.trim() !== '') {
  //     props.setValidationClass('form-group m-form__group row')
  //     let addSettings = {...props.addSettings, 'validationClass': 'form-group m-form__group row'}
  //     // eslint-disable-next-line
  //     mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  //     props.setAddSettings(addSettings)
  //   } else {
  //     let addSettings = {...props.addSettings, 'showValidation': false, 'message': ''}
  //     props.setAddSettings(addSettings)
  //   }
  // }
  let handleCategorySelect = function (newValue: any, actionMeta: any) {
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
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    checkItems.splice(index, 1)
    props.setCheckItemsData(checkItems)
  }
  let saveTemplate = function (event) {
    console.log('props', props)
    if (props.addSettings.templateName.trim() !== '' && props.addSettings.toAdd) {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {}
      payload.name = props.addSettings.templateName
      payload.description = props.addSettings.description
      payload.review_category_id = props.selectedCategory.id
      if (props.checkItems.length > 0) {
        payload.check_items = props.checkItems.map(function (data, index) {
          let obj = {}
          obj.id = data.id
          return obj
        })
      } else {
        payload.check_items = []
      }
      props.createTemplates(payload)
    } else {
      let addSettings = {...props.addSettings, 'validationClass': 'form-group m-form__group row has-danger'}
      props.setAddSettings(addSettings)
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
                <div className='row ' style={{width: '100%'}}>
                  <div className='col-8 m-form m-form--state m-form--fit'>
                    <div className={props.addSettings.validationClass}>
                      <input type='text' className='form-control m-input' onBlur={handleNameChange} ref={input => (templateName = input)} placeholder='Template Name' aria-describedby='basic-addon2' />
                      {props.addSettings.showValidation && (<div style={props.addSettings.color} className='form-control-feedback has-danger'>{props.addSettings.message}</div>)}
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      {/* <a href='/templates' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={saveTemplate} className='btn btn-outline-info btn-sm'>Save</button> */}
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={() => { window.location.href = window.location.origin + '/templates' }} className='m-btn btn btn-secondary'>Cancel</button>
                        <button type='button' onClick={saveTemplate} className='m-btn btn btn-secondary'>Save</button>
                      </div>
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
                                    value={props.selectedCategory}
                                    onChange={handleCategorySelect}
                                    isSearchable={false}
                                    name={'categorySelected'}
                                    options={categoryOptions}
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
  AddTemplate.propTypes = {
      validationClass: PropTypes.any,
    templateCategories: PropTypes.any,
    // templateCheckItems: PropTypes.any,
    selectedCategory: PropTypes.any,
    // selectedCheckItem: PropTypes.any,
    checkItems: PropTypes.any,
    addTemplateValue: PropTypes.any,
    // createTemplates: PropTypes.func,
    // setAddSettings: PropTypes.func,
    addSettings: PropTypes.any,
    checkItemsSettings: PropTypes.any,
    tags: PropTypes.any
  }
