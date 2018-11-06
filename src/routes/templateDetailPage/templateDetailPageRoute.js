import React from 'react'
import Header from '../../components/headerComponent/headerComponent'
import LeftNavigation from '../../components/leftNavigation/leftNavigation'
import TemplateDetail from '../../containers/templateDetail/templateDetailContainer'

class TemplateDetailPageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header {...this.props} />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation {...this.props} />
          <div className='m-content col-xl-12'>
            <TemplateDetail {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default TemplateDetailPageRoute
