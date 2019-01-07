import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

export default function AddTemplate (props) {
  console.log('add props', props, props.addTemplateValue)
  let categoryOptions = []
  let checkItemsOptions = []
  let checkItemList = ''
  if (props.templateCategories && props.templateCategories !== '') {
    categoryOptions = props.templateCategories.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  if (props.templateCheckItems && props.templateCheckItems !== '') {
    checkItemsOptions = props.templateCheckItems.resources.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
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
  let handleNameChange = function (event) {
    let value = event.target.value
    let addTemplateValue = {...props.addTemplateValue}
    addTemplateValue.name = value
    props.setAddTemplateValue(addTemplateValue)
    if (value.trim() !== '') {
      props.setValidationClass('form-group m-form__group row')
    }
  }
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
    let checkItems = JSON.parse(JSON.stringify(props.checkItems))
    checkItems.splice(index, 1)
    props.setCheckItemsData(checkItems)
  }
  let saveTemplate = function (event) {
    if (props.addTemplateValue.name.trim() !== '') {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {}
      payload.name = props.addTemplateValue.name
      payload.description = ''
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
      props.setValidationClass('form-group m-form__group row has-danger')
    }
  }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                <div className='row ' style={{width: '100%'}}>
                  <div className='col-8 m-form m-form--state m-form--fit'>
                    <div className={props.validationClass}>
                      <input type='text' className='form-control m-input' value={props.addTemplateValue.name} onChange={handleNameChange} placeholder='Template Name' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <a href='/templates' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={saveTemplate} className='btn btn-outline-info btn-sm'>Save</button>
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
      validationClass: PropTypes.any,
    templateCategories: PropTypes.any,
    templateCheckItems: PropTypes.any,
    selectedCategory: PropTypes.any,
    selectedCheckItem: PropTypes.any,
    checkItems: PropTypes.any,
    addTemplateValue: PropTypes.any,
    createTemplates: PropTypes.func,
    setValidationClass: PropTypes.func
 }
