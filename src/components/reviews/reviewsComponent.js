import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './reviewsComponent.scss'
import Select from 'react-select'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
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
let handleReviewName = function (event) {
  let value = event.target.value
  if (value.trim() !== '') {
    let addReviewSettings = {...props.addReviewSettings, 'reviewName': value, 'nameValidationClass': 'form-group m-form__group row'}
    props.setAddReviewSettings(addReviewSettings)
  } else {
    let addReviewSettings = {...props.addReviewSettings, 'reviewName': value}
    props.setAddReviewSettings(addReviewSettings)
  }
}
let addReview = function () {
  let reviewName = props.addReviewSettings.reviewName
  if (reviewName.trim() === '') {
    let addReviewSettings = {...props.addReviewSettings, 'nameValidationClass': 'form-group m-form__group row has-danger'}
    props.setAddReviewSettings(addReviewSettings)
  } else {
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
  }
}
let closeModal = function () {
  let addReviewSettings = {...props.addReviewSettings, 'isModalOpen': false, 'nameValidationClass': 'form-group m-form__group row', 'reviewName': ''}
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
  // let sortedArray = _.orderBy(props.reviews.resources, ['name'], ['asc'])
  reviewList = props.reviews.resources.map(function (data, index) {
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
    reviewsApproved = props.reviewsSummary.resources[0].count_by_stage['In Approval'] || 0
    reviewsAcceptance = props.reviewsSummary.resources[0].count_by_stage['In Acceptance'] || 0
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

return (
  <div>
    <div className='row clearfix'>
      <div className='col-xs-4 col-sm-6 col-md-8'>
        <h2>Reviews</h2>
      </div>
      <div className='col-xs-8 col-sm-6 col-md-4'>
        <span className='pull-right' >
          <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button>&nbsp;
          <button type='button' onClick={openAddReview} className='btn btn-outline-info btn-sm'>Add</button>&nbsp;
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3 style={{'marginRight': '40px'}}>Reviews in Draft</h3>
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3 style={{'marginRight': '40px'}}>Reviews in Approval</h3>
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3>Reviews in Progress</h3>
                      {/* <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinProgress}</h5> */}
                    </span>
                    {/* <span className='m-widget17__desc'>
                      <h1>{reviewsinProgress}</h1>
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3 style={{'marginRight': '40px'}}>Reviews in Acceptance</h3>
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3>Reviews Completed</h3>
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
          <div className='m-portlet__body' style={{'height': '150px'}}>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
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
                      <h3>Reviews Cancelled</h3>
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
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={props.perPage} onBlur={handleBlurdropdownChange} onChange={handledropdownChange} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                            {/* </label> */}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
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
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            <th className=''><h5>Name</h5></th>
                            <th className=''><h5>Review Category</h5></th>
                            <th className=''><h5>Stage</h5></th>
                            <th className=''><h5>Reviewer</h5></th>
                            <th className=''><h5>Approver</h5></th>
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
                    <label htmlFor='example-email-input' className='col-2 col-form-label'>Name *</label>
                    <div className='col-8'>
                      <input className='form-control m-input' type='email' placeholder='Enter Review Name' onChange={handleReviewName} value={props.addReviewSettings.reviewName} ref={input => (reviewName = input)} id='example-userName-input' />
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
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={addReview} className='btn btn-outline-info btn-sm' >Add</button>
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
  perPage: PropTypes.any
 }
