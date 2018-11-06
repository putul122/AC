import React from 'react'
import PropTypes from 'prop-types'
import './viewReviewComponent.scss'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export default function ViewReview (props) {
  console.log('props', props.setModalOpenStatus)
  console.log('props', props.setStandardModalOpenStatus)
  console.log('props', props.setPrincipleModalOpenStatus)
  console.log('*****', props.reviewbyId)
  let reviewname
  let reviewdescription
  let reviewstage
  // console.log(props.agreementsSummary, props.agreements, props.currentPage)
  if (props.reviewbyId && props.reviewbyId !== '') {
    reviewname = props.reviewbyId.resources[0].name
    reviewdescription = props.reviewbyId.resources[0].description
    reviewstage = props.reviewbyId.resources[0].stage
  }
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
    console.log('props', props.setModalOpenStatus)
   }
   let openPrincipleModal = function (event) {
    event.preventDefault()
    props.setPrincipleModalOpenStatus(true)
    // props.setModalOpenStatus(false)
    console.log('props', props.setModalOpenStatus)
   }
   let openStandardModal = function (event) {
    event.preventDefault()
    props.setStandardModalOpenStatus(true)
    // props.setModalOpenStatus(false)
    console.log('props', props.setStandardModalOpenStatus)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let closePrincipleModal = function () {
    props.setPrincipleModalOpenStatus(false)
  }
  let closeStandardModal = function () {
    props.setStandardModalOpenStatus(false)
  }
    return (
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
                                  <span className='m-widget13__text'>
                                  Lorem Ipsum is simply dummy.
                                  </span>
                                </div>
                                <div className='m-widget13__item'>
                                  <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                  Reviewer:
                                  </span>
                                  <span className='m-widget13__text'>
                                  XYZABC
                                  </span>
                                </div>
                                <div className='m-widget13__item'>
                                  <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                  Approver:
                                  </span>
                                  <span className='m-widget13__text'>
                                  Keenthemes
                                  </span>
                                </div>
                                <div className='m-widget13__item'>
                                  <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                  Review Artefact
                                  </span>
                                  <span className='m-widget13__text m--font-brand'>
                                  C12345
                                  </span>
                                </div>
                                <div className='m-widget13__item'>
                                  <span className='m-widget13__desc m-widget13__text-bolder m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                    Review Stage
                                  </span>
                                  <span className='m-widget13__text  m--font-brand'>
                                    {reviewstage}
                                  </span>
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
                              <div className='m-widget13'>
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
          <ReactModal isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>View Check Item</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <h6>Has Cloud Solution been considered</h6>
                    <div className='row m--margin-top-20'>
                      <div className='col-xl-6'>
                        <div className='m-portlet m-portlet--full-height '>
                          <div className='m-portlet__head'>
                            <div className='m-portlet__head-caption'>
                              <div className='m-portlet__head-title'>
                                <h3 className='m-portlet__head-text'>
                                  Principles
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className='m-portlet__body'>
                            <div className='m-widget13'>
                              <div className='m-widget13__item'>
                                <a href='' onClick={openPrincipleModal}>Keep it simple</a><br />
                                <a href='' onClick={openPrincipleModal}>Cloud First</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6'>
                        <div className='m-portlet m-portlet--full-height '>
                          <div className='m-portlet__head'>
                            <div className='m-portlet__head-caption'>
                              <div className='m-portlet__head-title'>
                                <h3 className='m-portlet__head-text'>
                                  Standards
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className='m-portlet__body'>
                            <div className='m-widget13'>
                              <div className='m-widget13__item'>
                                <a href='' onClick={openStandardModal}>Technology Stack Standard</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeModal} className='btn btn-sm btn-info'>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.principlemodalIsOpen}
            onRequestClose={closePrincipleModal}
            style={customStyles}>
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>View Principles: Principle 03: Business</h4>
                    <button type='button' onClick={closePrincipleModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='row m--margin-top-20'>
                      <div className='col-xl-12'>
                        <div className=''>
                          <div className='m-portlet__body'>
                            <div className='m-widget13'>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc' style={{'width': '15%', 'color': '#000000'}}>
                                 Statement:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                 Rationale:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                  Implication:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Type:
                                </span>
                                <span className='m-widget13__text'>
                                XYZABC
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Strategic Theme:
                                </span>
                                <span className='m-widget13__text'>
                                Keenthemes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closePrincipleModal} className='btn btn-sm btn-info'>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.standardmodalIsOpen}
            onRequestClose={closeStandardModal}
            style={customStyles}>
            <div className={''}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>View Standard</h4>
                    <button type='button' onClick={closeStandardModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='row m--margin-top-20'>
                      <div className='col-xl-12'>
                        <div className=''>
                          <div className='m-portlet__body'>
                            <div className='m-widget13'>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc' style={{'width': '15%', 'color': '#000000'}}>
                                 Name:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                 Description:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                                </span>
                              </div>
                              <div className='m-widget13__item'>
                                <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                  Reference:
                                </span>
                                <span className='m-widget13__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeStandardModal} className='btn btn-sm btn-info'>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      )
    }
    ViewReview.propTypes = {
      modalIsOpen: PropTypes.any,
      reviewbyId: PropTypes.any,
      principlemodalIsOpen: PropTypes.any,
      standardmodalIsOpen: PropTypes.any,
      setModalOpenStatus: PropTypes.func,
      setPrincipleModalOpenStatus: PropTypes.func,
      setStandardModalOpenStatus: PropTypes.func
 }
