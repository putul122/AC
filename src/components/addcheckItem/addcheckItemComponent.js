import React from 'react'
import Select from 'react-select'
// import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './addcheckItemComponent.scss'
// import DataModelComponent from '../dataModel/dataModelComponent'
// import _ from 'lodash'
import ReactModal from 'react-modal'
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
  console.log('*****', props)
  console.log('Data for addcheckitem', props.componentTypeComponentCheckitems)
  console.log('Data for principle', props.componentTypeComponentPrinciples)
  console.log('Data for standard', props.componentTypeComponentStandards)
  console.log('Data for values', props.componentTypeComponentCheckitemsvalues)
  console.log('data for category', props.reviewCategories, props.addStandard, props.newStandardValue, props.setPrinciplesData)
  console.log('***', props.selectedStandard, props.setStandardsData, props.setValuesData, props.setCheckitemsData)
  let checkItemsOptions = []
  let standardsOptions = []
  let principlesOptions = []
  let checkitemsvalueOptions = []
  let reviewCategoryOptions = []
  let standardList = ''
  let principleList = ''
  let valueList = ''
  let checkitemList = ''
  // let standardName = ''
  // let standardDescription = ''
  // let standardReference = ''
  let NameInputBox
  let DescriptionBox
  let ReferenceBox
  if (props.componentTypeComponentCheckitems && props.componentTypeComponentCheckitems !== '') {
     checkItemsOptions = props.componentTypeComponentCheckitems.resources.map(function (data, index) {
      data.label = data.name
      return data
     })
   }
   if (props.componentTypeComponentPrinciples && props.componentTypeComponentPrinciples !== '') {
     principlesOptions = props.componentTypeComponentPrinciples.resources.map(function (data, index) {
       data.label = data.name
       return data
     })
   }
   if (props.componentTypeComponentStandards && props.componentTypeComponentStandards !== '') {
     standardsOptions = props.componentTypeComponentStandards.resources.map(function (data, index) {
       data.label = data.name
       return data
     })
   }
   if (props.componentTypeComponentCheckitemsvalues && props.componentTypeComponentCheckitemsvalues !== '') {
    checkitemsvalueOptions = props.componentTypeComponentCheckitemsvalues.resources.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  if (props.reviewCategories && props.reviewCategories !== '') {
    reviewCategoryOptions = props.reviewCategories.map(function (data, index) {
      data.label = data.name
      return data
    })
  }
  if (props.standards.length > 0) {
    console.log(props.standards)
    standardList = props.standards.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removeStandard(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('standardList', standardList)
  } else {
    standardList = ''
    console.log('standardList', standardList)
  }
  if (props.principles.length > 0) {
    console.log(props.principles)
    principleList = props.principles.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removePrinciple(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('standardList', principleList)
  } else {
    principleList = ''
    console.log('standardList', principleList)
  }
    if (props.checkitems.length > 0) {
    console.log(props.checkitems)
    checkitemList = props.checkitems.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removeCheckitem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('standardList', checkitemList)
  } else {
    checkitemList = ''
    console.log('standardList', checkitemList)
  }
  if (props.values.length > 0) {
    console.log(props.values)
   valueList = props.values.map(function (data, index) {
      return (<span className='m-list-search__result-item' key={index}>
        <span className='m-list-search__result-item-text'>{data.name}</span>
        <button type='button' onClick={(event) => { removeValue(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
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
  let handleNameChange = function (event) {
    let value = event.target.value
    let addCheckitemValue = {...props.addCheckitemValue}
    addCheckitemValue.name = value
    props.setAddCheckitemValue(addCheckitemValue)
  }
  let handleStandardValue = function (event) {
    // let value = event.target.value
    let newStandardValue = {...props.newStandardValue}
    newStandardValue.name = NameInputBox.value
    newStandardValue.description = DescriptionBox.value
    newStandardValue.reference = ReferenceBox.value
    props.setNewStandardValue(newStandardValue)
    console.log('values for standard', newStandardValue)
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
      standards.push(props.selectedStandard)
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
  let handleValueSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedValue = newValue
      props.setSelectedValue(selectedValue)
    }
    if (actionMeta.action === 'clear') {
      let selectedValue = null
      props.setSelectedValue(selectedValue)
    }
  }
  let addValue = function () {
    let values = props.values
    if (props.selectedValue !== null) {
      values.push(props.selectedValue)
      props.setValuesData(values)
    }
    let selectedValue = null
    props.setSelectedValue(selectedValue)
  }
  let removeValue = function (index) {
    let values = JSON.parse(JSON.stringify(props.values))
    values.splice(index, 1)
    props.setValuesData(values)
  }
  let handleCheckitemSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedCheckitem = newValue
      props.setSelectedCheckitem(selectedCheckitem)
    }
    if (actionMeta.action === 'clear') {
      let selectedCheckitem = null
      props.setSelectedCheckitem(selectedCheckitem)
    }
  }
  let addCheckitementry = function () {
    let checkitems = props.checkitems
    if (props.selectedCheckitem !== null) {
      checkitems.push(props.selectedCheckitem)
      props.setCheckitemsData(checkitems)
    }
    let selectedCheckitem = null
    props.setSelectedCheckitem(selectedCheckitem)
  }
  let removeCheckitem = function (index) {
    let checkitems = JSON.parse(JSON.stringify(props.checkitems))
    checkitems.splice(index, 1)
    props.setCheckitemsData(checkitems)
  }
  let saveCheckitem = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.name = props.addCheckitemValue.name
    payload.description = ''
    payload.type_id = props.reviewCategories.id
    if (props.values.length > 0) {
      payload.values = props.values.map(function (data, index) {
        let obj = {}
        // obj.id = data.id
        obj.name = data.name
        obj.description = data.description
        return obj
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
    // payload.name = props.newStandardValue.name
    // payload.description = props.newStandardValue.description
    // payload.reference = props.newStandardValue.reference
     if (props.standards.length > 0) {
      payload.standards = props.standards.map(function (data, index) {
        let obj = {}
        obj.id = data.id
        obj.name = props.newStandardValue.name
        obj.description = props.newStandardValue.description
        obj.reference = props.newStandardValue.reference
        return obj
      })
    } else {
      payload.standards = []
    }
    props.createCheckItem(payload)
  }
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
                      <input type='text' className='form-control m-input m--margin-top-10' value={props.addCheckitemValue.name} onChange={handleNameChange} placeholder='Check Item Name' aria-describedby='basic-addon2' />
                      <input type='text' className='form-control m-input m--margin-top-10' value={''} placeholder='Check Item Description' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right m--margin-top-10'>
                    <div className='pull-right'>
                      <a href='/checkitems' className='btn btn-outline-info btn-sm'>Cancel</a>&nbsp;
                      <button onClick={saveCheckitem} className='btn btn-outline-info btn-sm'>Save</button>
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
                                    options={reviewCategoryOptions}
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
                                          <div className='form-group m-form__group row'>
                                            {/* <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label> */}
                                            <div className='col-8'>
                                              <Select
                                                // className='col-7 input-sm m-input'
                                                placeholder='Select Category'
                                                isClearable
                                                value={props.selectedValue}
                                                onChange={handleValueSelect}
                                                isSearchable={false}
                                                name={'roleSelected'}
                                                options={checkitemsvalueOptions}
                                              />
                                            </div>
                                            <button type='button' onClick={addValue} className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                          </div>
                                          <span className='m-list-search__result-item'>
                                            <div className='m-section m-section--last'>
                                              <div className='m-section__content'>
                                                <div className='m-demo'>
                                                  <div className='m-demo__preview'>
                                                    <div className='m-list-search'>
                                                      <div className='m-list-search__results'>
                                                        <span className='m-list-search__result-item'>
                                                          {valueList}
                                                        </span>
                                                        <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                                    Select Check Item
                                                                </span>
                                                        <div className='form-group m-form__group row'>
                                                          {/* <label htmlFor='example-email-input' className='col-2 col-form-label'>Select</label> */}
                                                          <div className='col-8'>
                                                            <Select
                                                              // className='col-7 input-sm m-input'
                                                              placeholder='Select Category'
                                                              isClearable
                                                              value={props.selectedCheckitem}
                                                              onChange={handleCheckitemSelect}
                                                              isSearchable={false}
                                                              name={'roleSelected'}
                                                              options={checkItemsOptions}
                                                            />
                                                          </div>
                                                          <button type='button' onClick={addCheckitementry} className='btn btn-outline-info col-2 btn-sm'>Add</button>
                                                        </div>
                                                        <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                                    Selected Check Item
                                                                </span>
                                                        <div className='m-demo__preview'>
                                                          {checkitemList}
                                                        </div>
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
                                    <div className='m-demo__preview'>
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
                                    <div className='m-demo__preview'>
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
                        <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' autoComplete='off' required />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description-text' className='form-control-label'>Description:</label>
                        <textarea className='form-control'ref={textarea => (DescriptionBox = textarea)} defaultValue={''} autoComplete='off' required />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='component-name' className='form-control-label'>Reference:</label>
                        <input type='text' className='form-control' ref={input => (ReferenceBox = input)} id='component-name' autoComplete='off' required />
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
    componentTypeComponentCheckitemsvalues: PropTypes.any,
    reviewCategories: PropTypes.any,
    selectedStandard: PropTypes.any,
    selectedPrinciple: PropTypes.any,
    selectedValue: PropTypes.any,
    selectedCheckitem: PropTypes.any,
    principles: PropTypes.any,
    standards: PropTypes.any,
    values: PropTypes.any,
    checkitems: PropTypes.any,
    setStandardsData: PropTypes.func,
    setPrinciplesData: PropTypes.func,
    setValuesData: PropTypes.func,
    setCheckitemsData: PropTypes.func,
    addCheckitemValue: PropTypes.any,
    newStandardValue: PropTypes.any,
    createCheckItem: PropTypes.func,
    addStandard: PropTypes.func,
    modalIsOpen: PropTypes.any
 }
