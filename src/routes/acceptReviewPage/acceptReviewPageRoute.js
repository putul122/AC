import React from 'react'
import Header from '../../containers/header/headerContainer.js'
import LeftNavigation from '../../components/leftNavigation/leftNavigation.js'
import AcceptReview from '../../containers/acceptReview/acceptReviewContainer'
// import SmartDisplayStars from '../../containers/displayStars/displayStarsContainer'

class AcceptanceReviewPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <AcceptReview {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default AcceptanceReviewPageRoute
