import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation'
import ReviewApproval from '../../containers/reviewApproval/reviewApprovalContainer'

class ReviewApprovalPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation {...this.props} />
          <div className='m-content col-xl-12'>
            <ReviewApproval {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default ReviewApprovalPageRoute
