import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function viewcheckItem (props) {
  console.log('EDC', props.componentTypecomponent)
  console.log('EDC', props.componentTypecomponents)
  console.log('checkitemby id', props.checkitembyId)
  console.log('****', props.setEditCheckItemSettings)
  console.log('Data for addcheckitem', props.componentTypeComponentCheckitems)
  console.log('Data for principle', props.componentTypeComponentPrinciples)
  console.log('Data for standard', props.componentTypeComponentStandards)
  console.log('Data for values', props.componentTypeComponentCheckitemsvalues)
  console.log('data for category', props.reviewCategories, props.deleteCheckitem, props.updateCheckItemValue, props.setPrinciplesData)
  console.log('***', props.selectedStandard, props.setUpdateCheckItemValue, props.setStandardsData, props.setValuesData, props.setCheckitemsData)
  let checkItemsOptions = []
  let standardsOptions = []
  let principlesOptions = []
  let checkitemsvalueOptions = []
  let reviewCategoryOptions = []
  let standardListforedit = ''
  let principleListforedit = ''
  let valueListforedit = ''
  let checkitemListforedit = ''
  let principleList = ''
  let principlename = ''
  let standardList = ''
  let standardname = ''
  let valuesList = ''
  let valuename = ''
  let checkitemname = ''

 // code for data of checkitem
  if (props.checkitembyId && props.checkitembyId !== '') {
    checkitemname = props.checkitembyId.resources[0].name
    if (props.checkitembyId.resources.length > 0) {
      principlename = props.checkitembyId.resources[0].principles
      principleList = principlename.map(function (data, index) {
        return (
          <tr key={index}>
            <td><a href={''}>{data.name}</a></td>
          </tr>
        )
      })
      standardname = props.checkitembyId.resources[0].standards
      standardList = standardname.map(function (data, index) {
        return (
          <tr key={index}>
            <td><a href={''}>{data.name}</a></td>
          </tr>
        )
      })
      valuename = props.checkitembyId.resources[0].values
      valuesList = valuename.map(function (data, index) {
        let checkList = []
        if (data.requires_check_items.length > 0) {
          checkList = data.requires_check_items.map(function (checkItem, ix) {
            return (<span className='m-list-search__result-item' key={ix}>
              <span className='m-list-search__result-item-text'>{checkItem.name}</span>
            </span>)
          })
        }
        return (<span className='m-list-search__result-item'>
          <span className='m-list-search__result-item-text'>{data.name}</span>
          <div className='m-section m-section--last'>
            <div className='m-section__content'>
              <div className='m-demo'>
                <div className='m-demo__preview'>
                  <div className='m-list-search'>
                    <div className='m-list-search__results'>
                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                  Selected Check Item
                              </span>
                      {checkList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>)
      })
    }
  }
  // code for data of checkitem ends
  if (props.componentTypeComponentCheckitems && props.componentTypeComponentCheckitems !== '') {
    checkItemsOptions = props.componentTypeComponentCheckitems.resources.map(function (data, index) {
     data.label = data.name
     data.type = 'NEW'
     return data
    })
  }
  if (props.componentTypeComponentPrinciples && props.componentTypeComponentPrinciples !== '') {
    principlesOptions = props.componentTypeComponentPrinciples.resources.map(function (data, index) {
      data.label = data.name
      data.type = 'NEW'
      return data
    })
  }
  if (props.componentTypeComponentStandards && props.componentTypeComponentStandards !== '') {
    standardsOptions = props.componentTypeComponentStandards.resources.map(function (data, index) {
      data.label = data.name
      data.type = 'NEW'
      return data
    })
  }
  if (props.componentTypeComponentCheckitemsvalues && props.componentTypeComponentCheckitemsvalues !== '') {
   checkitemsvalueOptions = props.componentTypeComponentCheckitemsvalues.resources.map(function (data, index) {
     data.label = data.name
     data.type = 'NEW'
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
   standardListforedit = props.standards.map(function (data, index) {
     return (<span className='m-list-search__result-item' key={index}>
       <span className='m-list-search__result-item-text'>{data.name}</span>
       <button type='button' onClick={(event) => { removeStandard(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
     </span>)
   })
   console.log('standardList', standardListforedit)
 } else {
   standardListforedit = ''
   console.log('standardList', standardListforedit)
 }
 if (props.principles.length > 0) {
   console.log(props.principles)
   principleListforedit = props.principles.map(function (data, index) {
     return (<span className='m-list-search__result-item' key={index}>
       <span className='m-list-search__result-item-text'>{data.name}</span>
       <button type='button' onClick={(event) => { removePrinciple(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
     </span>)
   })
   console.log('standardList', principleListforedit)
 } else {
  principleListforedit = ''
   console.log('standardList', principleListforedit)
 }
   if (props.checkitems.length > 0) {
   console.log(props.checkitems)
   checkitemListforedit = props.checkitems.map(function (data, index) {
     return (<span className='m-list-search__result-item' key={index}>
       <span className='m-list-search__result-item-text'>{data.name}</span>
       <button type='button' onClick={(event) => { removeCheckitem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
     </span>)
   })
   console.log('standardList', checkitemListforedit)
 } else {
  checkitemListforedit = ''
   console.log('standardList', checkitemListforedit)
 }
 if (props.values.length > 0) {
   console.log(props.values)
  valueListforedit = props.values.map(function (data, index) {
     return (<span className='m-list-search__result-item' key={index}>
       <span className='m-list-search__result-item-text'>{data.name}</span>
       <button type='button' onClick={(event) => { removeValue(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
     </span>)
   })
   console.log('standardList', valueListforedit)
 } else {
  valueListforedit = ''
   console.log('standardList', valueListforedit)
 }
  console.log('&&&', principleList)
  let handletitleChange = function (event) {
    let value = event.target.value
    let updateCheckItemValue = {...props.updateCheckItemValue}
    updateCheckItemValue.name = value
    props.setUpdateCheckItemValue(updateCheckItemValue)
    console.log('*&*&', updateCheckItemValue)
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
    console.log(props)
    if (props.selectedStandard !== null) {
      standards.push(props.selectedStandard)
      props.setStandardsData(standards)
    }
    let selectedStandard = null
    props.setSelectedStandard(selectedStandard)
  }
  let removeStandard = function (index) {
    let standards = JSON.parse(JSON.stringify(props.standards))
    let removeItem = standards.splice(index, 1)
    if (removeItem[0].type === 'OLD') {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/standards/' + index
      let payload = JSON.parse(JSON.stringify(props.payload))
      payload.push(obj)
      props.setPayload(payload)
    }
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
    let removeItem = principles.splice(index, 1)
    if (removeItem[0].type === 'OLD') {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/principles/' + index
      let payload = JSON.parse(JSON.stringify(props.payload))
      payload.push(obj)
      props.setPayload(payload)
    }
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
    let removeItem = values.splice(index, 1)
    if (removeItem[0].type === 'OLD') {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/values/' + index
      let payload = JSON.parse(JSON.stringify(props.payload))
      payload.push(obj)
      props.setPayload(payload)
    }
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
  let editCheckItemCancel = function () {
    let editCheckItemsSettings = {...props.editCheckItemsSettings, 'isEditFlag': true}
    props.setEditCheckItemSettings(editCheckItemsSettings)
  }
  let CheckItemEdit = function () {
    let editCheckItemsSettings = {...props.editCheckItemsSettings, 'isEditFlag': false}
    props.setEditCheckItemSettings(editCheckItemsSettings)
    let updateCheckItemValue = {...props.updateCheckItemValue}
    updateCheckItemValue.name = checkitemname
    props.setUpdateCheckItemValue(updateCheckItemValue)
    if (props.checkitembyId.resources[0].standards.length > 0) {
      let standards = props.checkitembyId.resources[0].standards.map(function (data, index) {
        data.type = 'OLD'
        return data
      })
      props.setStandardsData(standards)
      console.log('###', standards)
    }
    if (props.checkitembyId.resources[0].principles.length > 0) {
      let principles = props.checkitembyId.resources[0].principles.map(function (data, index) {
        data.type = 'OLD'
        return data
      })
      props.setPrinciplesData(principles)
      console.log('###', principles)
    }
    if (props.checkitembyId.resources[0].values.length > 0) {
      let values = props.checkitembyId.resources[0].values.map(function (data, index) {
        data.type = 'OLD'
        return data
      })
      props.setValuesData(values)
      console.log('###', values)
    }
    if (props.checkitembyId.resources[0].values.length > 0) {
      let values = props.checkitembyId.resources[0].values.map(function (data, index) {
        data.type = 'OLD'
        return data
      })
      props.setValuesData(values)
      console.log('###', values)
    }
  }
  let deletecheckItem = function () {
    let editCheckItemsSettings = {...props.editCheckItemsSettings, 'isDeleteModalOpen': true}
    props.setEditCheckItemSettings(editCheckItemsSettings)
  }
  let closeDeleteModal = function () {
    let editCheckItemsSettings = {...props.editCheckItemsSettings, 'isDeleteModalOpen': false}
    props.setEditCheckItemSettings(editCheckItemsSettings)
  }
  let deleteCheckItem = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let checkitemId = props.match.params.id
    props.deleteCheckitem && props.deleteCheckitem(checkitemId)
    let editCheckItemsSettings = {...props.editCheckItemsSettings, 'isDeleteModalOpen': false}
    props.setEditCheckItemSettings(editCheckItemsSettings)
  }
  let saveEditCheckitem = function (event) {
    if (props.updateCheckItemValue.name.trim() !== '') {
      let payload = []
      let obj = {}
      // edit name payload
      obj.op = 'replace'
      obj.path = '/name'
      obj.value = props.updateCheckItemValue.name
      payload.push(obj)
      // edit description payload
      obj = {}
      obj.op = 'replace'
      obj.path = '/description'
      obj.value = props.updateCheckItemValue.description
      payload.push(obj)
      // edit category payload
      if (props.reviewCategories) {
        obj = {}
        obj.op = 'replace'
        obj.path = '/type'
        obj.value = props.reviewCategories.id
        payload.push(obj)
      }
      // edit values payload
      if (props.payload.length > 0) {
        payload = payload.concat(props.payload)
      }
      if (props.values.length > 0) {
        props.values.forEach(function (data, index) {
          if (data.type === 'NEW') {
            obj = {}
            obj.op = 'add'
            obj.path = '/values/-'
            obj.value = data.id
            obj.name = data.name
            obj.description = data.description
            payload.push(obj)
          }
        })
      }
      // edit Principles Payload
      if (props.principles.length > 0) {
        props.principles.forEach(function (data, index) {
          if (data.type === 'NEW') {
            obj = {}
            obj.op = 'add'
            obj.path = '/principles/-'
            obj.value = data.id
            payload.push(obj)
          }
        })
      }
      if (props.standards.length > 0) {
        props.standards.forEach(function (data, index) {
          if (data.type === 'NEW') {
            obj = {}
            obj.op = 'add'
            obj.path = '/standards/-'
            obj.value = data.id
            obj.name = data.name
            obj.description = data.description
            obj.reference = data.reference
            payload.push(obj)
          }
        })
      }
      // props.createTemplates(payload)
      let updatePayload = {}
      updatePayload.urlPart = {}
      updatePayload.urlPart.check_item_template_id = parseInt(props.match.params.id)
      updatePayload.payloadPart = payload
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.updateCheckitem(updatePayload)
      console.log('payload', updatePayload, props)
    }
  }
    return (
      <div>
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          {props.editCheckItemsSettings.isEditFlag && (<br />)}
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption' style={{width: '100%'}}>
              <div className='m-portlet__head-title' style={{width: '100%'}}>
                {!props.editCheckItemsSettings.isEditFlag && (<div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='form-group m-form__group has-danger'>
                      <input type='text' className='form-control m-input' value={props.updateCheckItemValue.name} onChange={handletitleChange} placeholder='CheckItem Name' aria-describedby='basic-addon2' />
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <button onClick={editCheckItemCancel} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;&nbsp;
                      <button onClick={saveEditCheckitem} className='btn btn-outline-info btn-sm'>Save</button>
                    </div>
                  </div>
                </div>)}
                {props.editCheckItemsSettings.isEditFlag && (<div className='row' style={{width: '100%'}}>
                  <div className='col-8'>
                    <div className='m-portlet__head-text'>
                      {checkitemname}
                    </div>
                  </div>
                  <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <button onClick={CheckItemEdit} className='btn btn-outline-info btn-sm'>Edit CheckItem</button>&nbsp;&nbsp;
                      <button onClick={deletecheckItem} className='btn btn-outline-info btn-sm'>Delete CheckItem</button>
                    </div>
                  </div>
                  {/* <div className='col-4 float-right'>
                    <div className='pull-right'>
                      <button onClick={cancelCheckItemEdit} className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;&nbsp;
                      <button onClick={''} className='btn btn-outline-info btn-sm'>Save</button>
                    </div>
                  </div> */}
                </div>)}
                {/* <h3 className='m-portlet__head-text'>
                  Basic Portlet <small>portlet sub title</small>
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            {props.editCheckItemsSettings.isEditFlag && (<div className='row'>
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
                                {/* <div className='col-8'>
                                  <div className='m-radio-inline pull-left'>
                                    <label htmlFor='example-email-input' className='m-radio'>
                                      <input type='radio' name='example_8' value='1' />
                                      <span />
                                    </label>
                                    <label htmlFor='example-email-input' className='m-radio'>
                                      <input type='radio' name='example_8' value='2' />
                                      <span />
                                    </label>
                                  </div>
                                </div> */}
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
                                          {valuesList}
                                          {/* <div className='form-group m-form__group m--margin-top-30 row'>
                                            <div className='col-6'>
                                              <table>
                                                <tbody>
                                                  {valuesList}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div> */}
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
                                <div className='col-6'>
                                  <table>
                                    <tbody>
                                      {principleList}
                                    </tbody>
                                  </table>
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
                                <div className='col-6'>
                                  <table>
                                    <tbody>
                                      {standardList}
                                    </tbody>
                                  </table>
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
            </div>)}
            {!props.editCheckItemsSettings.isEditFlag && (<div className='row'>
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
                                                          {valueListforedit}
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
                                                          {checkitemListforedit}
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
                                <button onClick={addPrinciple} className='btn btn-outline-info col-2 btn-sm'>Add</button>
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
                                          <span className='m-list-search__result-item'>
                                            {principleListforedit}
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
                                    value={props.selectedStandard}
                                    onChange={handleStandardSelect}
                                    isSearchable={false}
                                    name={'roleSelected'}
                                    options={standardsOptions}
                                  />
                                </div>
                                <button onClick={addStandardData} className='btn btn-outline-info col-2 btn-sm'>Add</button>
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
                                          <span className='m-list-search__result-item'>
                                            {standardListforedit}
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
            </div>)}
            <div>
              <ReactModal isOpen={props.editCheckItemsSettings.isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                className='modal-dialog'
                style={{'content': {'top': '20%'}}}
                >
                <div className={''}>
                  <div className=''>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h6 className='modal-title' id='exampleModalLabel'>Delete CheckItem</h6>
                        <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                          <span aria-hidden='true'>×</span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        <h3>{checkitemname}</h3><br />
                        <p>Are you sure?</p>
                      </div>
                      <div className='modal-footer'>
                        <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                        <button type='button' onClick={deleteCheckItem} className={'btn btn-sm btn-outline-info'}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      </div>
      )
    }
    viewcheckItem.propTypes = {
      editCheckItemsSettings: PropTypes.any,
      setEditCheckItemSettings: PropTypes.func,
      updateCheckItemValue: PropTypes.any,
      setUpdateCheckItemValue: PropTypes.func,
      deleteCheckitem: PropTypes.func,
      updateCheckitem: PropTypes.func,
      componentTypecomponent: PropTypes.any,
      componentTypecomponents: PropTypes.any,
      checkitembyId: PropTypes.any,
      match: PropTypes.any,
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
      payload: PropTypes.any,
      checkitems: PropTypes.any,
      setStandardsData: PropTypes.func,
      setPrinciplesData: PropTypes.func,
      setValuesData: PropTypes.func,
      setCheckitemsData: PropTypes.func
 }
