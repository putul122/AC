import React from 'react'
import Header from '../../containers/header/headerContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavigation'
import AddTemplate from '../../containers/addTemplate/addTemplateContainer'

class AddTemplatePageRoute extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <LeftNavigation />
          <div className='m-content col-xl-12'>
            <AddTemplate {...this.props} />
          </div>
        </div>
      </div>
    )
  }
  // props: {}
}
export default AddTemplatePageRoute
