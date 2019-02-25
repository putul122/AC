import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './reviewsComponent.scss'
import Select from 'react-select'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import CreatableSelect from 'react-select/lib/Creatable'
ReactModal.setAppElement('#root')

export default function Reviewslists (props) {
console.log('JSON data for Reviews', props.reviewsSummary.count_by_status)
console.log('reviewlist', props.reviews)
// let softwareCount
let reviewName = ''
let reviewDescription = ''
let reviewsinDraft = ''
let reviewsinProgress = ''
let reviewsCompleted = ''
let reviewsCancelled = ''
let reviewsApproved = ''
let reviewsAcceptance = ''
let searchTextBox
let reviewList = ''
let totalNoPages
let perPage = props.perPage
let currentPage = props.currentPage
let nextClass = ''
let previousClass = ''
let pageArray = []
let listPage = []
let paginationLimit = 6
let totalReview
let templateOptions = ''
let tagOptions = []
let appPackage = JSON.parse(localStorage.getItem('packages'))
let componentTypes = appPackage.resources[0].component_types
let componentId = _.result(_.find(componentTypes, function (obj) {
  return obj.key === 'Review'
}), 'component_type')
let contextId = componentId
console.log(reviewName, reviewDescription)
let openDiscussionModal = function (event) {
  event.preventDefault()
  props.setDiscussionModalOpenStatus(true)
}
let clearAllFilter = function () {
  let filterSettings = {...props.filterSettings}
  filterSettings.myTask = false
  filterSettings.Draft = false
  filterSettings.Approval = false
  filterSettings.Acceptance = false
  filterSettings.InProgress = false
  filterSettings.Completed = false
  filterSettings.Cancelled = false
  filterSettings.selectedTags = null
  filterSettings.selectedCategory = null
  filterSettings.search = ''
  props.setFilterSettings(filterSettings)
  if (searchTextBox) {
    searchTextBox.value = ''
  }
  let payload = {
    'search': '',
    'page_size': 10,
    'page': 1
  }
  props.fetchReviews(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  props.setCurrentPage(1)
}
let handleTag = function (newValue: any, actionMeta: any) {
  // console.group('Value Changed first select')
  // console.log(newValue)
  // console.log(`action: ${actionMeta.action}`)
  // console.groupEnd()
  if (searchTextBox) {
    searchTextBox.value = ''
  }
  let filterSettings = {...props.filterSettings}
  filterSettings.callApi = true
  if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' || actionMeta.action === 'create-option') {
    filterSettings.selectedTags = newValue
    props.setFilterSettings(filterSettings)
  }
  if (actionMeta.action === 'clear') {
    filterSettings.selectedTags = null
    props.setFilterSettings(filterSettings)
  }
}
let categoryOptions = []
if (props.reviewProperties.category && props.reviewProperties.category.length > 0) {
  categoryOptions = props.reviewProperties.category.map(function (data, index) {
    data.label = data.name
    return data
  })
}
if (props.componentTypeComponents && props.componentTypeComponents !== '') {
  if (props.componentTypeComponents.error_code === null) {
    templateOptions = props.componentTypeComponents.resources.map(function (user, index) {
      if (user.name !== null && user.id !== null) {
        user.value = user.id
        user.label = user.name
        return user
      } else {
        return false
      }
    })
  } else {}
}
let handleColumnSort = function (order, name) {
  let filterSettings = {...props.filterSettings}
  filterSettings.columnSort = {}
  filterSettings.columnSort.order = order
  filterSettings.columnSort.name = name
  props.setFilterSettings(filterSettings)
}
let handleReviewName = debounce((e) => {
  console.log(e)
  if (reviewName) {
    let value = reviewName.value
    if (value.trim() !== '') {
      let componentTypes = appPackage.resources[0].component_types
      let componentTypeId = _.result(_.find(componentTypes, function (obj) {
          return obj.key === 'Review'
      }), 'component_type')
      let payload = {}
      payload.id = componentTypeId
      payload.params = {}
      payload.params.search = value
      props.verifyName(payload)
      let addReviewSettings = {...props.addReviewSettings, 'reviewName': value, 'nameValidationClass': 'form-group m-form__group row'}
      // eslint-disable-next-line
      mApp && mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setAddReviewSettings(addReviewSettings)
    } else {
      let addReviewSettings = {...props.addReviewSettings, 'reviewName': value, 'showValidation': false, 'message': ''}
      props.setAddReviewSettings(addReviewSettings)
    }
  } else {
    let addReviewSettings = {...props.addReviewSettings, 'reviewName': '', 'showValidation': false, 'message': ''}
    props.setAddReviewSettings(addReviewSettings)
  }
}, 500)
// function (event) {
//   let value = event.target.value
//   if (value.trim() !== '') {
//     let componentTypes = appPackage.resources[0].component_types
//     let componentTypeId = _.result(_.find(componentTypes, function (obj) {
//         return obj.key === 'Review'
//     }), 'component_type')
//     let payload = {}
//     payload.id = componentTypeId
//     payload.params = {}
//     payload.params.search = value
//     props.verifyName(payload)
//     let addReviewSettings = {...props.addReviewSettings, 'reviewName': value, 'nameValidationClass': 'form-group m-form__group row'}
//     props.setAddReviewSettings(addReviewSettings)
//   } else {
//     let addReviewSettings = {...props.addReviewSettings, 'reviewName': value}
//     props.setAddReviewSettings(addReviewSettings)
//   }
// }
let addReview = function () {
  let reviewName = props.addReviewSettings.reviewName
  if (reviewName.trim() !== '' && props.addReviewSettings.toAdd) {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let name = props.addReviewSettings.reviewName
    let description = reviewDescription.value
    let payload = {}
    payload.name = name
    payload.description = description
    if (props.addReviewSettings.templateSelected) {
      payload.review_template_id = props.addReviewSettings.templateSelected.id
    }
    props.createReviews(payload)
    console.log('add payload', payload)
  } else {
    let addReviewSettings = {...props.addReviewSettings, 'nameValidationClass': 'form-group m-form__group row has-danger'}
    props.setAddReviewSettings(addReviewSettings)
  }
}
let closeModal = function () {
  let addReviewSettings = {...props.addReviewSettings, 'isModalOpen': false, 'nameValidationClass': 'form-group m-form__group row', 'reviewName': '', 'showValidation': false, 'message': ''}
  props.setAddReviewSettings(addReviewSettings)
}
let openAddReview = function () {
  let addReviewSettings = {...props.addReviewSettings, isModalOpen: true}
  props.setAddReviewSettings(addReviewSettings)
}
let handleTemplateSelect = function (newValue: any, actionMeta: any) {
  console.group('Value Changed first select')
  console.log(newValue)
  console.log(`action: ${actionMeta.action}`)
  console.groupEnd()
  if (actionMeta.action === 'select-option') {
    // email = newValue.email
    let addReviewSettings = {...props.addReviewSettings, 'templateSelected': newValue}
    props.setAddReviewSettings(addReviewSettings)
  }
  if (actionMeta.action === 'clear') {
    let addReviewSettings = {...props.addReviewSettings, 'templateSelected': null}
    props.setAddReviewSettings(addReviewSettings)
  }
}
if (props.reviews && props.reviews !== '') {
  let sortedArray = _.orderBy(props.reviews.resources, ['name'], ['asc'])
  if (props.filterSettings.columnSort.name !== '') {
    if (props.filterSettings.columnSort.name === 'name') {
      if (props.filterSettings.columnSort.order === 'up') {
        sortedArray = _.orderBy(props.reviews.resources, ['name'], ['desc'])
      } else if (props.filterSettings.columnSort.order === 'down') {
        sortedArray = _.orderBy(props.reviews.resources, ['name'], ['asc'])
      }
    } else if (props.filterSettings.columnSort.name === 'category') {
      if (props.filterSettings.columnSort.order === 'up') {
        sortedArray = _.orderBy(props.reviews.resources, ['review_category'], ['desc'])
      } else if (props.filterSettings.columnSort.order === 'down') {
        sortedArray = _.orderBy(props.reviews.resources, ['review_category'], ['asc'])
      }
    } else if (props.filterSettings.columnSort.name === 'stage') {
      if (props.filterSettings.columnSort.order === 'up') {
        sortedArray = _.orderBy(props.reviews.resources, ['stage'], ['desc'])
      } else if (props.filterSettings.columnSort.order === 'down') {
        sortedArray = _.orderBy(props.reviews.resources, ['stage'], ['asc'])
      }
    } else if (props.filterSettings.columnSort.name === 'reviewer') {
      if (props.filterSettings.columnSort.order === 'up') {
        sortedArray = _.orderBy(props.reviews.resources, ['reviewer'], ['desc'])
      } else if (props.filterSettings.columnSort.order === 'down') {
        sortedArray = _.orderBy(props.reviews.resources, ['reviewer'], ['asc'])
      }
    } else if (props.filterSettings.columnSort.name === 'approver') {
      if (props.filterSettings.columnSort.order === 'up') {
        sortedArray = _.orderBy(props.reviews.resources, ['approver'], ['desc'])
      } else if (props.filterSettings.columnSort.order === 'down') {
        sortedArray = _.orderBy(props.reviews.resources, ['approver'], ['asc'])
      }
    }
  }
  console.log('sortedArray', sortedArray)
  console.log('sortedprops.filterSettings', props.filterSettings)
  // let sortedArray = _.orderBy(props.reviews.resources, ['name'], ['asc'])
  reviewList = sortedArray.map(function (data, index) {
    let link = ''
    if (data.stage === 'In Progress') {
      link = '/conduct_review/'
    } else if (data.stage === 'Draft') {
      link = '/review_draft/'
    } else if (data.stage === 'Completed') {
      link = '/reviews/'
    } else if (data.stage === 'Approval') {
      link = '/review_approval/'
    } else if (data.stage === 'Cancelled') {
      link = '/reviews/'
    } else if (data.stage === 'Acceptance') {
      link = '/accept_review/'
    } else {
      link = '/review_draft/'
    }
    return (
      <tbody>
        <tr key={index}>
          <td><a href={link + data.id} >{data.name}</a></td>
          <td>{data.review_category}</td>
          <td>{data.stage}</td>
          <td>{data.reviewer}</td>
          <td>{data.approver}</td>
        </tr>
      </tbody>
    )
  })

  totalReview = props.reviews.total_count
  totalNoPages = Math.ceil(totalReview / perPage)
}
if (currentPage === 1) {
  previousClass = 'm-datatable__pager-link--disabled'
}

if (currentPage === totalNoPages) {
  nextClass = 'm-datatable__pager-link--disabled'
}

let i = 1
while (i <= totalNoPages) {
  let pageParameter = {}
  pageParameter.number = i
  pageParameter.class = ''
  pageArray.push(pageParameter)
  i++
}
pageArray = _.chunk(pageArray, paginationLimit)
listPage = _.filter(pageArray, function (group) {
  let found = _.filter(group, {'number': currentPage})
  if (found.length > 0) { return group }
})

let handleInputChange = debounce((e) => {
  console.log(e)
  if (searchTextBox) {
    let payload = {
      'search': searchTextBox.value || '',
      'page_size': 10,
      'page': currentPage
    }
    let filterSettings = {...props.filterSettings}
    filterSettings.selectedTags = null
    props.setFilterSettings(filterSettings)
    let statges = props.reviewProperties.stages
    let stageIndex = 0
    if (filterSettings.myTask) {
      payload.current_user = filterSettings.myTask
    }
    if (filterSettings.Draft) {
      let draftId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Draft'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = draftId
    }
    if (filterSettings.Approval) {
      let approvalId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Approval'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = approvalId
    }
    if (filterSettings.Acceptance) {
      let acceptanceId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Acceptance'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = acceptanceId
    }
    if (filterSettings.InProgress) {
      let inProgressId = _.result(_.find(statges, function (obj) {
        return obj.name === 'In Progress'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = inProgressId
    }
    if (filterSettings.Completed) {
      let completedId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Completed'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = completedId
    }
    if (filterSettings.Cancelled) {
      let cancelledId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Cancelled'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = cancelledId
    }
    if (filterSettings.selectedCategory) {
      payload['category_ids[0]'] = filterSettings.selectedCategory.id
    }
    props.fetchReviews(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }
}, 500)
let handlePage = function (page) {
  if (page === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  } else if (page === totalNoPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let payload = {
    'search': searchTextBox.value ? searchTextBox.value : '',
    'page_size': 10,
    'page': page
  }
  let filterSettings = {...props.filterSettings}
  let statges = props.reviewProperties.stages
  let stageIndex = 0
  if (filterSettings.myTask) {
    payload.current_user = filterSettings.myTask
  }
  if (filterSettings.Draft) {
    let draftId = _.result(_.find(statges, function (obj) {
      return obj.name === 'Draft'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = draftId
  }
  if (filterSettings.Approval) {
    let approvalId = _.result(_.find(statges, function (obj) {
      return obj.name === 'Approval'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = approvalId
  }
  if (filterSettings.Acceptance) {
    let acceptanceId = _.result(_.find(statges, function (obj) {
      return obj.name === 'Acceptance'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = acceptanceId
  }
  if (filterSettings.InProgress) {
    let inProgressId = _.result(_.find(statges, function (obj) {
      return obj.name === 'In Progress'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = inProgressId
  }
  if (filterSettings.Completed) {
    let completedId = _.result(_.find(statges, function (obj) {
      return obj.name === 'Completed'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = completedId
  }
  if (filterSettings.Cancelled) {
    let cancelledId = _.result(_.find(statges, function (obj) {
      return obj.name === 'Cancelled'
    }), 'id')
    payload['stage_ids[' + stageIndex++ + ']'] = cancelledId
  }
  if (filterSettings.selectedCategory) {
    payload['category_ids[0]'] = filterSettings.selectedCategory.id
  }
  if (filterSettings.selectedTags) {
    let search = ''
    let tagLength = filterSettings.selectedTags.length
    if (tagLength > 0) {
      filterSettings.selectedTags.forEach(function (data, index) {
        search = search + '#' + data.value
        if (index !== tagLength - 1) {
          search = search + ' '
        }
      })
    }
    console.log('search', search)
    payload.search = search
  }
  props.fetchReviews(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  // eslint-disable-next-line
  props.setCurrentPage(page)

  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': page})
    if (found.length > 0) { return group }
  })
}

let handlePrevious = function (event) {
  event.preventDefault()
  if (currentPage === 1) {
    previousClass = styles.disabled
  } else {
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage - 1
    }
    let filterSettings = {...props.filterSettings}
    let statges = props.reviewProperties.stages
    let stageIndex = 0
    if (filterSettings.myTask) {
      payload.current_user = filterSettings.myTask
    }
    if (filterSettings.Draft) {
      let draftId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Draft'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = draftId
    }
    if (filterSettings.Approval) {
      let approvalId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Approval'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = approvalId
    }
    if (filterSettings.Acceptance) {
      let acceptanceId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Acceptance'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = acceptanceId
    }
    if (filterSettings.InProgress) {
      let inProgressId = _.result(_.find(statges, function (obj) {
        return obj.name === 'In Progress'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = inProgressId
    }
    if (filterSettings.Completed) {
      let completedId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Completed'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = completedId
    }
    if (filterSettings.Cancelled) {
      let cancelledId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Cancelled'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = cancelledId
    }
    if (filterSettings.selectedCategory) {
      payload['category_ids[0]'] = filterSettings.selectedCategory.id
    }
    if (filterSettings.selectedTags) {
      let search = ''
      let tagLength = filterSettings.selectedTags.length
      if (tagLength > 0) {
        filterSettings.selectedTags.forEach(function (data, index) {
          search = search + '#' + data.value
          if (index !== tagLength - 1) {
            search = search + ' '
          }
        })
      }
      console.log('search', search)
      payload.search = search
    }
    props.fetchReviews(payload)
  // eslint-disable-next-line
  mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
  // eslint-disable-next-line
  props.setCurrentPage(currentPage - 1)
  }
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage - 1})
    if (found.length > 0) { return group }
  })
}

let handleNext = function (event) {
  event.preventDefault()
  if (currentPage === totalNoPages) {
    nextClass = styles.disabled
  } else {
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': 10,
      'page': currentPage + 1
    }
    let filterSettings = {...props.filterSettings}
    let statges = props.reviewProperties.stages
    let stageIndex = 0
    if (filterSettings.myTask) {
      payload.current_user = filterSettings.myTask
    }
    if (filterSettings.Draft) {
      let draftId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Draft'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = draftId
    }
    if (filterSettings.Approval) {
      let approvalId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Approval'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = approvalId
    }
    if (filterSettings.Acceptance) {
      let acceptanceId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Acceptance'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = acceptanceId
    }
    if (filterSettings.InProgress) {
      let inProgressId = _.result(_.find(statges, function (obj) {
        return obj.name === 'In Progress'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = inProgressId
    }
    if (filterSettings.Completed) {
      let completedId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Completed'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = completedId
    }
    if (filterSettings.Cancelled) {
      let cancelledId = _.result(_.find(statges, function (obj) {
        return obj.name === 'Cancelled'
      }), 'id')
      payload['stage_ids[' + stageIndex++ + ']'] = cancelledId
    }
    if (filterSettings.selectedCategory) {
      payload['category_ids[0]'] = filterSettings.selectedCategory.id
    }
    if (filterSettings.selectedTags) {
      let search = ''
      let tagLength = filterSettings.selectedTags.length
      if (tagLength > 0) {
        filterSettings.selectedTags.forEach(function (data, index) {
          search = search + '#' + data.value
          if (index !== tagLength - 1) {
            search = search + ' '
          }
        })
      }
      console.log('search', search)
      payload.search = search
    }
    props.fetchReviews(payload)
   // eslint-disable-next-line
   mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
   // eslint-disable-next-line
    props.setCurrentPage(currentPage + 1)
  }
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage + 1})
    if (found.length > 0) { return group }
  })
}
if (props.reviewsSummary && props.reviewsSummary !== '') {
  if (props.reviewsSummary.resources.length > 0) {
    reviewsinDraft = props.reviewsSummary.resources[0].count_by_stage['Draft'] || 0
    reviewsinProgress = props.reviewsSummary.resources[0].count_by_stage['In Progress'] || 0
    reviewsCompleted = props.reviewsSummary.resources[0].count_by_stage['Completed'] || 0
    reviewsCancelled = props.reviewsSummary.resources[0].count_by_stage['Cancelled'] || 0
    reviewsApproved = props.reviewsSummary.resources[0].count_by_stage['Approval'] || 0
    reviewsAcceptance = props.reviewsSummary.resources[0].count_by_stage['Acceptance'] || 0
  }
}
console.log('******', reviewsinDraft)
let handleBlurdropdownChange = function (event) {
  console.log('handle Blur change', event.target.value)
}
let handledropdownChange = function (event) {
  console.log('handle change', event.target.value, typeof event.target.value)
  props.setPerPage(parseInt(event.target.value))
}
let handleCheckbox = function (event) {
  let isChecked = event.target.checked
  let filterSettings = {...props.filterSettings}
  filterSettings.myTask = isChecked
  filterSettings.callApi = true
  props.setFilterSettings(filterSettings)
}
let handleStageCheckbox = function (value, stage) {
  let filterSettings = {...props.filterSettings}
  if (stage === 'Draft') {
    filterSettings.Draft = value
  } else if (stage === 'Approval') {
    filterSettings.Approval = value
  } else if (stage === 'Acceptance') {
    filterSettings.Acceptance = value
  } else if (stage === 'In Progress') {
    filterSettings.InProgress = value
  } else if (stage === 'Completed') {
    filterSettings.Completed = value
  } else if (stage === 'Cancelled') {
    filterSettings.Cancelled = value
  }
  filterSettings.callApi = true
  props.setFilterSettings(filterSettings)
}
let handleCategorySelect = function (newValue: any, actionMeta: any) {
  let filterSettings = {...props.filterSettings}
  filterSettings.callApi = true
  if (actionMeta.action === 'select-option') {
    filterSettings.selectedCategory = newValue
    props.setFilterSettings(filterSettings)
  }
  if (actionMeta.action === 'clear') {
    filterSettings.selectedCategory = null
    props.setFilterSettings(filterSettings)
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
    <div className='row clearfix'>
      <div className='col-xs-4 col-sm-6 col-md-8'>
        <h2>Reviews</h2>
      </div>
      <div className='col-xs-8 col-sm-6 col-md-4'>
        <span className='pull-right' >
          {/* <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button>&nbsp;
          <button type='button' onClick={openAddReview} className='btn btn-outline-info btn-sm'>Add</button>&nbsp; */}
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Review' onClick={openAddReview} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-plus fa-2x' />
          </a>&nbsp;&nbsp;
          <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Initiate Discussion' onClick={openDiscussionModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
            <i className='fa flaticon-multimedia-3 fa-2x' />
          </a>
        </span>
      </div>
    </div>
    <div className='row' id='softwareSummary'>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsinDraft}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4>Reviews in Draft</h4>
                      <div style={{width: '50%'}}><input checked={props.filterSettings.Draft} onChange={(event) => { handleStageCheckbox(event.target.checked, 'Draft') }} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinDraft}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsAcceptance}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4>Reviews in Acceptance</h4>
                      <div style={{width: '50%'}}><input onChange={(event) => { handleStageCheckbox(event.target.checked, 'Acceptance') }} checked={props.filterSettings.Acceptance} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinDraft}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsinProgress}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4 style={{'marginRight': '10px'}}>Reviews in Progress</h4>
                      <div style={{width: '50%'}}><input onChange={(event) => { handleStageCheckbox(event.target.checked, 'In Progress') }} checked={props.filterSettings.InProgress} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinProgress}</h5> */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsApproved}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4>Reviews in Approval</h4>
                      <div style={{width: '50%'}}><input checked={props.filterSettings.Approval} onChange={(event) => { handleStageCheckbox(event.target.checked, 'Approval') }} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinDraft}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi  m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsCompleted}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4>Reviews Completed</h4>
                      <div style={{width: '50%'}}><input onChange={(event) => { handleStageCheckbox(event.target.checked, 'Completed') }} checked={props.filterSettings.Completed} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsCompleted}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-2'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                {/* <h3 className='m-portlet__head-text m--font-light'>
                 Activity
                </h3> */}
              </div>
            </div>
          </div>
          <div className='m-portlet__body' style={{'height': '150px', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
                <div className='m-widget17__chart'>
                  <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                    <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                  <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-notes m--font-brand' />
                      <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsCancelled}</h4>
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h4>Reviews Cancelled</h4>
                      <div style={{width: '50%'}}><input onChange={(event) => { handleStageCheckbox(event.target.checked, 'Cancelled') }} checked={props.filterSettings.Cancelled} type='checkbox' />&nbsp;Filter</div>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsCancelled}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{softwareCount}</h1>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className='row'>
      <span className='float-right'>
        <button type='button' className='m-btn btn btn-secondary pull-right'>Clear Field</button>
      </span>
    </div> */}
    <div id='softwareList'>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div >
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row clearfix' style={{'marginBottom': '20px'}}>
                        {/* <div className='col-md-12 row'>
                          <div className='col-md-6 row'>
                            <div className='col-md-3'>
                              <div className='dataTables_length' style={{'display': 'flex'}}>
                                <h5 style={{'margin': '8px'}}>Show</h5>
                                <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                                <h5 style={{'margin': '8px'}}>Entries</h5>
                              </div>
                            </div>
                            <div className='col-md-2'>
                              <div className='dataTables_length' style={{'display': 'flex', width: '100%'}}>
                                <h5 style={{'margin': '8px'}}><input checked={props.filterSettings.myTask} type='checkbox' onChange={handleCheckbox} />&nbsp;My Task</h5>
                              </div>
                            </div>
                            <div className='col-md-7'>
                              <div className='dataTables_length' style={{'display': 'flex'}}>
                                <h5 style={{'margin': '10px'}}>Tag</h5>
                                <div className='m-input-icon'>
                                  <CreatableSelect
                                    className='input-sm m-input'
                                    placeholder='Enter Tags'
                                    isClearable
                                    isMulti
                                    onChange={handleTag}
                                    value={props.filterSettings.selectedTags}
                                    options={tagOptions}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6 row'>
                            <div className='col-md-6'>
                              <div className='dataTables_length' style={{'display': 'flex'}}>
                                <div className='col-md-6'><h5 style={{'margin': '10px'}}>Review Category</h5></div>
                                <div className='col-md-6'>
                                  <div className='m-input-icon'>
                                    <Select
                                      className='input-sm m-input'
                                      placeholder='Select Category'
                                      isClearable
                                      defaultValue={props.filterSettings.selectedCategory}
                                      // value={props.filterSettings.selectedCategory}
                                      onChange={handleCategorySelect}
                                      isSearchable={false}
                                      name={'categorySelected'}
                                      options={categoryOptions}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-5'>
                              <div className='dataTables_length' style={{'display': 'flex'}}>
                                <div style={{'display': 'flex'}}>
                                  <h5 style={{'margin': '10px'}}>Search</h5>
                                  <div className='m-input-icon m-input-icon--left'>
                                    <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                                    <span className='m-input-icon__icon m-input-icon__icon--left'>
                                      <span>
                                        <i className='la la-search' />
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-1'>
                              <div className='dataTables_length ' style={{'display': 'flex'}}>
                                <button type='button' className='m-btn btn btn-secondary'>Clear text</button>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className='col-sm-6 col-md-2'>
                          <div className='dataTables_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                          </div>
                        </div>
                        <div className='col-sm-6 col-md-1'>
                          <div className='dataTables_length' style={{'display': 'flex', width: '100%'}}>
                            <h5 style={{'margin': '8px'}}><input checked={props.filterSettings.myTask} type='checkbox' onChange={handleCheckbox} />&nbsp;My Task</h5>
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-3'>
                          <div className='dataTables_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '10px'}}>Tag</h5>
                            <div className='m-input-icon'>
                              <CreatableSelect
                                className='input-sm m-input'
                                placeholder='Enter Tags'
                                isClearable
                                isMulti
                                onChange={handleTag}
                                value={props.filterSettings.selectedTags}
                                options={tagOptions}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-3'>
                          <div className='dataTables_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '10px'}}>Review Category</h5>
                            <div className='m-input-icon'>
                              <Select
                                className='input-sm m-input'
                                placeholder='Select Category'
                                isClearable
                                // defaultValue={props.filterSettings.selectedCategory}
                                value={props.filterSettings.selectedCategory}
                                onChange={handleCategorySelect}
                                isSearchable={false}
                                name={'categorySelected'}
                                options={categoryOptions}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-8 col-md-2'>
                          <div className='dataTables_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex'}}>
                              <h5 style={{'margin': '10px'}}>Search</h5>
                              <div className='m-input-icon m-input-icon--left'>
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                                <span className='m-input-icon__icon m-input-icon__icon--left'>
                                  <span>
                                    <i className='la la-search' />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-1 col-md-1'>
                          <div className='dataTables_length' style={{'display': 'flex'}}>
                            <button type='button' onClick={clearAllFilter} className='sm-btn btn btn-secondary'>Clear All</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            <th className=''>
                              <h5 style={{'position': 'relative'}}>Name
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'up' && props.filterSettings.columnSort.name === 'name') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('up', 'name') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-up' style={{'float': 'right'}} /></a>)}
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'down' && props.filterSettings.columnSort.name === 'name') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('down', 'name') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-down' style={{'position': 'absolute', 'right': '0', 'cursor': 'pointer'}} /></a>)}
                              </h5>
                            </th>
                            <th className=''>
                              <h5 style={{'position': 'relative'}} >Review Category
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'up' && props.filterSettings.columnSort.name === 'category') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('up', 'category') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-up' style={{'float': 'right', 'cursor': 'pointer'}} /></a>)}
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'down' && props.filterSettings.columnSort.name === 'category') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('down', 'category') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-down' style={{'position': 'absolute', 'right': '0', 'cursor': 'pointer'}} /></a>)}
                              </h5>
                            </th>
                            <th className=''>
                              <h5 style={{'position': 'relative'}}>Stage
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'up' && props.filterSettings.columnSort.name === 'stage') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('up', 'stage') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-up' style={{'float': 'right', 'cursor': 'pointer'}} /></a>)}
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'down' && props.filterSettings.columnSort.name === 'stage') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('down', 'stage') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-down' style={{'position': 'absolute', 'right': '0', 'cursor': 'pointer'}} /></a>)}
                              </h5>
                            </th>
                            <th className=''>
                              <h5 style={{'position': 'relative'}}>Reviewer
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'up' && props.filterSettings.columnSort.name === 'reviewer') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('up', 'reviewer') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-up' style={{'float': 'right', 'cursor': 'pointer'}} /></a>)}
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'down' && props.filterSettings.columnSort.name === 'reviewer') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('down', 'reviewer') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-down' style={{'position': 'absolute', 'right': '0', 'cursor': 'pointer'}} /></a>)}
                              </h5>
                            </th>
                            <th className=''>
                              <h5 style={{'position': 'relative'}}>Approver
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'up' && props.filterSettings.columnSort.name === 'approver') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('up', 'approver') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-up' style={{'float': 'right', 'cursor': 'pointer'}} /></a>)}
                                {props.filterSettings.columnSort && !(props.filterSettings.columnSort.order === 'down' && props.filterSettings.columnSort.name === 'approver') && (<a onClick={(event) => { event.preventDefault(); handleColumnSort('down', 'approver') }} href='javascript:void(0);' style={{color: 'gray'}} ><i className='fa fa-sort-down' style={{'position': 'absolute', 'right': '0', 'cursor': 'pointer'}} /></a>)}
                              </h5>
                            </th>
                          </tr>
                        </thead>
                        {/* <tbody> */}
                        {reviewList}
                        {/* </tbody> */}
                      </table>
                    </div>
                    <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                            <ul className='m-datatable__pager-nav'>
                              <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                              {listPage[0] && listPage[0].map(function (page, index) {
                                      if (page.number === currentPage) {
                                              page.class = 'm-datatable__pager-link--active'
                                            } else {
                                              page.class = ''
                                            }
                                            return (<li key={index} >
                                              <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                                            </li>)
                                          })}
                              <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                            </ul>
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
    </div>
    {/* The table structure ends */}
    <div>
      <ReactModal isOpen={props.addReviewSettings.isModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Add Review</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                <div className='col-md-12 m-form m-form--state m-form--fit'>
                  {/* {messageBlock} */}
                  <div className={props.addReviewSettings.nameValidationClass}>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Name<span style={{'fontSize': '20px'}} className='text-danger'>*</span></label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='text' placeholder='Enter Review Name' onBlur={handleReviewName} ref={input => (reviewName = input)} />
                      {props.addReviewSettings.showValidation && (<div style={props.addReviewSettings.color} className='form-control-feedback has-danger'>{props.addReviewSettings.message}</div>)}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      {/* <input lassName='form-control m-input' type='email' placeholder='Enter Email' value={''} id='example-email-input' /> */}
                      <textarea className='form-control m-input m-input--air' ref={input => (reviewDescription = input)} id='exampleTextarea' rows='3' style={{zIndex: 'auto', position: 'relative', lineHeight: '16.25px', fontSize: '13px', transition: 'none 0s ease 0s', background: 'transparent !important'}} />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Select Template</label>
                    <div className='col-8'>
                      <Select
                        // className='col-7 input-sm m-input'
                        placeholder='Select Templates'
                        isClearable
                        // defaultValue={dvalue}
                        // value={props.userActionSettings.selectedRole}
                        onChange={handleTemplateSelect}
                        isSearchable={false}
                        name={'templateSelected'}
                        options={templateOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={addReview} className='btn btn-outline-info btn-sm' >Add</button> */}
                <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                  <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                  <button type='button' onClick={addReview} className='m-btn btn btn-secondary'>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    <Discussion name={'Reviews'} TypeKey='Review' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Reviews'} type='ComponentType' {...props} />
  </div>
      )
    }
 Reviewslists.propTypes = {
  reviewsSummary: PropTypes.any,
  reviews: PropTypes.any,
  currentPage: PropTypes.any,
  addReviewSettings: PropTypes.any,
  componentTypeComponents: PropTypes.any,
  perPage: PropTypes.any,
  reviewProperties: PropTypes.any,
  filterSettings: PropTypes.any,
  tags: PropTypes.any,
  selectedTags: PropTypes.any
 }
