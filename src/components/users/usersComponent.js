import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './usersComponent.scss'
// import moment from 'moment'
import Select from 'react-select'
import ReactModal from 'react-modal'
import debounce from 'lodash/debounce'
ReactModal.setAppElement('#root')

export default function Users (props) {
  let searchTextBox = ''
  let userName = ''
  let email = ''
  let roleList = ''
  let listPage = []
  let currentPage = props.currentPage
  let totalUserPages = ''
  let perPage = props.perPage
  let paginationLimit = 6
  let nextClass = ''
  let previousClass = ''
  let pageArray = []
  let userOptions = ''
  let userList = ''
  let userCount = props.totalCount
  let roleOptions = []
  console.log('roles', searchTextBox, userName, email, props.updatePayload, props)
  if (props.roles && props.roles !== '') {
    roleOptions = props.roles.resources.map(function (data, index) {
      console.log(data)
      data.label = data.name
      return data
    })
  }
  let handleBlurdropdownChange = function (event) {
    console.log('handle Blur change', event.target.value)
  }
  let handledropdownChange = function (event) {
    console.log('handle change', event.target.value, typeof event.target.value)
    props.setPerPage(parseInt(event.target.value))
  }
  let editEmail = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    userActionSettings.updateUserData.email = event.target.value
    props.setUserActionSettings(userActionSettings)
  }
  let editUsername = function (event) {
    let userActionSettings = JSON.parse(JSON.stringify(props.userActionSettings))
    let fullName = event.target.value
    let names = fullName.toString().split(' ')
    userActionSettings.updateUserData.first_name = names[0] || ''
    userActionSettings.updateUserData.last_name = names[1] || ''
    props.setUserActionSettings(userActionSettings)
  }
  let openUpdateModal = function (data) {
    console.log('update modal', data)
    let userRoles = JSON.parse(JSON.stringify(data.roles))
    props.setRoleData(userRoles)
    let userActionSettings = {...props.userActionSettings, 'isUpdateModalOpen': true, 'updateUserData': data}
    props.setUserActionSettings(userActionSettings)
  }
  let closeUpdateModal = function () {
    props.setUpdatePayload([])
    let userActionSettings = {...props.userActionSettings, 'isUpdateModalOpen': false, 'updateUserData': ''}
    props.setUserActionSettings(userActionSettings)
  }
  let updateUser = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.data = []
    payload.userId = props.userActionSettings.updateUserData.id
    payload.data = props.updatePayload
    console.log('update payload', props.updatePayload)
    props.updateUser(payload)
  }
  let openDeleteModal = function (data) {
    let userActionSettings = {...props.userActionSettings, 'isDeleteModalOpen': true, 'deleteUserData': data}
    props.setUserActionSettings(userActionSettings)
  }
  let closeDeleteModal = function () {
    let userActionSettings = {...props.userActionSettings, 'isDeleteModalOpen': false, 'deleteUserData': ''}
    props.setUserActionSettings(userActionSettings)
  }
  let deleteUser = function () {
    let payload = {}
    payload.user_id = props.userActionSettings.deleteUserData.id
    console.log(payload)
    props.deleteUser(payload)
  }
  let openAddUserModal = function () {
    props.setRoleData([])
    let userActionSettings = {...props.userActionSettings, isAddModalOpen: true}
    props.setUserActionSettings(userActionSettings)
  }
  let closeModal = function () {
    let userActionSettings = {...props.userActionSettings, isAddModalOpen: false}
    props.setUserActionSettings(userActionSettings)
  }
  let handleUserSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      // email = newValue.email
      let userActionSettings = {...props.userActionSettings, 'selectedUser': newValue, 'selectedEmail': newValue.email}
      props.setUserActionSettings(userActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let userActionSettings = {...props.userActionSettings, 'selectedUser': null, 'selectedEmail': ''}
      props.setUserActionSettings(userActionSettings)
    }
  }
  let handleRoleSelect = function (newValue: any, actionMeta: any) {
    console.group('Value Changed first select')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    if (actionMeta.action === 'select-option') {
      // email = newValue.email
      let userActionSettings = {...props.userActionSettings, 'selectedRole': newValue}
      props.setUserActionSettings(userActionSettings)
    }
    if (actionMeta.action === 'clear') {
      let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
      props.setUserActionSettings(userActionSettings)
    }
  }
  let addUser = function () {
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let payload = {}
    payload.client_id = props.client_id
    payload.client_secret = props.client_secret
    let externalUser = props.userActionSettings.selectedUser
    delete externalUser.value
    delete externalUser.label
    payload.external_user = externalUser
    payload.roles = props.userRoles
    console.log('add payload', payload)
    props.addUser(payload)
  }

  let addRole = function () {
    let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
    props.setUserActionSettings(userActionSettings)
    let userRoles = props.userRoles
    console.log(props)
    if (props.userActionSettings.selectedRole !== null) {
      userRoles.push(props.userActionSettings.selectedRole.label)
      props.setRoleData(userRoles)
    }
    if (props.userActionSettings.isUpdateModalOpen) {
      let obj = {}
      obj.op = 'add'
      obj.path = '/roles/-'
      obj.value = props.userActionSettings.selectedRole.label
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
  }
  let removeRole = function (index) {
    if (props.userActionSettings.isUpdateModalOpen) {
      let obj = {}
      obj.op = 'remove'
      obj.path = '/roles/' + index
      let updatePayload = JSON.parse(JSON.stringify(props.updatePayload))
      updatePayload.push(obj)
      props.setUpdatePayload(updatePayload)
    }
    let userRoles = props.userRoles
    userRoles.splice(index, 1)
    props.setRoleData(userRoles)
    let userActionSettings = {...props.userActionSettings, 'selectedRole': null}
    props.setUserActionSettings(userActionSettings)
  }
  let listUsers = function () {
    if (props.users !== '') {
      if (props.users.length > 0) {
        userList = props.users.slice(perPage * (currentPage - 1), ((currentPage - 1) + 1) * perPage).map(function (data, index) {
          return (
            <tr key={index}>
              <td>{data.first_name + ' ' + data.last_name}</td>
              <td>{data.email}</td>
              <td>{data.roles.toString()}</td>
              <td>{data.is_active ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={(event) => { event.preventDefault(); openUpdateModal(data) }} className='btn btn-outline-info btn-sm'>Edit</button>&nbsp;
                <button onClick={(event) => { event.preventDefault(); openDeleteModal(data) }} className='btn btn-outline-danger btn-sm'>Delete</button>
              </td>
            </tr>
          )
        })
      } else {
        userList = []
        userList.push((
          <tr key={0}>
            <td colSpan='4'>{'No data to display'}</td>
          </tr>
        ))
      }
    }
  }
  if (props.users && props.users !== '') {
    totalUserPages = Math.ceil(props.users.length / perPage)
    // userCount = props.users.total_count
    console.log('totalUserPages', totalUserPages)
    let i = 1
    while (i <= totalUserPages) {
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
    // List initial data for supplier Applications
    listUsers()
  }
  if (currentPage === 1) {
    previousClass = 'm-datatable__pager-link--disabled'
  }
  if (currentPage === totalUserPages) {
    nextClass = 'm-datatable__pager-link--disabled'
  }
  let handleListAndPagination = function (page) {
    listUsers()
    props.setCurrentPage(page)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }

  if (props.userRoles.length > 0) {
    roleList = props.userRoles.map(function (data, index) {
      return (<span className='m-list-search__result-item'>
        <span className='m-list-search__result-item-text'>{data}</span>
        <button type='button' onClick={() => { removeRole(index) }} className='btn btn-outline-danger btn-sm pull-right'>Remove</button>
      </span>)
    })
    console.log('role', roleList)
  } else {
    roleList = ''
    console.log('else role', roleList)
  }
  if (props.externalUsers && props.externalUsers !== '') {
    if (props.externalUsers.error_code === null) {
      userOptions = props.externalUsers.resources.filter(function (user) {
        if (user.email !== null && user.given_name !== null) {
        return user
        }
      }).map(function (user, index) {
        if (user.email !== null && user.given_name !== null) {
          user.value = user.email
          user.label = user.given_name + ' ' + user.last_name
          return user
        } else {
          return false
        }
      })
    } else {}
  }

  let handleInputChange = debounce((e) => {
    console.log(e)
    // eslint-disable-next-line
    mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    let searchText = searchTextBox ? searchTextBox.value : ''
    let originalData = props.copyUsers
    if (searchText.trim() !== '') {
      if (originalData !== '') {
        let list = _.filter(originalData, function (data, index) {
          if ((data.first_name && (data.first_name.toLowerCase()).match(searchText.toLowerCase())) || (data.last_name && (data.last_name.toLowerCase()).match(searchText.toLowerCase()))) {
            return data
          }
        })
        let payload = {}
        payload.users = list
        payload.copyUsers = props.copyUsers
        payload.totalCount = props.totalCount
        props.setUsersData(payload)
      }
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    } else {
      let payload = {}
      payload.users = props.copyUsers
      payload.copyUsers = props.copyUsers
      payload.totalCount = props.totalCount
      props.setUsersData(payload)
      // eslint-disable-next-line
      mApp && mApp.unblockPage()
    }
    props.setCurrentPage(1)
  }, 500)

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage - 1)
      handleListAndPagination(currentPage - 1)
    }
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalUserPages) {
      nextClass = styles.disabled
    } else {
      props.setCurrentPage(currentPage + 1)
      handleListAndPagination(currentPage + 1)
    }
  }
  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalUserPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    handleListAndPagination(page)
  }
    return (
      <div>
        <div className='row'>
          <div className='col-md-10'>
            <h3>Users</h3>
          </div>
          <div className='col-md-2'>
            {/* <button onClick={openAddUserModal} className='btn btn-outline-info btn-sm'>Add User</button>&nbsp; */}
            <span className='pull-right'>
              <a href='javascript:void(0);' data-skin='light' data-toggle='m-tooltip' data-placement='top' data-original-title='Add User' onClick={openAddUserModal} className='btn btn-info m-btn m-btn--icon btn-sm m-btn--icon-only  m-btn--pill m-btn--air'>
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
                        </span>
                        <span className='m-widget17__subtitle'>
                          <h3>Number of Users</h3>
                          <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{userCount}</h5>
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
        <div id='userList'>
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
                                <th className=''><h5>Email</h5></th>
                                <th className=''><h5>Role(s)</h5></th>
                                <th className=''><h5>Active</h5></th>
                                <th className=''><h5>Action</h5></th>
                              </tr>
                            </thead>
                            <tbody>
                              {userList}
                            </tbody>
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
        <div>
          <ReactModal isOpen={props.userActionSettings.isAddModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>New User</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                    <div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Full Name</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Enter User Name'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedUser}
                            onChange={handleUserSelect}
                            isSearchable
                            name={'userName'}
                            options={userOptions}
                          />
                          {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Email</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' placeholder='Enter Email' value={props.userActionSettings.selectedEmail} id='example-email-input' />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Select Role</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Roles'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedRole}
                            onChange={handleRoleSelect}
                            isSearchable={false}
                            name={'roleSelected'}
                            options={roleOptions}
                          />
                        </div>
                        <div className='col-2'>
                          <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm'>Add</button>
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label' />
                        <div className='col-10'>
                          <div className='m-section m-section--last'>
                            <div className='m-section__content'>
                              <div className='m-demo'>
                                <div className='m-demo__preview'>
                                  <div className='m-list-search'>
                                    <div className='m-list-search__results'>
                                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                  Roles Selected
                                              </span>
                                      {roleList}
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
                  <div className='modal-footer'>
                    {/* <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={addUser} className='btn btn-outline-info btn-sm' >Add User</button> */}
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={addUser} className='m-btn btn btn-secondary'>Add User</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.userActionSettings.isUpdateModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog modal-lg'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Edit User</h4>
                    <button type='button' onClick={closeUpdateModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                    <div className='col-md-12'>
                      {/* {messageBlock} */}
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Full Name</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' disabled placeholder='Enter User Name' value={props.userActionSettings.updateUserData.first_name + ' ' + props.userActionSettings.updateUserData.last_name} onChange={editUsername} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Email</label>
                        <div className='col-8'>
                          <input className='form-control m-input' type='email' disabled placeholder='Enter Email' value={props.userActionSettings.updateUserData.email} onChange={editEmail} />
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label'>Select Role</label>
                        <div className='col-8'>
                          <Select
                            // className='col-7 input-sm m-input'
                            placeholder='Select Roles'
                            isClearable
                            // defaultValue={dvalue}
                            value={props.userActionSettings.selectedRole}
                            onChange={handleRoleSelect}
                            isSearchable={false}
                            name={'roleSelected'}
                            options={roleOptions}
                          />
                        </div>
                        <div className='col-2'>
                          <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm'>Add</button>
                        </div>
                      </div>
                      <div className='form-group m-form__group row'>
                        <label htmlFor='example-email-input' className='col-2 col-form-label' />
                        <div className='col-10'>
                          <div className='m-section m-section--last'>
                            <div className='m-section__content'>
                              <div className='m-demo'>
                                <div className='m-demo__preview'>
                                  <div className='m-list-search'>
                                    <div className='m-list-search__results'>
                                      <span className='m-list-search__result-category m-list-search__result-category--first'>
                                                  Roles Selected
                                              </span>
                                      {roleList}
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
                  <div className='modal-footer'>
                    {/* <button type='button' onClick={closeUpdateModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={updateUser} className='btn btn-outline-info btn-sm' >Update User</button> */}
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeUpdateModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={updateUser} className='m-btn btn btn-secondary'>Update User</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.userActionSettings.isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h6 className='modal-title' id='exampleModalLabel'>Delete User</h6>
                    <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <h3>{props.userActionSettings.deleteUserData.first_name} {props.userActionSettings.deleteUserData.last_name}</h3><br />
                    <p>Are you sure?</p>
                  </div>
                  <div className='modal-footer'>
                    {/* <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                    <button type='button' className={'btn btn-sm btn-outline-info'} onClick={deleteUser}>Delete</button> */}
                    <div className='btn-group m-btn-group m-btn-group--pill ' role='group' aria-label='...'>
                      <button type='button' onClick={closeDeleteModal} className='m-btn btn btn-secondary'>Cancel</button>
                      <button type='button' onClick={deleteUser} className='m-btn btn btn-secondary'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    Users.propTypes = {
    userActionSettings: PropTypes.any,
    updatePayload: PropTypes.any,
    externalUsers: PropTypes.any,
    roles: PropTypes.any,
    userRoles: PropTypes.any,
    currentPage: PropTypes.any,
    users: PropTypes.any,
    // eslint-disable-next-line
    copyUsers: PropTypes.any,
    perPage: PropTypes.any,
    totalCount: PropTypes.any
 }
