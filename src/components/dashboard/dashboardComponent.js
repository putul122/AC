import React from 'react'
import PropTypes from 'prop-types'
import {defaults, Pie, Line} from 'react-chartjs-2'
// import styles from './dashboardComponent.scss'
// import _ from 'lodash'
defaults.global.legend.display = false
const doughnutColor = ['#716aca', '#ffb822', '#00c5dc', '#f4516c', '#35bfa3 ', '#800000', '#808000', '#008000', '#008080', '#800080']
export default function Dashboard (props) {
  let reviewsInDraft = ''
  let reviewsInProgress = ''
  let reviewsCompleted = ''
  let lineData = {}
  let pieChartData = {}
  let datasets = []
  if (props.reviewsSummary && props.reviewsSummary !== '') {
    if (props.reviewsSummary.resources.length > 0) {
      reviewsInDraft = props.reviewsSummary.resources[0].count_by_stage['Draft']
      reviewsInProgress = props.reviewsSummary.resources[0].count_by_stage['In Progress']
      reviewsCompleted = props.reviewsSummary.resources[0].count_by_stage['Completed']
      let labels = []
      let obj1 = {
        label: 'Compliant Review',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
      }
      let obj1data = []
      props.reviewsSummary.resources[0].compliant_by_month.forEach(function (data, index) {
        labels.push(data.month)
        obj1data.push(data.count)
      })
      obj1.data = obj1data
      datasets.push(obj1)
      lineData.labels = labels
      let obj2 = {
        label: 'Non Compliant Review',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '"rgba(225,0,0,0.4)"',
        borderColor: 'red',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
      }
      let obj2data = []
      props.reviewsSummary.resources[0].non_compliant_by_month.forEach(function (data, index) {
        obj2data.push(data.count)
      })
      obj2.data = obj2data
      datasets.push(obj2)
      lineData.datasets = datasets
      let countByCategory = props.reviewsSummary.resources[0].count_by_category
      let pieLabels = []
      let pieData = []
      let colorData = []
      let datasetObject = {}
      let idx = 0
      for (let keyField in countByCategory) {
        if (countByCategory.hasOwnProperty(keyField)) {
          pieLabels.push(keyField)
          pieData.push(countByCategory[keyField])
          colorData.push(doughnutColor[idx++])
        }
      }
      pieChartData.labels = pieLabels
      pieChartData.legend = false
      pieChartData.datasets = []
      datasetObject.data = pieData
      datasetObject.backgroundColor = colorData
      datasetObject.hoverBackgroundColor = colorData
      pieChartData.datasets.push(datasetObject)
      console.log('pieChartData', pieChartData)
    }
  }
  return (
    <div className=''>
      <div className='row' style={{'overflow': 'visible'}}>
        <div className='col-md-12'>
          <div className='row' id='applicationSummary'>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
                <div className='m-portlet__head'>
                  <div className='m-portlet__head-caption'>
                    <div className='m-portlet__head-title'>
                      <h3 className='m-portlet__head-text m--font-light'>
                        Reviews in Draft
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget17'>
                    <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                      <div className='m-widget17__chart'>
                        <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                          <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                            <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                        <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                      </div>
                    </div>
                    <div className='m-widget17__stats'>
                      <div className='m-widget17__items m-widget17__items-col2'>
                        <div className='m-widget17__item' style={{'marginTop': '-7.87rem'}}>
                          <span className='m-widget17__icon'>
                            <i className='flaticon-folder-4 m--font-brand' />
                            <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsInDraft}</h4>
                          </span>
                          {/* <span className='m-widget17__subtitle'>
                            <h3><a href='/applications'>Applications</a></h3>
                            <h4>R {formatAmount(applicationCost)}</h4>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='m-portlet m-portlet--full-height'>
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget12'>
                    <div className='m-widget12__item'>
                      <div className='col m-widget12__text1'>
                        <span className=''>
                          <h4>Number of Reviews</h4>
                          <br />
                          <h5>Per Category Type</h5>
                        </span>
                      </div>
                      <div className='col'>
                        <span className='m-widget12__text2'>
                          <Pie id='applicationChart' width={180} data={pieChartData} />
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
      <div className='row'>
        <div className='col-md-6'>
          <div className='row' id='supplierSummary'>
            <div className='col-md-12'>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
                <div className='m-portlet__head'>
                  <div className='m-portlet__head-caption'>
                    <div className='m-portlet__head-title'>
                      <h3 className='m-portlet__head-text m--font-light'>
                        Reviews in Progress
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget17'>
                    <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                      <div className='m-widget17__chart'>
                        <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                          <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                            <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                        <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                      </div>
                    </div>
                    <div className='m-widget17__stats'>
                      <div className='m-widget17__items m-widget17__items-col2'>
                        <div className='m-widget17__item' style={{'marginTop': '-7.87rem'}}>
                          <span className='m-widget17__icon'>
                            <i className='flaticon-truck m--font-brand' />
                            <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsInProgress}</h4>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row' id='agreementSummary'>
            <div className='col-md-12'>
              <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
                <div className='m-portlet__head'>
                  <div className='m-portlet__head-caption'>
                    <div className='m-portlet__head-title'>
                      <h3 className='m-portlet__head-text m--font-light'>
                        Reviews Completed
                      </h3>
                    </div>
                  </div>
                </div>
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget17'>
                    <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                      <div className='m-widget17__chart'>
                        <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                          <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                          <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                            <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                        <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                      </div>
                    </div>
                    <div className='m-widget17__stats'>
                      <div className='m-widget17__items m-widget17__items-col2'>
                        <div className='m-widget17__item' style={{'marginTop': '-7.87rem'}}>
                          <span className='m-widget17__icon'>
                            <i className='flaticon-business m--font-brand' />
                            <h4 style={{'float': 'right', 'paddingRight': '25px'}}>{reviewsCompleted}</h4>
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
        <div className='col-md-6'>
          <div className='m-portlet m-portlet--full-height'>
            <div className='m-portlet__body'>
              <div className='m-widget12'>
                <div className='m-widget12__item'>
                  <div className='col m-widget12__text1'>
                    <span className=''>
                      <h4>Number of Reviews</h4>
                      <br />
                      <h5>Per Review Type</h5>
                    </span>
                  </div>
                  <div className='col'>
                    <span className='m-widget12__text2'>
                      <Line data={lineData} />
                    </span>
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

Dashboard.propTypes = {
  reviewsSummary: PropTypes.any
}
