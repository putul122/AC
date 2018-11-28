import React from 'react'
import PropTypes from 'prop-types'
import './viewReviewComponent.scss'
import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
import Discussion from '../../containers/discussion/discussionContainer'
import CheckItemModal from '../../containers/checkItemModal/checkItemModalContainer'

export default function ViewReview (props) {
  console.log('*****', props.reviewbyId)
  let reviewname
  let reviewdescription
  let reviewstage
  let Reviewer = ''
  let Approver = ''
  let ReviewCategory = ''
  let ReviewArtefact = ''
  let contextId = props.match.params.id
  let checkItemList = ''
  let openDiscussionModal = function (event) {
    event.preventDefault()
    props.setDiscussionModalOpenStatus(true)
  }
  let openModal = function (event) {
    console.log('run me')
    event.preventDefault()
    let modalSettings = {
      'isViewCheckItemOpen': true,
      'isStandardModalOpen': false,
      'isPrincipleModalOpen': false
    }
    props.setModalSetting(modalSettings)
  }
  // console.log(props.agreementsSummary, props.agreements, props.currentPage)
  if (props.reviewbyId && props.reviewbyId !== '') {
    reviewname = props.reviewbyId.resources[0].name
    reviewdescription = props.reviewbyId.resources[0].description
    reviewstage = props.reviewbyId.resources[0].stage
    Approver = props.reviewbyId.resources[0].approver
    Reviewer = props.reviewbyId.resources[0].reviewer
    ReviewCategory = props.reviewbyId.resources[0].review_category
    ReviewArtefact = props.reviewbyId.resources[0].review_artefact_name
    if (props.reviewbyId.resources[0].check_items.length > 0) {
      checkItemList = props.reviewbyId.resources[0].check_items.map(function (data, index) {
        if (data.type === null || data.type === 'Radio') {
          let valueList = ''
          if (data.values.length > 0) {
            valueList = data.values.map(function (valueData, valueIndex) {
              return (<span><label htmlFor='example-email-input' className='m-radio'>
                <input type='radio' name={'checkitems_' + index + '_' + valueIndex} value={valueData.name} checked={data.compliance === valueData.name} /> {valueData.name}
                <span />
              </label>&nbsp;&nbsp;&nbsp;</span>)
            })
          }
          console.log('valueList', valueList, typeof valueList)
          return (<span className='m-list-search__result-item' key={index}>
            <div className='form-group m-form__group row'>
              <label htmlFor='example-email-input' className='col-5 col-form-label'><a href='' onClick={openModal} >{data.name}</a></label>
              <div className='col-6 float-left' >
                <div className='m-radio-inline pull-left' style={{width: '100%'}}>
                  {valueList}
                  <label htmlFor='example-email-input' className='col-6'>
                    <span className=''>{data.compliance_comment || ''}</span>
                    <span />
                  </label>
                </div>
              </div>
            </div>
          </span>)
        }
      })
    } else {
      checkItemList = ''
    }
  }
  //  let openPrincipleModal = function (event) {
  //   event.preventDefault()
  //   props.setPrincipleModalOpenStatus(true)
  //   // props.setModalOpenStatus(false)
  //   console.log('props', props.setModalOpenStatus)
  //  }
  //  let openStandardModal = function (event) {
  //   event.preventDefault()
  //   props.setStandardModalOpenStatus(true)
  //   // props.setModalOpenStatus(false)
  //   console.log('props', props.setStandardModalOpenStatus)
  //  }
  // let closeModal = function () {
  //   props.setModalOpenStatus(false)
  // }
  // let closePrincipleModal = function () {
  //   props.setPrincipleModalOpenStatus(false)
  // }
  // let closeStandardModal = function () {
  //   props.setStandardModalOpenStatus(false)
  // }
    return (
      <div>
        <div className='row clearfix'>
          <div className='col-xs-4 col-sm-6 col-md-8' />
          <div className='col-xs-8 col-sm-6 col-md-4'>
            <span className='pull-right' >
              <button type='button' onClick={openDiscussionModal} className='btn btn-outline-info btn-sm'>Initiate Discussion</button>
            </span>
          </div>
        </div>
        <br />
        <div className='m-portlet m-portlet--mobile m-portlet--body-progress-'>
          <div className=''>
            <div className=''>
              <div className='m-portlet__body'>
                <div className='row'>
                  <div className='col-xl-6'>
                    <div className='m-section m-section--last'>
                      <div className='m-section__content'>
                        <div className='m-demo'>
                          <div className='m-demo__preview'>
                            <div className='m-list-search'>
                              <div className='m-list-search__results'>
                                <span className='m-list-search__result-category m-list-search__result-category--first'>Review Details</span>
                                <div className='m-widget13'>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text' style={{'width': '15%', 'color': '#000000'}}>
                                      Name:
                                    </span>
                                    <span className='m-widget13__text'>
                                      {reviewname}
                                    </span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text' style={{'width': '15%', 'color': '#000000'}}>
                                      Description:
                                    </span>
                                    <span className='m-widget13__text'>
                                      {reviewdescription}
                                    </span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                      Review Category:
                                    </span>
                                    <span className='m-widget13__text'>{ReviewCategory}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                    Reviewer:
                                    </span>
                                    <span className='m-widget13__text'>{Reviewer}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                    Approver:
                                    </span>
                                    <span className='m-widget13__text'>{Approver}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                    Review Artefact
                                    </span>
                                    <span className='m-widget13__text m--font-brand'>{ReviewArtefact}</span>
                                  </div>
                                  <div className='m-widget13__item'>
                                    <span className='m-widget13__desc m-widget13__text-bolder m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                      Review Stage
                                    </span>
                                    <span className='m-widget13__text  m--font-brand'>{reviewstage}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6'>
                    <div className='m-section m-section--last'>
                      <div className='m-section__content'>
                        <div className='m-demo'>
                          <div className='m-demo__preview'>
                            <div className='m-list-search'>
                              <div className='m-list-search__results'>
                                <span className='m-list-search__result-category m-list-search__result-category--first'>Selected Check Items</span>
                                {checkItemList}
                                {/* <div className='m-widget13'>
                                  <div className='m-widget13__item row'>
                                    <div className='col-sm-12 m-radio-inline'>
                                      <label htmlFor='example-text-input'>
                                        <a href='' style={{'margin': '20px'}} onClick={openModal}>Has Cloud Solution been considered</a>
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
                                </div> */}
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
        <Discussion name={reviewname} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={reviewname} type='Component' {...props} />
        <CheckItemModal checkItemData={props.clickCheckItemData} />
      </div>
      )
    }
    ViewReview.propTypes = {
      match: PropTypes.any,
      // setModalSetting: PropTypes.func,
      reviewbyId: PropTypes.any,
      clickCheckItemData: PropTypes.any
 }
