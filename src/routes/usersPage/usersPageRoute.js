import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation'
import Users from '../../containers/users/usersContainer'

class UsersPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation {...this.props} />
          <div className='m-content col-xl-12'>
            <Users {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default UsersPageRoute
