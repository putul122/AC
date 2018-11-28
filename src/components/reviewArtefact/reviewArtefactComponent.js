import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styles from './reviewArtefactComponent.scss'
import DataModelComponent from '../dataModel/dataModelComponent'
import _ from 'lodash'
// import ReactModal from 'react-modal'
// import Select from 'react-select'
// import CreatableSelect from 'react-select/lib/Creatable'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import Discussion from '../../containers/discussion/discussionContainer'
// import NewDiscussion from '../../containers/newDiscussion/newDiscussionContainer'
var divStyle = {
    width: '900px',
    height: '600px',
    // 'overflowY': 'scroll',
    // 'overflowX': 'scroll',
    'border': '1px solid #000000',
    'background-color': '#FFFFFF'
  }
export default function ReviewArtefact (props) {
  console.log('EDCProperties---', props)
  let reviewName = ''
  let reviewDescription = ''
  let reviewArtefactPropertiesList = ''
  let startNode = {}
  let parentReviewArtefactRelationshipList = ''
  let outgoingReviewArtefactRelationshipList = ''
  let incomingReviewArtefactRelationshipList = ''
  let childReviewArtefactRelationshipList = ''
  let modelRelationshipData = ''
//   let contextId = props.match.params.id
  let showProperties = props.showTabs.showProperty
  let showRelationships = props.showTabs.showRelationship

  let toggleExpandIcon = function (index) {
    // eslint-disable-next-line
    let iconClass = $('#expandIcon' + index).attr('class')
    if (iconClass === 'fa fa-plus') {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-plus').addClass('fa-minus')
    } else {
      // eslint-disable-next-line
      $('#expandIcon' + index).removeClass('fa-minus').addClass('fa-plus')
    }
  }
  let showProperty = function (event) {
    let payload = {'showProperty': ' active show', 'showRelationship': ''}
    props.setCurrentTab(payload)
  }
  let showRelationship = function (event) {
    let payload = {'showProperty': '', 'showRelationship': ' active show'}
    props.setCurrentTab(payload)
  }

  if (props.reviewData && props.reviewData !== '') {
    reviewName = props.reviewData.resources[0].name
    reviewDescription = props.reviewData.resources[0].description
    startNode.name = props.reviewData.resources[0].name
    startNode.title = props.reviewData.resources[0].title
  }
if (props.reviewArtefactPropertiesdata && props.reviewArtefactPropertiesdata !== '') {
    reviewArtefactPropertiesList = props.reviewArtefactPropertiesdata.resources.map(function (property, index) {
      let propertyProperties = property.properties
      let childProperties = propertyProperties.map(function (childProperty, childIndex) {
        let value
        // console.log('childProperty', childProperty)
        if (childProperty.property_type.key === 'Integer') {
          value = childProperty.int_value
        } else if (childProperty.property_type.key === 'Decimal') {
          value = childProperty.float_value
        } else if (childProperty.property_type.key === 'DateTime') {
          value = childProperty.date_time_value ? moment(childProperty.date_time_value).format('DD MMM YYYY') : ''
        } else if (childProperty.property_type.key === 'Text') {
          value = childProperty.text_value
        } else if (childProperty.property_type.key === 'List') {
          // let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
          //   option.label = option.name
          //   option.value = option.id
          //   return option
          // })
          let dvalue = childProperty.value_set_value
          if (childProperty.value_set_value !== null) {
            dvalue.label = childProperty.value_set_value.name
            dvalue.value = childProperty.value_set_value.id
          }
          value = childProperty.value_set_value ? childProperty.value_set_value.name : null
        } else {
          value = childProperty.other_value
        }
        return (
          <tr key={'child' + childIndex}>
            <td><span className={styles.labelbold}>{childProperty.name}</span></td>
            <td><span>{value}</span></td>
          </tr>
        )
      })
      return (
        // <tbody key={index} className={'col-6'}>
        //   <tr>
        //     <td><span className={styles.title}>Type</span></td>
        //     <td><span className={styles.labelbold}>{property.name}</span></td>
        //   </tr>
        //   {childProperties}
        // </tbody>
        <tbody key={index} className={'col-6'}>
          <tr id={'property' + index} onClick={(event) => { event.preventDefault(); toggleExpandIcon(index) }} data-toggle='collapse' data-target={'#expand' + index} style={{cursor: 'pointer'}}>
            <td><icon id={'expandIcon' + index} className={'fa fa-plus'} aria-hidden='true' />&nbsp;</td>
            <td><span className={styles.labelbold}>{property.name}</span></td>
          </tr>
          <tr className='collapse' id={'expand' + index}>
            <td colSpan='2'>
              <table>
                {childProperties}
              </table>
            </td>
          </tr>
        </tbody>
      )
    })
    console.log('-------------', reviewArtefactPropertiesList)
  }
  if (props.reviewArtefactRelationshipsdata && props.reviewArtefactRelationshipsdata !== '') {
    modelRelationshipData = props.reviewArtefactRelationshipsdata.resources
    let parent = _.filter(props.reviewArtefactRelationshipsdata.resources, {'relationship_type': 'Parent'})
    let outgoing = _.filter(props.reviewArtefactRelationshipsdata.resources, {'relationship_type': 'ConnectFrom'})
    outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let incoming = _.filter(props.reviewArtefactRelationshipsdata.resources, {'relationship_type': 'ConnectTo'})
    incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
    let child = _.filter(props.reviewArtefactRelationshipsdata.resources, {'relationship_type': 'Child'})
    let parentSoftwareRelationshipListFn = function () {
      if (parent.length > 0) {
        let childElementList = parent.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
            <span className='m-accordion__item-title'>{parent[0].component.name} {parent[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('parent else')
        return false
      }
    }
    let childSoftwareRelationshipListFn = function () {
      if (child.length > 0) {
        let childElementList = child.map(function (element, i) {
        return (<span className='row' style={{'padding': '5px'}}>
          <div className='col-md-10'><span>{element.target_component.name}</span></div>
        </span>)
      })
      return (
        <div className='m-accordion__item' style={{'overflow': 'visible'}}>
          <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
            <span className='m-accordion__item-title'>{child[0].component.name} {child[0].relationship_type} {'Components'}</span>
            <span className='m-accordion__item-mode' />
          </div>
          <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
            <div className='m-accordion__item-content'>
              {childElementList}
            </div>
          </div>
        </div>
        )
      } else {
        console.log('child else')
        return false
      }
    }
    let outgoingSoftwareRelationshipListFn = function () {
      if (outgoing.length > 0) {
        let outgoingElements = []
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let outerKey = 0
        for (let connectionKey in outgoingGroup) {
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                outgoingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#outgoing_accordion_body' + outerKey + '-' + innerKey} aria-expanded='false'>
                      <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'outgoing_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return outgoingElements
      } else {
        console.log('outgoing else')
        return false
      }
    }
    let incomingSoftwareRelationshipListFn = function () {
      if (incoming.length > 0) {
        var incomingGroup = _.chain(incoming)
        .groupBy('connection.name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
        .value()
        let incomingElements = []
        let outerKey = 0
        for (let connectionKey in incomingGroup) {
          if (incomingGroup.hasOwnProperty(connectionKey)) {
            outerKey++
            let innerKey = 0
            for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
              if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                innerKey++
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span className='row' style={{'padding': '5px'}}>
                    <div className='col-md-10'><span>{element.target_component.name}</span></div>
                  </span>)
                })
                // let cleanKey = targetComponentTypeKey.replace(/ /g, '')
                incomingElements.push(
                  <div className='m-accordion__item' style={{'overflow': 'visible'}}>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#incoming_accordion_body' + outerKey + '-' + innerKey} aria-expanded='true'>
                      <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'incoming_accordion_body' + outerKey + '-' + innerKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                      <div className='m-accordion__item-content'>
                        {childElementList}
                      </div>
                    </div>
                  </div>
                )
              }
            }
          }
        }
        return incomingElements
      } else {
        console.log('incoming else')
        return false
      }
    }

    parentReviewArtefactRelationshipList = parentSoftwareRelationshipListFn()
    outgoingReviewArtefactRelationshipList = outgoingSoftwareRelationshipListFn()
    incomingReviewArtefactRelationshipList = incomingSoftwareRelationshipListFn()
    childReviewArtefactRelationshipList = childSoftwareRelationshipListFn()
  }
    return (
      <div>
        <div className='row m-portlet col-sm-12'>
          <div className='col-md-10' style={{'marginTop': '30px'}}>
            <h3>{reviewName}</h3>
            <p>{reviewDescription}</p>
          </div>
          <div className='col-md-5' style={{'marginTop': '20px'}}>
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link' + showProperties} data-toggle='tab' onClick={showProperty} href='javascript:void(0);'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={showRelationship} href='javascript:void(0);'>Relationships</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                  <table className={'table table-striped- table-bordered table-hover table-checkable dataTable dtr-inline collapsed ' + styles.borderless}>
                    {reviewArtefactPropertiesList}
                  </table>
                </div>
                <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                  <div className={''} style={{'marginTop': '20px'}}>
                    <div className='m--space-10' />
                    <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                      {parentReviewArtefactRelationshipList}
                      {outgoingReviewArtefactRelationshipList}
                      {incomingReviewArtefactRelationshipList}
                      {childReviewArtefactRelationshipList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <DataModelComponent startNode={startNode} relationships={modelRelationshipData} />
                {/* <DataModelComponent /> */}
              </div>
            </div>
            {/* <img alt='model' src='https://via.placeholder.com/900x545?text=Model%20Visualization' /> */}
          </div>
        </div>
        {/* <Discussion name={Review} type='Component' {...props} />
        <NewDiscussion contextId={contextId} name={Review} type='Component' {...props} /> */}
      </div>
      )
    }
 ReviewArtefact.propTypes = {
  reviewArtefactPropertiesdata: PropTypes.any,
  reviewArtefactRelationshipsdata: PropTypes.any,
  reviewData: PropTypes.any,
  showTabs: PropTypes.any
}
