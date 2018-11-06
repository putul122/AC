import React from 'react'
// import _ from 'lodash'
// import PropTypes from 'prop-types'
// import styles from './acceptReviewComponent.scss'
// import debounce from 'lodash/debounce'
// const formatAmount = (x) => {
//   let parts = x.toString().split('.')
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//   if (typeof parts[1] !== 'undefined') {
//     parts[1] = parts[1].substring(0, 2)
//   }
//   return parts.join('.')
// }
export default function ReviewAcceptance (props) {
return (
  <div>
    <div className='row'>
      <div className='col-xl-12'>
        <div className='m-portlet'>
          <div className='m-portlet__body'>
            <div className='m-widget13'>
              <div className='m-widget13__item'>
                <span className='m-widget13__desc' style={{'width': '2%', 'color': '#000000'}}>
                  Name:
                </span>
                <span className='m-widget13__text'>
                Stuad Deportive
                </span>
              </div>
              <div className='m-widget13__item'>
                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '5%', 'color': '#000000'}}>
                  Description:
                </span>
                <span className='m-widget13__text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                </span>
                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '8%', 'color': '#000000'}}>
                  Review Artefact:
                </span>
                <span className='m-widget13__text'>
                  #C12345
                </span>
              </div>
            </div>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  <h3 className='m-portlet__head-text'>
                    Check Items
                  </h3>
                </div>
              </div>
            </div>
            <div className='m-portlet__body' style={{'height': '250px'}}>
              <div className='m-widget13'>
                <div className='m-widget13__item row'>
                  <div className='col-sm-12 m-radio-inline'>
                    <label htmlFor='example-text-input'>
                      <a href='' style={{'margin': '20px'}}>Has Cloud Solution been considered</a>
                    </label>
                    <label htmlFor='example-text-input' className='m-radio'>
                      <input type='radio' name='example_3' value='1' />Yes
                      <span />
                    </label>
                    <label htmlFor='example-text-input' className='m-radio'>
                      <input type='radio' name='example_3' value='2' />No
                      <span />
                    </label>
                    <label htmlFor='example-text-input'>
                      <span style={{'margin': '20px'}}>No affordable options available </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-widget13'>
              <div className='m-widget13__item row'>
                <div className='col-sm-12 m-radio-inline'>
                  <label htmlFor='example-text-input'>
                    <a href='' style={{'margin': '20px'}}>Has Cloud Solution been considered</a>
                  </label>
                  <label htmlFor='example-text-input' className='m-radio'>
                    <input type='radio' name='example_3' value='1' />Yes
                    <span />
                  </label>
                  <label htmlFor='example-text-input' className='m-radio'>
                    <input type='radio' name='example_3' value='2' />No
                    <span />
                  </label>
                  <label htmlFor='example-text-input'>
                    <span style={{'margin': '20px'}}>No affordable options available </span>
                  </label>
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
 ReviewAcceptance.propTypes = {
  // applicationSummary: PropTypes.any,
  // application: PropTypes.any,
  // currentPage: PropTypes.any,
  // applicationSoftwares: PropTypes.any,
  // expandSettings: PropTypes.any,
  // businessUnits: PropTypes.any,
  // perPage: PropTypes.any
 }
