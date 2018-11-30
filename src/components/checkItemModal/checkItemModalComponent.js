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
    let checkItemName = ''
    let principleList = ''
    let standardList = ''
    let principleName = ''
    let principleStatement = ''
    let principleRationale = ''
    let principleImplication = ''
    let principleType = ''
    let standardName = ''
    let standardDescription = ''
    let standardReference = ''
    let openPrincipleModal = function (data) {
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': false, 'isPrincipleModalOpen': true, 'principleData': data}
        props.setModalSetting(modalSettings)
    }
    let openStandardModal = function (data) {
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': true, 'isPrincipleModalOpen': false, 'standardData': data}
        props.setModalSetting(modalSettings)
    }
    let closeModal = function (event) {
        event.preventDefault()
        let modalSettings = {...props.modalSettings, 'isViewCheckItemOpen': false, 'isStandardModalOpen': false, 'isPrincipleModalOpen': false, 'principleData': '', 'standardData': ''}
        props.setModalSetting(modalSettings)
    }
    if (props.checkItemData && props.checkItemData !== '') {
      checkItemName = props.checkItemData.name
      if (props.checkItemData.principles.length > 0) {
        principleList = props.checkItemData.principles.map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={''} onClick={(event) => { event.preventDefault(); openPrincipleModal(data) }}>{data.name}</a></td>
            </tr>
          )
        })
      } else {
        principleList = []
        principleList.push((
          <tr key={0}>
            <td>{'No data to display'}</td>
          </tr>
        ))
      }
      if (props.checkItemData.standards.length > 0) {
        standardList = props.checkItemData.standards.map(function (data, index) {
          return (
            <tr key={index}>
              <td><a href={''} onClick={(event) => { event.preventDefault(); openStandardModal(data) }}>{data.name}</a></td>
            </tr>
          )
        })
      } else {
        standardList = []
        standardList.push((
          <tr key={0}>
            <td>{'No data to display'}</td>
          </tr>
        ))
      }
   }
  if (props.modalSettings.principleData !== '') {
    principleName = props.modalSettings.principleData.name
    principleStatement = props.modalSettings.principleData.statement
    principleRationale = '' // props.modalSettings.principleData.rationale
    principleImplication = props.modalSettings.principleData.implication
    principleType = props.modalSettings.principleData.type
  }
  if (props.modalSettings.standardData !== '') {
    standardName = props.modalSettings.standardData.name
    standardDescription = props.modalSettings.standardData.description
    standardReference = props.modalSettings.standardData.reference
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
                <h6>{checkItemName}</h6>
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
                            <table>
                              <tbody>
                                {principleList}
                              </tbody>
                            </table>
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
                            <table>
                              <tbody>
                                {standardList}
                              </tbody>
                            </table>
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
                <h4 className='modal-title' id='exampleModalLabel'>View Principles: {principleName}</h4>
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
                            <span className='m-widget13__text'>{principleStatement}</span>
                          </div>
                          <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Rationale:
                                </span>
                            <span className='m-widget13__text'>{principleRationale}</span>
                          </div>
                          <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Implication:
                                </span>
                            <span className='m-widget13__text'>{principleImplication}</span>
                          </div>
                          <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Type:
                                </span>
                            <span className='m-widget13__text'>{principleType}</span>
                          </div>
                          {/* <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Strategic Theme:
                                </span>
                            <span className='m-widget13__text'>
                                Keenthemes
                                </span>
                          </div> */}
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
                            <span className='m-widget13__text'>{standardName}</span>
                          </div>
                          <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Description:
                                </span>
                            <span className='m-widget13__text'>{standardDescription}</span>
                          </div>
                          <div className='m-widget13__item'>
                            <span className='m-widget13__desc m-widget13__text m-widget13__number-bolder' style={{'width': '15%', 'color': '#000000'}}>
                                Reference:
                                </span>
                            <span className='m-widget13__text'>{standardReference}</span>
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
  checkItemData: PropTypes.any,
  modalSettings: PropTypes.any
  // setModalSetting: PropTypes.func
}
