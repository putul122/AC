import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './templatesComponent.scss'
// import moment from 'moment'
import debounce from 'lodash/debounce'

export default function Templates (props) {
  let searchTextBox = ''
  let userName = ''
  let templateList = ''
  let noOfTemplates = ''
  let email = ''
  let totalNoPages
  let perPage = props.perPage
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let listPage = []
  let paginationLimit = 6
  let hidePagination = false
  console.log(searchTextBox, userName, email)
  if (props.templates && props.templates !== '') {
    if (!props.templates.error_code && props.templates.resources.length > 0) {
      let sortedArray = _.orderBy(props.templates.resources, ['name'], ['asc'])
      templateList = sortedArray.map(function (data, index) {
        let link = '/templates/' + data.id
        return (
          <tbody>
            <tr key={index}>
              <td><a href={link} >{data.name}</a></td>
              <td>{data.review_category}</td>
              <td>{data.check_items.length}</td>
            </tr>
          </tbody>
        )
      })
    } else {
      hidePagination = true
      templateList = []
      templateList.push((
        <tr key={0}>
          <td colSpan='3'>{'No data to display'}</td>
        </tr>
      ))
    }
    noOfTemplates = props.templates.total_count
    totalNoPages = Math.ceil(noOfTemplates / perPage)
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
    console.log(e, searchTextBox)
    if (searchTextBox) {
      let payload = {
        'search': searchTextBox.value || '',
        'page_size': props.perPage,
        'page': currentPage
      }
      props.fetchTemplates && props.fetchTemplates(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
  }, 500)
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': props.perPage,
        'page': currentPage - 1
      }
      props.fetchTemplates && props.fetchTemplates(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
        'page_size': props.perPage,
        'page': currentPage + 1
      }
      props.fetchTemplates && props.fetchTemplates(payload)
      // eslint-disable-next-line
      mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    let payload = {
      'search': searchTextBox.value ? searchTextBox.value : '',
      'page_size': props.perPage,
      'page': page
    }
    props.fetchTemplates && props.fetchTemplates(payload)
    // eslint-disable-next-line
    mApp && mApp.block('#agreementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-10'>
            <h3>Templates</h3>
          </div>
          <div className='col-md-2'>
            {/* <a href='/add_template' className='btn btn-outline-info btn-sm'>Add Template</a>&nbsp; */}
            <span className='pull-right'>
              <a href='/add_template' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add Template' className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
                <i className='fa flaticon-plus fa-2x' />
              </a>&nbsp;&nbsp;
            </span>
          </div>
        </div>
        <div className='row' id='agreementSummary'>
          <div className='col-xl-5'>
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
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Number of Templates</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{noOfTemplates}</h5>
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
        <div id='templateList'>
          {/* The table structure begins */}
          <div className='row' style={{'marginTop': '20px'}}>
            <div className='col-md-12'>
              <div className='m_datatable' id='scrolling_vertical'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                  <div className=''>
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
                        <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '80vh'}}>
                          <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                            <thead>
                              <tr role='row'>
                                <th className=''><h5>Name</h5></th>
                                <th className=''><h5>Review Category</h5></th>
                                <th className=''><h5># Check Items</h5></th>
                              </tr>
                            </thead>
                            {templateList}
                          </table>
                        </div>
                        {props.templates.error_code === null && !hidePagination && (<div className='row'>
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
                        </div>)}
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
    Templates.propTypes = {
    templates: PropTypes.any,
    currentPage: PropTypes.any,
    // currentPage: PropTypes.any,
    // addAgreementSettings: PropTypes.any,
    perPage: PropTypes.any
 }
