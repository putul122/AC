import React from 'react'
import PropTypes from 'prop-types'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import Attachments from '../../containers/attachments/attachmentsContainer'
import Select from 'react-select'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'
import CreatableSelect from 'react-select/lib/Creatable'
import styles from './reviewDraftComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function ReviewDraft (props) {
  console.log('review draft', props.activeTab)
  let reviewStatus = ''
  let reviewName
  let reviewReason = ''
  let reviewNameSet = ''
  let reviewArtefactName = null
  let reviewArtefact = null
  let reviewArtefactId = ''
  let checkItemsOptions = []
  let categoryOptions = []
  let relationsOptions = []
  let artefactsOptions = []
  let usersOptions = []
  let tagOptions = []
  let checkItemList = ''
  let checkItemModalList = ''
  let contextId = props.match.params.id
  let cancelValidationClass = props.validationClass.cancelValidationClass
  let handleCheckbox = function (value, index) {
    console.log('handle group checkbox', value, index)
    let checkItemsSettings = {...props.checkItemsSettings}
    let checkItems = checkItemsSettings.checkItems
    checkItems[index].isChecked = value
    checkItemsSettings.checkItems = checkItems
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let selectCheckItems = function () {
    let checkItemsSettings = {...props.checkItemsSettings}
    console.log(checkItemsSettings.checkItems)
    let checkItems = props.draftEdit.checkItems || []
    let selectedCheckItems = checkItemsSettings.checkItems
    selectedCheckItems.forEach(function (data, index) {
      if (data.isChecked) {
        checkItems.push(data)
      }
    })
    let draftEdit = {...props.draftEdit}
    draftEdit.checkItems = checkItems
    props.setDraftEditData(draftEdit)
    closeCheckItemModal()
  }
  let handleEditTag = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' || actionMeta.action === 'create-option') {
      let selectedTags = newValue
      props.setSelectedTags(selectedTags)
    }
    if (actionMeta.action === 'clear') {
      let selectedTags = null
      props.setSelectedTags(selectedTags)
    }
  }
  let handleChange = function (newValue: any, actionMeta: any) {
    console.log('newValue', newValue)
    console.log('actionMeta', actionMeta)
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
      checkItemPayload.params = {}
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
      checkItemPayload.params.search = search
      props.fetchCheckItemTemplates && props.fetchCheckItemTemplates(checkItemPayload)
      checkItemsSettings.selectedCheckItems = newValue
    }
    if (actionMeta.action === 'clear') {
      checkItemPayload.params = {}
      props.fetchCheckItemTemplates && props.fetchCheckItemTemplates(checkItemPayload)
      checkItemsSettings.selectedCheckItems = null
    }
    props.setCheckitemsSettings(checkItemsSettings)
  }
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
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
    if (reviewArtefactId !== null && reviewArtefactId !== '') {
      console.log('inside if', reviewArtefactId, typeof reviewArtefactId)
      let payload = {}
      payload.isModalOpen = true
      payload.componentId = reviewArtefactId
      payload.callAPI = true
      props.setModalSettings(payload)
    } else {
      alert('Artefact Id not set')
    }
  }
  if (props.reviewData && props.reviewData !== '' & props.reviewData.error_code === null) {
    reviewNameSet = props.reviewData.resources[0].name
    reviewStatus = props.reviewData.resources[0].status
    reviewReason = props.reviewData.resources[0].reason
    reviewArtefactId = props.reviewData.resources[0].review_artefact_id
    reviewArtefactName = props.reviewData.resources[0].review_artefact_name
    // if (reviewArtefactId == null) {
    //   return
    //   reviewArtefactName = <a>props.reviewData.resources[0].review_artefact_name || 'Connect to Artefact'</a>
    // }
  }
  if (props.reviewProperties.category && props.reviewProperties.category.length > 0) {
    categoryOptions = props.reviewProperties.category.map(function (data, index) {
      data.label = data.name
      return data
    })
    // if (reviewData && reviewData !== '' & reviewData.error_code === null) {
    //   let defaultCategoryId = reviewData.resources[0].review_category_id
    //   let defaultcategoryObject = _.find(categoryOptions, function (obj) {
    //     return obj.id === defaultCategoryId
    //   })
    //   if (defaultcategoryObject) {
    //     defaultcategoryObject.label = defaultcategoryObject.name
    //   }
    //   props.setSelectedCategory(defaultcategoryObject)
    // }
  }
  if (props.reviewArtefacts && props.reviewArtefacts !== '') {
    if (props.reviewArtefacts.error_code === null) {
      artefactsOptions = props.reviewArtefacts.resources.map(function (data, index) {
        data.label = data.name
        return data
      })
    }
  }
  if (props.users && props.users !== '') {
    if (props.users.error_code === null) {
      usersOptions = props.users.resources.map(function (data, index) {
        data.label = data.first_name + ' ' + data.last_name
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
        data.type = 'NEW'
        return data
      })
      console.log('check opt', checkItemsOptions)
    }
  }
  let handleApproverSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedApprover = newValue
      props.setSelectedApprover(selectedApprover)
      let validationClass = {...props.validationClass}
      validationClass.approverValidationClass = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
    if (actionMeta.action === 'clear') {
      let selectedApprover = null
      props.setSelectedApprover(selectedApprover)
    }
  }
  let handleReviewerSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let selectedReviewer = newValue
      props.setSelectedReviewer(selectedReviewer)
      let validationClass = {...props.validationClass}
      validationClass.reviewerValidationClass = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
    if (actionMeta.action === 'clear') {
      let selectedReviewer = null
      props.setSelectedReviewer(selectedReviewer)
    }
  }
  let handleCancelReason = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.cancelReason = event.target.value
    props.setDraftEditData(draftEdit)
    if (event.target.value !== '') {
      let validationClass = {...props.validationClass}
      validationClass.cancelValidationClass = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
  }
  let handleReferenceChange = function (event) {
    let draftEdit = {...props.draftEdit}
    draftEdit.document_reference = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleVersionChange = function (event) {
    let draftEdit = {...props.draftEdit}
    draftEdit.document_version = event.target.value
    props.setDraftEditData(draftEdit)
  }
  let handleNameChange = debounce((e) => {
    console.log(e, reviewName)
    let validationClass = {...props.validationClass}
    let draftEdit = {...props.draftEdit}
    let updateNameSettings = {...props.updateNameSettings}
    if (reviewName) {
      console.log('if ', reviewName.value)
      let value = reviewName.value
      if (value.trim() !== '') {
        validationClass.nameValidationClass = 'form-group m-form__group row'
        props.setValidationClass(validationClass)
        let appPackage = JSON.parse(localStorage.getItem('packages'))
        let componentTypes = appPackage.resources[0].component_types
        let componentTypeId = _.result(_.find(componentTypes, function (obj) {
            return obj.key === 'Review'
        }), 'component_type')
        let payload = {}
        payload.id = componentTypeId
        payload.params = {}
        payload.params.search = value
        props.verifyName(payload)
        draftEdit.name = value
        props.setDraftEditData(draftEdit)
        // eslint-disable-next-line
        mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      } else {
        draftEdit.name = reviewName.value
        props.setDraftEditData(draftEdit)
        updateNameSettings.showValidation = false
        updateNameSettings.message = ''
        props.setUpdateNameSettings(updateNameSettings)
        // let editTemplateSettings = {...props.editTemplateSettings, 'name': value, 'showValidation': false, 'message': ''}
        // props.setEditTemplateSettings(editTemplateSettings)
      }
    } else {
      draftEdit.name = ''
      props.setDraftEditData(draftEdit)
      updateNameSettings.showValidation = false
      updateNameSettings.message = ''
      props.setUpdateNameSettings(updateNameSettings)
      validationClass.nameValidationClass = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
  }, 500)
  // let handleNameChange2 = function (event) {
  //   let draftEdit = {...props.draftEdit}
  //   draftEdit.name = event.target.value
  //   props.setDraftEditData(draftEdit)
  // }
  let handleDescriptionChange = function (event) {
    console.log('event', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.description = event.target.value
    props.setDraftEditData(draftEdit)
  }
  // let handleCategoryChange = function (event) {
  //   console.log('event', event.target)
  //   let draftEdit = {...props.draftEdit}
  //   draftEdit.category = event.target.value
  //   props.setDraftEditData(draftEdit)
  // }
  let handleCategorySelect = function (newValue: any, actionMeta: any) {
    console.log('cat select', newValue)
    if (actionMeta.action === 'select-option') {
      let selectedCategory = newValue
      props.setSelectedCategory(selectedCategory)
      let validationClass = {...props.validationClass}
      validationClass.categoryValidationClass = 'form-group m-form__group row'
      props.setValidationClass(validationClass)
    }
    if (actionMeta.action === 'clear') {
      let selectedCategory = null
      props.setSelectedCategory(selectedCategory)
    }
  }
  // let handleReviewerChange = function (event) {
  //   console.log('event', event.target)
  //   let draftEdit = {...props.draftEdit}
  //   draftEdit.reviewer = event.target.value
  //   props.setDraftEditData(draftEdit)
  // }
  // let handleApproverChange = function (event) {
  //   console.log('event', event.target)
  //   let draftEdit = {...props.draftEdit}
  //   draftEdit.approver = event.target.value
  //   props.setDraftEditData(draftEdit)
  // }
  let handleCancel = function (event) {
    console.log('event cancel', event.target)
    let draftEdit = {...props.draftEdit}
    draftEdit.isCancel = event.target.checked
    props.setDraftEditData(draftEdit)
  }
  // eslint-disable-next-line
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
      let connectArtefactSettings = {...props.connectArtefactSettings, 'selectedRelations': null, 'selectedArtefact': null}
      props.setConnectArtefactSettings(connectArtefactSettings)
    }
  }
  let handleArtefactSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      let connectArtefactSettings = {...props.connectArtefactSettings, 'selectedArtefact': newValue}
      props.setConnectArtefactSettings(connectArtefactSettings)
    }
    if (actionMeta.action === 'clear') {
      let connectArtefactSettings = {...props.connectArtefactSettings, 'selectedArtefact': null}
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
  // eslint-disable-next-line
  let addcheckItem = function () {
    let checkItems = props.draftEdit.checkItems || []
    console.log(props)
    if (props.selectedCheckItem !== null) {
      checkItems.push(props.selectedCheckItem)
      let draftEdit = {...props.draftEdit}
      draftEdit.checkItems = checkItems
      props.setDraftEditData(draftEdit)
    }
    let selectedCheckItem = null
    props.setSelectedCheckItem(selectedCheckItem)
  }
  let removeCheckItem = function (index) {
    let draftEdit = JSON.parse(JSON.stringify(props.draftEdit))
    let checkItems = draftEdit.checkItems
    let removeCheckItem = checkItems.splice(index, 1)
    if (removeCheckItem[0].type === 'OLD') {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/check_items/' + index
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
    let draftEdit1 = {...props.draftEdit}
    draftEdit1.checkItems = checkItems
    props.setDraftEditData(draftEdit1)
  }
  let saveReview = function (event) {
    if (props.selectedCategory === null || props.selectedApprover === null || props.selectedReviewer === null) {
      let validationClass = {...props.validationClass}
      if (props.selectedCategory === null) {
        validationClass.categoryValidationClass = 'form-group m-form__group row has-danger'
      }
      if (props.selectedApprover === null) {
        validationClass.approverValidationClass = 'form-group m-form__group row has-danger'
      }
      if (props.selectedReviewer === null) {
        validationClass.reviewerValidationClass = 'form-group m-form__group row has-danger'
      }
      props.setValidationClass(validationClass)
    }
    if (props.draftEdit.name.trim() !== '' && props.updateNameSettings.toUpdate) {
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      let updatePayload = []
      let draftEdit = JSON.parse(JSON.stringify(props.draftEdit))
      delete draftEdit.checkItems
      delete draftEdit.isCancel
      delete draftEdit.cancelReason
      for (let x in draftEdit) {
        if (draftEdit.hasOwnProperty(x)) {
          if (x === 'category') {
            if (props.selectedCategory) {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/review_category'
              obj.value = props.selectedCategory.id || props.draftEdit.category
              updatePayload.push(obj)
            }
          } else if (x === 'reviewer') {
            if (props.selectedReviewer) {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/reviewer'
              obj.value = props.selectedReviewer.first_name + ' ' + props.selectedReviewer.last_name
              updatePayload.push(obj)
              obj = {}
              obj.op = 'replace'
              obj.path = '/reviewer_id'
              obj.value = props.selectedReviewer.id
              updatePayload.push(obj)
            } else {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/reviewer'
              obj.value = null
              updatePayload.push(obj)
              obj = {}
              obj.op = 'replace'
              obj.path = '/reviewer_id'
              obj.value = null
              updatePayload.push(obj)
            }
          } else if (x === 'approver') {
            if (props.selectedApprover) {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/approver'
              obj.value = props.selectedApprover.first_name + ' ' + props.selectedApprover.last_name
              updatePayload.push(obj)
              obj = {}
              obj.op = 'replace'
              obj.path = '/approver_id'
              obj.value = props.selectedApprover.id
              updatePayload.push(obj)
            } else {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/approver'
              obj.value = null
              updatePayload.push(obj)
              obj = {}
              obj.op = 'replace'
              obj.path = '/approver_id'
              obj.value = null
              updatePayload.push(obj)
            }
          } else if (x === 'tag') {
            if (props.selectedTags) {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/tag'
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
              obj.value = value
              updatePayload.push(obj)
            } else {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/tag'
              obj.value = null
              updatePayload.push(obj)
            }
          } else {
            let obj = {}
            obj.op = 'replace'
            obj.path = '/' + x
            obj.value = props.draftEdit[x]
            updatePayload.push(obj)
          }
        }
      }
      // set reason in payload
      let obj = {}
      obj.op = 'replace'
      obj.path = '/reason'
      obj.value = props.draftEdit.cancelReason
      updatePayload.push(obj)
      if (props.updatePayload.length > 0) {
        updatePayload = updatePayload.concat(props.updatePayload)
      }
      if (props.draftEdit.checkItems.length > 0) {
        props.draftEdit.checkItems.forEach(function (data, index) {
          if (data.type === 'NEW') {
            let obj = {}
            obj.op = 'add'
            obj.path = '/check_items/-'
            obj.value = data.id
            updatePayload.push(obj)
          }
        })
      }
      let payload = {}
      payload.reviewId = parseInt(contextId)
      payload.data = updatePayload
      console.log('update payload', payload)
      props.updateReviews(payload)
    } else {
      let validationClass = {...props.validationClass}
      validationClass.nameValidationClass = 'form-group m-form__group row has-danger'
      props.setValidationClass(validationClass)
    }
  }
  let submitReview = function (event) {
    console.log('on submit')
    if (props.selectedCategory === null || props.selectedApprover === null || props.selectedReviewer === null) {
      let validationClass = {...props.validationClass}
      if (props.selectedCategory === null) {
        validationClass.categoryValidationClass = 'form-group m-form__group row has-danger'
      }
      if (props.selectedApprover === null) {
        validationClass.approverValidationClass = 'form-group m-form__group row has-danger'
      }
      if (props.selectedReviewer === null) {
        validationClass.reviewerValidationClass = 'form-group m-form__group row has-danger'
      }
      props.setValidationClass(validationClass)
    } else {
      if (props.draftEdit.name.trim() !== '' && props.updateNameSettings.toUpdate) {
        let updatePayload = []
        let draftEdit = JSON.parse(JSON.stringify(props.draftEdit))
        delete draftEdit.checkItems
        delete draftEdit.isCancel
        delete draftEdit.cancelReason
        for (let x in draftEdit) {
          if (draftEdit.hasOwnProperty(x)) {
            if (x === 'category') {
              if (props.selectedCategory) {
                let obj = {}
                obj.op = 'replace'
                obj.path = '/review_category'
                obj.value = props.selectedCategory.id || props.draftEdit.category
                updatePayload.push(obj)
              }
            } else if (x === 'reviewer') {
              if (props.selectedReviewer) {
                let obj = {}
                obj.op = 'replace'
                obj.path = '/reviewer'
                obj.value = props.selectedReviewer.first_name + ' ' + props.selectedReviewer.last_name
                updatePayload.push(obj)
                obj = {}
                obj.op = 'replace'
                obj.path = '/reviewer_id'
                obj.value = props.selectedReviewer.id
                updatePayload.push(obj)
              } else {
                let obj = {}
                obj.op = 'replace'
                obj.path = '/reviewer'
                obj.value = null
                updatePayload.push(obj)
                obj = {}
                obj.op = 'replace'
                obj.path = '/reviewer_id'
                obj.value = null
                updatePayload.push(obj)
              }
            } else if (x === 'approver') {
              if (props.selectedApprover) {
                let obj = {}
                obj.op = 'replace'
                obj.path = '/approver'
                obj.value = props.selectedApprover.first_name + ' ' + props.selectedApprover.last_name
                updatePayload.push(obj)
                obj = {}
                obj.op = 'replace'
                obj.path = '/approver_id'
                obj.value = props.selectedApprover.id
                updatePayload.push(obj)
              } else {
                let obj = {}
                obj.op = 'replace'
                obj.path = '/approver'
                obj.value = null
                updatePayload.push(obj)
                obj = {}
                obj.op = 'replace'
                obj.path = '/approver_id'
                obj.value = null
                updatePayload.push(obj)
              }
            } else {
              let obj = {}
              obj.op = 'replace'
              obj.path = '/' + x
              obj.value = props.draftEdit[x]
              updatePayload.push(obj)
            }
          }
        }
        // set reason in payload
        let obj = {}
        obj.op = 'replace'
        obj.path = '/reason'
        obj.value = props.draftEdit.cancelReason
        updatePayload.push(obj)

        if (props.updatePayload.length > 0) {
          updatePayload = updatePayload.concat(props.updatePayload)
        }
        if (props.draftEdit.checkItems.length > 0) {
          props.draftEdit.checkItems.forEach(function (data, index) {
            if (data.type === 'NEW') {
              let obj = {}
              obj.op = 'add'
              obj.path = '/check_items/-'
              obj.value = data.id
              updatePayload.push(obj)
            }
          })
        }
        if (props.draftEdit.isCancel) {
          console.log('if cancel')
          if (props.draftEdit.cancelReason !== null && props.draftEdit.cancelReason !== '') {
            console.log('if inside')
            // eslint-disable-next-line
            mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
            console.log('update payload', updatePayload)
            // set stage to Completed
            let completedId = _.result(_.find(props.reviewProperties.stages, function (obj) {
              return obj.name === 'Completed'
            }), 'id')
            let obj = {}
            obj.op = 'replace'
            obj.path = '/stage'
            obj.value = completedId
            updatePayload.push(obj)
            // set status to Cancelled
            obj = {}
            obj.op = 'replace'
            obj.path = '/status'
            obj.value = 'Cancelled'
            updatePayload.push(obj)
            let payload = {}
            payload.reviewId = contextId
            payload.data = updatePayload
            props.updateReviews(payload)
          } else {
            console.log('if else inside')
            let validationClass = {...props.validationClass}
            validationClass.cancelValidationClass = 'form-group m-form__group row has-danger'
            console.log('validationClass', validationClass)
            console.log(props.setValidationClass)
            props.setValidationClass(validationClass)
          }
        } else {
          // eslint-disable-next-line
          mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
          // set stage to approval
          let acceptanceId = _.result(_.find(props.reviewProperties.stages, function (obj) {
            return obj.name === 'Acceptance'
          }), 'id')
          let obj = {}
          obj.op = 'replace'
          obj.path = '/stage'
          obj.value = acceptanceId
          updatePayload.push(obj)
          console.log('update payload', updatePayload)
          let payload = {}
          payload.reviewId = contextId
          payload.data = updatePayload
          props.updateReviews(payload)
        }
      } else {
        let validationClass = {...props.validationClass}
        validationClass.nameValidationClass = 'form-group m-form__group row has-danger'
        props.setValidationClass(validationClass)
      }
    }
  }
  let connectArtefact = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    let payload = {}
    payload.reviewId = contextId
    payload.data = []
    if (props.connectArtefactSettings.selectedArtefact) {
      let obj = {}
      if (reviewArtefact) {
        obj.op = 'replace'
      } else {
        obj.op = 'add'
      }
      obj.path = 'review_artefact_id'
      obj.value = props.connectArtefactSettings.selectedArtefact.id
      payload.data.push(obj)
    }
    localStorage.setItem('connectArtefact', 'connected')
    props.connectDisconnectArtefact(payload)
  }
  let disconnectArtefact = function (event) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    let payload = {}
    payload.reviewId = contextId
    payload.data = []
    let obj = {}
    obj.op = 'remove'
    obj.path = 'review_artefact_id'
    payload.data.push(obj)
    localStorage.setItem('connectArtefact', 'disconnected')
    props.connectDisconnectArtefact(payload)
  }
  if (props.draftEdit.checkItems) {
    if (props.draftEdit.checkItems.length > 0) {
      checkItemList = props.draftEdit.checkItems.map(function (data, index) {
        return (<span className='m-list-search__result-item' key={index}>
          <span className='m-list-search__result-item-text'><a href='' onClick={(event) => { event.preventDefault(); openModal(data) }} >{data.name}</a></span>
          <button type='button' onClick={() => { removeCheckItem(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
        </span>)
      })
    } else {
      checkItemList = ''
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
  console.log(props)
    return (
      <div>
        <div className='row clearfix'>
          <div className='col-xs-4 col-sm-6 col-md-8' ><h2>Complete Draft</h2></div>
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
              {/* <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button> */}
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-multimedia-3 fa-2x' />
              </a>
            </span>
          </div>
        </div>
        <br />
        <div className={styles.borderline} style={{'marginTop': '20px'}}>
          <ul className='nav nav-tabs nav-fill' role='tablist' style={{'marginBottom': '0px'}}>
            <li className='nav-item'>
              <a className='nav-link active' onClick={() => { props.setActiveTab('reviewsdetail') }} data-toggle='tab' href='#m_tabs_2_4'>Reviews Details</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => { props.setActiveTab('reviewsattachments') }} data-toggle='tab' href='#m_tabs_2_1'>Reviews Attachments</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='m_tabs_2_4' role='tabpanel'>
              <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
                <div className='m-portlet__body'>
                  <div className='row' style={{width: '100%'}}>
                    <div className='col-md-6 col-12'>
                      <div className='m-form m-form--state m-form--fit'>
                        {/* {messageBlock} */}
                        <div className={props.validationClass.nameValidationClass}>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Name</label>
                          <div className='col-8'>
                            {reviewNameSet !== '' && (<input className='form-control m-input' type='text' placeholder='Enter Review Name' defaultValue={reviewNameSet} onKeyUp={handleNameChange} ref={input => (reviewName = input)} />)}
                            {props.updateNameSettings.showValidation && (<div style={props.updateNameSettings.color} className='form-control-feedback has-danger'>{props.updateNameSettings.message}</div>)}
                          </div>
                        </div>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Description</label>
                          <div className='col-8'>
                            {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                            <textarea className='form-control m-input m-input--air' onChange={handleDescriptionChange} value={props.draftEdit.description} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                          </div>
                        </div>
                        <div className={props.validationClass.categoryValidationClass}>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Category<span className='text-danger'>*</span></label>
                          <div className='col-8'>
                            <Select
                              className='form-control'
                              placeholder='Select Category'
                              isClearable
                              // defaultValue={props.selectedCategory}
                              value={props.selectedCategory}
                              onChange={handleCategorySelect}
                              isSearchable={false}
                              name={'categorySelected'}
                              options={categoryOptions}
                            />
                            {/* <input className='form-control m-input' type='text' onChange={handleCategoryChange} placeholder='Enter Category' value={props.draftEdit.category} /> */}
                          </div>
                        </div>
                        <div className={props.validationClass.reviewerValidationClass}>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Reviewer<span className='text-danger'>*</span></label>
                          <div className='col-8'>
                            <Select
                              className='form-control'
                              placeholder='Select Reviewer'
                              isClearable
                              // defaultValue={dvalue}
                              value={props.selectedReviewer}
                              onChange={handleReviewerSelect}
                              isSearchable={false}
                              name={'reviewerSelected'}
                              options={usersOptions}
                            />
                            {/* <input className='form-control m-input' onChange={handleReviewerChange} type='text' placeholder='Enter Reviewer' value={props.draftEdit.reviewer} /> */}
                          </div>
                        </div>
                        <div className={props.validationClass.approverValidationClass}>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Approver<span className='text-danger'>*</span></label>
                          <div className='col-8'>
                            <Select
                              className='form-control'
                              style={{padding: '0 !important'}}
                              placeholder='Select Approver'
                              isClearable
                              // defaultValue={dvalue}
                              value={props.selectedApprover}
                              onChange={handleApproverSelect}
                              isSearchable={false}
                              name={'approverSelected'}
                              options={usersOptions}
                            />
                            {/* <input className='form-control m-input' onChange={handleApproverChange} type='text' placeholder='Enter Approver' value={props.draftEdit.approver} /> */}
                          </div>
                        </div>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Artefact</label>
                          <div className='col-8'>
                            <div className='row m--margin-top-10'>
                              {/* <div className='col-md-9'> */}
                              <div className='col-md-10'>
                                {reviewArtefactName && (<a href='javascript:void(0);' onClick={openComponentModal} >{reviewArtefactName}</a>)}
                                {!reviewArtefactName && (<span>Connect to Artefact</span>)}
                              </div>
                              {/* </div> */}
                              <div className='col-md-2 float-right'>
                                {reviewArtefactId === null && (<button onClick={openConnectModal} className='btn btn-outline-info btn-sm pull-right'>Connect</button>)}
                                {reviewArtefactId !== null && (<button onClick={disconnectArtefact} className='btn btn-outline-info btn-sm pull-right'>Disconnect</button>)}
                              </div>
                              {/* <div className='col-md-5 float-right'>
                                <button onClick={disconnectArtefact} className='btn btn-outline-info btn-sm pull-right'>Disconnect</button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Document No</label>
                          <div className='col-8'>
                            <input className='form-control m-input' type='text' placeholder='Enter Review Document No' value={props.draftEdit.document_reference} onChange={handleReferenceChange} id='example-userName-input' />
                          </div>
                        </div>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Review Document Version</label>
                          <div className='col-8'>
                            <input className='form-control m-input' type='text' placeholder='Enter Review Document Version' value={props.draftEdit.document_version} onChange={handleVersionChange} id='example-userName-input' />
                          </div>
                        </div>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>&nbsp;</label>
                          <div className='col-8'>
                            <br />
                            <div className='row'>
                              <div className='col-md-5'>
                                &nbsp;&nbsp;&nbsp;<label htmlFor='cancelReview' className='checkbox checkbox--danger' style={{'marginLeft': '-10px'}}>
                                  <input type='checkbox' checked={props.draftEdit.isCancel} onChange={handleCancel} /> Cancel Review
                                <span />
                                </label>
                              </div>
                              {/* <div className='col-md-7'>
                                <button onClick={openConnectModal} className='btn btn-outline-info btn-sm pull-left'>Connect</button>
                                <button onClick={disconnectArtefact} className='btn btn-outline-info btn-sm '>Disconnect</button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        {props.draftEdit.isCancel && (<div className={cancelValidationClass}>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Cancel Reason</label>
                          <div className='col-8'>
                            {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                            <textarea className='form-control m-input m-input--air' value={props.draftEdit.cancelReason} onChange={handleCancelReason} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                          </div>
                        </div>)}
                        <div className='m-demo'>
                          <div className='m-demo__preview'>
                            {(reviewStatus === 'Not Accepted' || reviewStatus === 'Returned') && (<div className='form-group m-form__group row'>
                              <label htmlFor='example-email-input' className='col-4 col-form-label'>Status</label>
                              <div className='col-8 m--margin-top-10'>{reviewStatus}</div>
                            </div>)}
                            {(reviewStatus === 'Not Accepted' || reviewStatus === 'Returned') && (<div className='form-group m-form__group row'>
                              <label htmlFor='example-email-input' className='col-4 col-form-label'>Reason</label>
                              <div className='col-8 m--margin-top-10'>{reviewReason}</div>
                            </div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='col-12'>
                        <div className='form-group m-form__group row'>
                          <label htmlFor='example-email-input' className='col-4 col-form-label'>Tags</label>
                          <div className='col-8'>
                            <CreatableSelect
                              className='input-sm m-input'
                              placeholder='Enter Tags'
                              isClearable
                              isMulti
                              onChange={handleEditTag}
                              value={props.selectedTags}
                              options={tagOptions}
                            />
                          </div>
                        </div>
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
                        </div> */}
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
                        {/* <button onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='btn btn-outline-info btn-sm'>Close</button>&nbsp;&nbsp;
                        <button onClick={saveReview} className='btn btn-outline-info btn-sm'>Save</button>&nbsp;&nbsp;
                        <button onClick={submitReview} className='btn btn-outline-info btn-sm'>Submit</button> */}
                        <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                          <button type='button' onClick={() => { window.location.href = window.location.origin + '/reviews' }} className='m-btn btn btn-secondary'>Close</button>
                          <button type='button' onClick={saveReview} className='m-btn btn btn-secondary'>Save</button>
                          <button type='button' onClick={submitReview} className='m-btn btn btn-secondary'>Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab-pane' id='m_tabs_2_1' role='tabpanel'>
              <Attachments type='Component' {...props} />
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
                            value={props.checkItemsSettings.selectedCheckItems}
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
          <ReactModal isOpen={props.connectArtefactSettings.isModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog modal-lg'
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
                            value={props.connectArtefactSettings.selectedArtefact}
                            onChange={handleArtefactSelect}
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
        <CheckItemModal />
      </div>
      )
    }
  ReviewDraft.propTypes = {
    reviewData: PropTypes.any,
    match: PropTypes.any,
    connectArtefactSettings: PropTypes.any,
    // eslint-disable-next-line
    selectedCheckItem: PropTypes.any,
    // eslint-disable-next-line
    updatePayload: PropTypes.any,
    reviewCheckitems: PropTypes.any,
    draftEdit: PropTypes.any,
    componentTypeRelations: PropTypes.any,
    reviewArtefacts: PropTypes.any,
    reviewProperties: PropTypes.any,
    validationClass: PropTypes.any,
    selectedCategory: PropTypes.any,
    users: PropTypes.any,
    selectedReviewer: PropTypes.any,
    selectedApprover: PropTypes.any,
    tags: PropTypes.any,
    checkItemsSettings: PropTypes.any,
    selectedTags: PropTypes.any,
    updateNameSettings: PropTypes.any,
    activeTab: PropTypes.any,
    setActiveTab: PropTypes.func
 }
