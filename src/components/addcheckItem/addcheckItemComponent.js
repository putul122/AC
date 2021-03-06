import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import styles from './addcheckItemComponent.scss'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import CreatableSelect from 'react-select/lib/Creatable'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export default function addcheckItem (props) {
  let checkItemsOptions = []
  let standardsOptions = []
  let principlesOptions = []
  let typeOptions = []
  let checkItemName
  let standardList = ''
  let principleList = ''
  let valueList = ''
  let NameInputBox
  let DescriptionBox
  let ReferenceBox
  let tagOptions = []
  let handleTypeChange = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedType = newValue
      props.setSelectedType(selectedType)
    }
    if (actionMeta.action === 'clear') {
      let selectedType = null
      props.setSelectedType(selectedType)
    }
  }
  let handleEditTag = function (newValue: any, actionMeta: any) {
    console.log('props', props)
    if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' || actionMeta.action === 'create-option') {
      let selectedTags = newValue
      props.setSelectedTags(selectedTags)
    }
    if (actionMeta.action === 'clear') {
      let selectedTags = null
      props.setSelectedTags(selectedTags)
    }
  }
  let handleCheckItemSelect = function (index) {
    console.log('index', index)
    let selectedCheckitem = JSON.parse(JSON.stringify(props.selectedCheckitem))
    return function (newValue: any, actionMeta: any) {
      console.log('newValue', newValue)
      console.log('actionMeta', actionMeta)
      if (actionMeta.action === 'select-option') {
        selectedCheckitem[index] = newValue
        props.setSelectedCheckitem(selectedCheckitem)
      }
      if (actionMeta.action === 'clear') {
        selectedCheckitem[index] = null
        props.setSelectedCheckitem(selectedCheckitem)
      }
    }
  }
  if (props.componentTypeComponentCheckitems && props.componentTypeComponentCheckitems !== '') {
     checkItemsOptions = props.componentTypeComponentCheckitems.resources.map(function (data, index) {
      data.label = data.name
      return data
     })
   }
   if (props.componentTypeComponentPrinciples && props.componentTypeComponentPrinciples !== '') {
    let excludePrinciples = []
    props.principles.forEach(function (data, index) {
      excludePrinciples.push(data.name)
    })
    let filterList = []
    filterList = _.filter(props.componentTypeComponentPrinciples.resources, (v) => !_.includes(excludePrinciples, v.name))
    principlesOptions = filterList.map(function (data, index) {
       data.label = data.name
       return data
     })
   }
   if (props.componentTypeComponentStandards && props.componentTypeComponentStandards !== '') {
    let excludeStandards = []
    props.standards.forEach(function (data, index) {
      excludeStandards.push(data.name)
    })
    let filterList = []
    filterList = _.filter(props.componentTypeComponentStandards.resources, (v) => !_.includes(excludeStandards, v.name))
    standardsOptions = filterList.map(function (data, index) {
       data.label = data.name
       return data
    })
   }
  if (props.reviewCategories && props.reviewCategories !== '') {
    typeOptions = props.reviewCategories.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  if (props.standards.length > 0) {
    standardList = props.standards.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removeStandard(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
  } else {
    standardList = ''
  }
  if (props.principles.length > 0) {
    principleList = props.principles.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removePrinciple(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
  } else {
    principleList = ''
  }
  if (props.values.length > 0) {
    valueList = props.values.map(function (data, index) {
      let checkList = []
      if (data.requiresCheckItems.length > 0) {
        checkList = data.requiresCheckItems.map(function (checkItem, ix) {
          return (<span className='m-list-search__result-item' key={ix}>
            <span className='m-list-search__result-item-text'>{checkItem.name}</span>
            <button type='button' onClick={(event) => { removeCheckItem(index, ix) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
          </span>)
        })
      }
      return (<span className='m-list-search__result-item'>
        <div className='m-section m-section--last'>
          <div className='m-section__content'>
            <div className='m-demo'>
              <div className={styles.mDemoPreview}>
                <div className='m-list-search'>
                  <div className='m-list-search__results'>
                    <span className='m-list-search__result-item'>
                      <span className='m-list-search__result-item-text'>{data.value}</span>
                      <button onClick={(event) => { removeValue(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
                    </span>
                    <span className='m-list-search__result-category m-list-search__result-category--first'>
                                Select Check Item
                            </span>
                    <div className='form-group m-form__group row'>
                      <div className='col-8'>
                        <Select
                          // className='col-7 input-sm m-input'
                          placeholder='Select CheckItem'
                          isClearable
                          value={props.selectedCheckitem[index] || null}
                          onChange={handleCheckItemSelect(index)}
                          isSearchable={false}
                          name={'checkItemSelected'}
                          options={checkItemsOptions}
                        />
                      </div>
                      <button type='button' onClick={(event) => { addRequireCheckItem(index) }} className='btn btn-outline-info col-2 btn-sm'>Add</button>
                    </div>
                    <span className='m-list-search__result-category m-list-search__result-category--first'>
                                Selected Check Item
                            </span>
                    <div className={styles.mDemoPreview}>
                      {checkList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>)
    })
    console.log('standardList', valueList)
  } else {
    valueList = ''
    console.log('standardList', valueList)
  }
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let handleNameChange = debounce((e) => {
    console.log(e, checkItemName)
    let addCheckitemValue = {...props.addCheckitemValue}
    if (checkItemName) {
      console.log('if ', checkItemName.value)
      let value = checkItemName.value
      addCheckitemValue.name = value
      props.setAddCheckitemValue(addCheckitemValue)
      if (value.trim() !== '') {
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let componentTypes = appPackage.resources[0].component_types
        let componentTypeId = _.result(_.find(componentTypes, function (obj) {
            return obj.key === 'Check Item'
        }), 'component_type')
        let payload = {}
        payload.id = componentTypeId
        payload.params = {}
        // value = value.replace(' ', '%20')
        payload.params.search = value.trim()
        props.verifyName(payload)
        let addSettings = {...props.addSettings, 'validationClass': 'form-group row'}
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setAddSettings(addSettings)
      } else {
        let addSettings = {...props.addSettings, 'showValidation': false, 'message': ''}
        props.setAddSettings(addSettings)
      }
    } else {
      addCheckitemValue.name = ''
      props.setAddCheckitemValue(addCheckitemValue)
      console.log('else')
      let addSettings = {...props.addSettings, 'showValidation': false, 'message': '', 'validationClass': 'form-group row'}
      props.setAddSettings(addSettings)
    }
  }, 500)
  // function (event) {
  //   let value = event.target.value
  //   let addCheckitemValue = {...props.addCheckitemValue}
  //   addCheckitemValue.name = value
  //   props.setAddCheckitemValue(addCheckitemValue)
  // }
  let handleDescriptionChange = function (event) {
    let value = event.target.value
    let addCheckitemValue = {...props.addCheckitemValue}
    addCheckitemValue.description = value
    props.setAddCheckitemValue(addCheckitemValue)
  }
  let handleStandardValue = function (event) {
    props.setModalOpenStatus(false)
    let newStandardValue = {...props.newStandardValue}
    let standards = JSON.parse(JSON.stringify(props.standards))
    newStandardValue.name = NameInputBox.value
    newStandardValue.description = DescriptionBox.value
    newStandardValue.reference = ReferenceBox.value
    newStandardValue.type = 'NEW'
    standards.push(newStandardValue)
    props.setStandardsData(standards)
    // props.setNewStandardValue(newStandardValue)
  }
  let handleStandardSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedStandard = newValue
      props.setSelectedStandard(selectedStandard)
    }
    if (actionMeta.action === 'clear') {
      let selectedStandard = null
      props.setSelectedStandard(selectedStandard)
    }
  }
  let addStandardData = function () {
    let standards = props.standards
    if (props.selectedStandard !== null) {
      let selectedStandard = JSON.parse(JSON.stringify(props.selectedStandard))
      selectedStandard.type = 'OLD'
      standards.push(selectedStandard)
      props.setStandardsData(standards)
    }
    let selectedStandard = null
    props.setSelectedStandard(selectedStandard)
  }
  let removeStandard = function (index) {
    let standards = JSON.parse(JSON.stringify(props.standards))
    standards.splice(index, 1)
    props.setStandardsData(standards)
  }
  let handlePrincipleSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedPrinciple = newValue
      props.setSelectedPrinciple(selectedPrinciple)
    }
    if (actionMeta.action === 'clear') {
      let selectedPrinciple = null
      props.setSelectedPrinciple(selectedPrinciple)
    }
  }
  let addPrinciple = function () {
    let principles = props.principles
    if (props.selectedPrinciple !== null) {
      principles.push(props.selectedPrinciple)
      props.setPrinciplesData(principles)
    }
    let selectedPrinciple = null
    props.setSelectedPrinciple(selectedPrinciple)
  }
  let removePrinciple = function (index) {
    let principles = JSON.parse(JSON.stringify(props.principles))
    principles.splice(index, 1)
    props.setPrinciplesData(principles)
  }
  let handleValueSelect = function (event) {
    let selectedValue = event.target.value
    if (selectedValue.trim() !== '') {
      props.setSelectedValue(selectedValue)
    }
  }
  let addValue = function () {
    console.log(props)
    let values = JSON.parse(JSON.stringify(props.values))
    let obj = {}
    obj.value = props.selectedValue
    obj.requiresCheckItems = []
    if (props.selectedValue !== '') {
      values.push(obj)
      props.setValuesData(values)
    }
    let selectedValue = ''
    props.setSelectedValue(selectedValue)
  }
  let removeValue = function (index) {
    let values = JSON.parse(JSON.stringify(props.values))
    values.splice(index, 1)
    props.setValuesData(values)
  }
  let addRequireCheckItem = function (index) {
    let values = JSON.parse(JSON.stringify(props.values))
    let selectedValue = values[index]
    let selectedCheckItemArray = JSON.parse(JSON.stringify(props.selectedCheckitem))
    selectedValue.requiresCheckItems.push(selectedCheckItemArray[index])
    values[index] = selectedValue
    if (selectedCheckItemArray[index] !== null) {
      props.setValuesData(values)
    }
    selectedCheckItemArray[index] = null
    props.setSelectedCheckitem(selectedCheckItemArray)
  }
  let removeCheckItem = function (valueIndex, checkItemIndex) {
    let values = JSON.parse(JSON.stringify(props.values))
    let selectedValue = values[valueIndex]
    let requiresCheckItems = selectedValue.requiresCheckItems
    requiresCheckItems.splice(checkItemIndex, 1)
    selectedValue.requiresCheckItems = requiresCheckItems
    values[valueIndex] = selectedValue
    props.setValuesData(values)
  }
  let saveCheckitem = function (event) {
    if (props.addCheckitemValue.name.trim() !== '' && props.addSettings.toAdd) {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let payload = {}
      payload.name = props.addCheckitemValue.name
      payload.description = props.addCheckitemValue.description
      payload.type_id = props.selectedType.id || null
      payload.values = []
      if (props.values.length > 0) {
        props.values.forEach(function (data, index) {
          if (data.value) {
            let obj = {}
            obj.name = data.value
            // obj.description = data.value.description
            obj.requires_check_items = []
            if (data.requiresCheckItems.length > 0) {
              data.requiresCheckItems.forEach(function (checkItem, idx) {
                let ob = {}
                ob.id = checkItem.id
                obj.requires_check_items.push(ob)
              })
            }
            payload.values.push(obj)
          }
        })
      } else {
        payload.values = []
      }
      if (props.principles.length > 0) {
        payload.principles = props.principles.map(function (data, index) {
          let obj = {}
          obj.id = data.id
          return obj
        })
      } else {
        payload.principles = []
      }
      if (props.standards.length > 0) {
        payload.standards = []
        props.standards.forEach(function (data, index) {
          if (data.type === 'OLD') {
            let obj = {}
            obj.id = data.id
            payload.standards.push(obj)
          } else if (data.type === 'NEW') {
            let obj = {}
            obj.name = data.name
            obj.description = data.description
            obj.reference = data.reference
            payload.standards.push(obj)
          }
        })
      } else {
        payload.standards = []
      }
      if (props.selectedTags) {
        let value = ''
        let tagLength = props.selectedTags.length
        if (tagLength > 0) {
          props.selectedTags.forEach(function (data, index) {
            value = value + data.value
            if (index !== tagLength - 1) {
              value = value + ' '
            }
          })
        }
        payload.tag = value
      }
      console.log('createPAyload', payload)
      props.createCheckItem(payload)
    } else {
      let addSettings = {...props.addSettings, 'validationClass': 'form-group row has-danger'}
      props.setAddSettings(addSettings)
    }
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
          <br />
          <div className='m-portlet__head' style={{'height': '50%'}}>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                <div className='row m-form m-form--state m-form--fit' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className={props.addSettings.validationClass}>
                      <input type='text' className='form-control m-input m--margin-top-10' onBlur={handleNameChange} ref={input => (checkItemName = input)} placeholder='Check Item Name' aria-describedby='basic-addon2' />
                      {props.addSettings.showValidation && (<div style={props.addSettings.color} className='form-control-feedback has-danger'>{props.addSettings.message}</div>)}
                    </div>
                    <div className='form-group row'>
                      <input type='text' className='form-control m-input m--margin-top-10' value={props.addCheckitemValue.description} placeholder='Check Item Description' onChange={handleDescriptionChange} aria-describedby='basic-addon2' />
                    </div>
                    <div className='form-group row'>
                      <CreatableSelect
                        className='form-control m-input m--margin-top-10'
                        placeholder='Enter Tags'
                        isClearable
                        isMulti
                        onChange={handleEditTag}
                        value={props.selectedTags}
                        options={tagOptions}
                      />
                    </div>
                    <br />
                  </div>
                  <div className='col-4 float-right m--margin-top-10'>
                    <div className='pull-right'>
                      {/* <a href='/checkitems' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={saveCheckitem} className='btn btn-outline-info btn-sm'>Save</button> */}
                      <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                        <button type='button' onClick={() => { window.location.href = window.location.origin + '/checkitems' }} className='m-btn btn btn-secondary'>Cancel</button>
                        <button type='button' onClick={saveCheckitem} className='m-btn btn btn-secondary'>Save</button>
                      </div>
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
                      <div className={styles.mDemoPreview}>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Details</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-4 col-form-label'>Type</label>
                                <div className='col-8'>
                                  <Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Type'
                                    isClearable
                                    // defaultValue={dvalue}
                                    onChange={handleTypeChange}
                                    isSearchable={false}
                                    name={'typeSelected'}
                                    options={typeOptions}
                                  />
                                </div>
                              </div>
                            </span>
                            <span className='m-list-search__result-item'>
                              <div className='m-section m-section--last'>
                                <div className='m-section__content'>
                                  <div className='m-demo'>
                                    <div className={styles.mDemoPreview}>
                                      <div className='m-list-search'>
                                        <div className='m-list-search__results'>
                                          <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                      Values
                                                  </span>
                                          <div className='form-group m-form__group row'>
                                            {/* <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label> */}
                                            <div className='col-8'>
                                              <input type='text' className='form-control m-input' value={props.selectedValue} placeholder='Enter Value' onChange={handleValueSelect} />
                                              {/* <Select
                                                // className='col-7 input-sm m-input'
                                                placeholder='Select Value'
                                                isClearable
                                                value={props.selectedValue}
                                                onChange={handleValueSelect}
                                                isSearchable={false}
                                                name={'roleSelected'}
                                                options={checkitemsvalueOptions}
                                              /> */}
                                            </div>
                                            <button type='button' onClick={addValue} className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                          </div>
                                          {valueList}
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
                      <div className={styles.mDemoPreview}>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Principles</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label>
                                <div className='col-6'>
                                  <Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Principle'
                                    isClearable
                                    value={props.selectedPrinciple}
                                    onChange={handlePrincipleSelect}
                                    isSearchable={false}
                                    name={'roleSelected'}
                                    options={principlesOptions}
                                  />
                                </div>
                                <button type='button' onClick={addPrinciple} className='btn btn-outline-info col-2 btn-sm'>Add</button>
                              </div>
                            </span>
                            <span className='m-list-search__result-item'>
                              <div className='m-section m-section--last'>
                                <div className='m-section__content'>
                                  <div className='m-demo'>
                                    <div className={styles.mDemoPreview}>
                                      <div className='m-list-search'>
                                        <div className='m-list-search__results'>
                                          <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                     Selected Principles
                                                  </span>
                                          {principleList}
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
                      <div className={styles.mDemoPreview}>
                        <div className='m-list-search'>
                          <div className='m-list-search__results'>
                            <span className='m-list-search__result-category m-list-search__result-category--first'>Standards</span>
                            <span className='m-list-search__result-item'>
                              <div className='form-group m-form__group row'>
                                <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label>
                                <div className='col-6'>
                                  <Select
                                    // className='col-7 input-sm m-input'
                                    placeholder='Select Standard'
                                    isClearable
                                    value={props.selectedStandard}
                                    onChange={handleStandardSelect}
                                    isSearchable={false}
                                    name={'roleSelected'}
                                    options={standardsOptions}
                                  />
                                </div>
                                <button onClick={addStandardData} type='button' className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                <button onClick={openModal} className='btn btn-outline-info col-2 btn-sm'>New</button>
                              </div>
                            </span>
                            <span className='m-list-search__result-item'>
                              <div className='m-section m-section--last'>
                                <div className='m-section__content'>
                                  <div className='m-demo'>
                                    <div className={styles.mDemoPreview}>
                                      <div className='m-list-search'>
                                        <div className='m-list-search__results'>
                                          <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                     Selected Standards
                                                  </span>
                                          {standardList}
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
          <ReactModal isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalwidth}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>New Standard</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <form>
                      {/* {messageBlock} */}
                      <div className='form-group'>
                        <label htmlFor='component-name' className='form-control-label'>Name:</label>
                        <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' autoComplete='off' />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description-text' className='form-control-label'>Description:</label>
                        <textarea className='form-control'ref={textarea => (DescriptionBox = textarea)} defaultValue={''} autoComplete='off' />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='component-name' className='form-control-label'>Reference:</label>
                        <input type='text' className='form-control' ref={input => (ReferenceBox = input)} id='component-name' autoComplete='off' />
                      </div>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={handleStandardValue} className='btn btn-outline-info btn-sm'>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    addcheckItem.propTypes = {
    // componentTypeComponents: PropTypes.any,
    componentTypeComponentCheckitems: PropTypes.any,
    componentTypeComponentPrinciples: PropTypes.any,
    componentTypeComponentStandards: PropTypes.any,
    reviewCategories: PropTypes.any,
    selectedStandard: PropTypes.any,
    selectedPrinciple: PropTypes.any,
    selectedValue: PropTypes.any,
    // selectedCheckitem: PropTypes.any,
    principles: PropTypes.any,
    standards: PropTypes.any,
    values: PropTypes.any,
    // eslint-disable-next-line
    selectedType: PropTypes.any,
    addCheckitemValue: PropTypes.any,
    // newStandardValue: PropTypes.any,
    // createCheckItem: PropTypes.func,
    // addStandard: PropTypes.func,
    modalIsOpen: PropTypes.any,
    tags: PropTypes.any,
    selectedTags: PropTypes.any,
    addSettings: PropTypes.any
 }
