import React from 'react'
import PropTypes from 'prop-types'
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

export default function CheckItemModal (props) {
    console.log('check Modal component props', props)
    let openPrincipleModal = function (event) {
        event.preventDefault()
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': false, 'isPrincipleModalOpen': true}
        props.setModalSetting(modalSettings)
    }
    let openStandardModal = function (event) {
        event.preventDefault()
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': true, 'isPrincipleModalOpen': false}
        props.setModalSetting(modalSettings)
    }
    let closeModal = function (event) {
        event.preventDefault()
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': false, 'isPrincipleModalOpen': false}
        props.setModalSetting(modalSettings)
    }
    // let closePrincipleModal = function () {
    //     event.preventDefault()
    //     let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': false, 'isPrincipleModalOpen': false}
    //     props.setModalSetting(modalSettings)
    // }
    // let closeStandardModal = function () {
    //     event.preventDefault()
    //     let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': true, 'isStandardModalOpen': false, 'isPrincipleModalOpen': false}
    //     props.setModalSetting(modalSettings)
    // }
  return (
    <div>
      <ReactModal isOpen={props.modalSettings.isViewCheckItemOpen}
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
      <ReactModal isOpen={props.modalSettings.isPrincipleModalOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <div className={''}>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>View Principles: Principle 03: Business</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
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
                <button type='button' onClick={closeModal} className='btn btn-sm btn-info'>Close</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.modalSettings.isStandardModalOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <div className={''}>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>View Standard</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
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
                <button type='button' onClick={closeModal} className='btn btn-sm btn-info'>Close</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>)
}
CheckItemModal.propTypes = {
  // checkItemData: PropTypes.any,
  modalSettings: PropTypes.any,
  setModalSetting: PropTypes.func
}
