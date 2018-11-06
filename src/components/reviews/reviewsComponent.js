import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './reviewsComponent.scss'
import debounce from 'lodash/debounce'
// import Softwares from '../../mockData/mockGetSoftwares'
const formatAmount = (x) => {
  let parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (typeof parts[1] !== 'undefined') {
    parts[1] = parts[1].substring(0, 2)
  }
  return parts.join('.')
}

export default function Reviewslists (props) {
console.log('JSON data for Reviews', props.reviewsSummary.count_by_status)
console.log('reviewlist', props.reviews)
// let softwareCount
let reviewsData
let reviewsinDraft
let reviewsinProgress
let reviewsCompleted
// let reviewsCancelled
let totalCost = ''
let searchTextBox
let reviewList = ''
let totalNoPages
let perPage = 10
let currentPage = props.currentPage
let nextClass = ''
let previousClass = ''
let pageArray = []
let listPage = []
let paginationLimit = 6
let totalReview
// let softwareagreementList
if (props.reviews && props.reviews !== '') {
  let sortedArray = _.orderBy(props.reviews.resources, ['name'], ['asc'])
  reviewList = sortedArray.map(function (data, index) {
    return (
      <tbody>
        <tr key={index}>
          <td><a href={'/viewreview/' + data.id} >{data.name}</a></td>
          <td>{''}</td>
          <td>{data.stage}</td>
          <td>{''}</td>
          <td>{''}</td>
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
  const value = searchTextBox.value
  reviewList = ''
  let payload = {
    'search': value || '',
    'page_size': 10,
    'page': currentPage
  }
  // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
    props.fetchReviews(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#softwareList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // eslint-disable-next-line
    // eslint-disable-next-line
    // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    // props.setComponentTypeLoading(true)
  // }
  listPage = _.filter(pageArray, function (group) {
    let found = _.filter(group, {'number': currentPage})
    if (found.length > 0) { return group }
  })
}, 500)
let handlePage = function (page) {
  if (page === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  } else if (page === totalNoPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  reviewList = ''
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
    reviewList = ''
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
  reviewsData = props.reviewsSummary.count_by_status
  reviewsinDraft = reviewsData[0].New
  reviewsinProgress = reviewsData[0].InReview
  reviewsCompleted = reviewsData[0].Reviewed
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
    <div className='row'>
      <div className='col-md-9'>
        <h2>Reviews</h2>
      </div>
      <div className='col-md-3'>
        <button type='button' className='btn btn-outline-info btn-sm'>Add Review</button>&nbsp;
      </div>
    </div>
    <div className='row' id='softwareSummary'>
      <div className='col-xl-3'>
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
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Reviews in Draft</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinDraft}</h5>
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
      <div className='col-xl-3'>
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
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Reviews in Progress</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsinProgress}</h5>
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
      <div className='col-xl-3'>
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
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Reviews Completed</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsCompleted}</h5>
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
      <div className='col-xl-3'>
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
                    </span>
                    <span className='m-widget17__subtitle'>
                      <h3>Reviews Cancelled</h3>
                      <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{'R' + formatAmount(totalCost)}</h5>
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
              <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
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
                    <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                      <thead>
                        <tr role='row'>
                          <th className='' style={{width: '61.25px'}}><h5>Name</h5></th>
                          <th className='' style={{width: '58.25px'}}><h5>Review Category</h5></th>
                          <th className='' style={{width: '108.25px'}}><h5>Stage</h5></th>
                          <th className='' style={{width: '137.25px'}}><h5>Reviewer</h5></th>
                          <th className='' style={{width: '171.25px'}}><h5>Approver</h5></th>
                        </tr>
                      </thead>
                      {/* <tbody> */}
                      {reviewList}
                      {/* </tbody> */}
                    </table>
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
  </div>
      )
    }
 Reviewslists.propTypes = {
  reviewsSummary: PropTypes.any,
  reviews: PropTypes.any,
  currentPage: PropTypes.any,
  perPage: PropTypes.any
 }
