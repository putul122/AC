import React from 'react'
import PropTypes from 'prop-types'
import './dashboardComponent.scss'
import {defaults, Doughnut, Line} from 'react-chartjs-2'
import _ from 'lodash'
defaults.global.legend.display = false
const doughnutColor = ['#716aca', '#ffb822', '#00c5dc', '#f4516c', '#35bfa3 ', '#800000', '#808000', '#008000', '#008080', '#800080']

export default function Dashboard (props) {
  let reviewsInDraft = ''
  let reviewsInProgress = ''
  // let reviewsCompleted = ''
  let lineData = {}
  let pieChartData = {}
  let datasets = []
  let lineOption = {
    responsive: true,
    title: {
      display: true,
      text: 'Reviews Compliant & Per Month'
    },
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Review'
        }
      }],
      xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
      }]
    }
  }
  if (props.reviewsSummary && props.reviewsSummary !== '') {
    if (props.reviewsSummary.resources.length > 0) {
      reviewsInDraft = props.reviewsSummary.resources[0].count_by_stage['Draft']
      reviewsInProgress = props.reviewsSummary.resources[0].count_by_stage['In Progress']
      // reviewsCompleted = props.reviewsSummary.resources[0].count_by_stage['Completed']
      let data1 = props.reviewsSummary.resources[0].compliant_by_month.map(function (data, index) {
        data.type = 'CompliantByMonth'
        return data
      })
      let data2 = props.reviewsSummary.resources[0].non_compliant_by_month.map(function (data, index) {
        data.type = 'NonCompliantByMonth'
        return data
      })
      console.log('data1', data1)
      console.log('data2', data2)
      let dataArray = data1.concat(data2)
      dataArray = _.orderBy(dataArray, ['month'], ['asc'])
      let length = dataArray.length
      let labels = []
      let compliantByMonth = []
      let nonCompliantByMonth = []
      for (let i = 0; i < length;) {
        if (dataArray[i + 1] && dataArray[i]['month'] === dataArray[i + 1]['month']) {
          labels.push(dataArray[i]['month'])
          if (dataArray[i]['type'] === 'CompliantByMonth') {
            compliantByMonth.push(dataArray[i]['count'])
          }
          if (dataArray[i]['type'] === 'NonCompliantByMonth') {
            nonCompliantByMonth.push(dataArray[i]['count'])
          }
          i++
          if (dataArray[i]['type'] === 'CompliantByMonth') {
            compliantByMonth.push(dataArray[i]['count'])
          }
          if (dataArray[i]['type'] === 'NonCompliantByMonth') {
            nonCompliantByMonth.push(dataArray[i]['count'])
          }
          i++
        } else {
          labels.push(dataArray[i]['month'])
          if (dataArray[i]['type'] === 'CompliantByMonth') {
            compliantByMonth.push(dataArray[i]['count'])
            nonCompliantByMonth.push('')
          } else {
            nonCompliantByMonth.push(dataArray[i]['count'])
            compliantByMonth.push('')
          }
          i++
        }
      }
      console.log(dataArray)
      console.log(compliantByMonth)
      console.log(nonCompliantByMonth)
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
      obj1.data = compliantByMonth
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
      obj2.data = nonCompliantByMonth
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
                      {/* <h3 className='m-portlet__head-text m--font-light'>
                        Reviews in Draft
                      </h3> */}
                    </div>
                  </div>
                </div>
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget17'>
                    <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
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
                        <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                          <span className='m-widget17__icon'>
                            <i className='flaticon-notes m--font-brand' />
                          </span>
                          <span className='m-widget17__subtitle'>
                            <h3 style={{'marginRight': '40px'}}>Reviews in Draft</h3>
                            <h4 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsInDraft}</h4>
                          </span>
                          {/* <span className='m-widget17__desc'>
                            <h1>{softwareCount}</h1>
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
                          <Doughnut id='applicationChart' width={180} data={pieChartData} />
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
                      {/* <h3 className='m-portlet__head-text m--font-light'>
                        Reviews in Progress
                      </h3> */}
                    </div>
                  </div>
                </div>
                {/* <div className='m-portlet__body' style={{'height': '150px'}}>
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
                </div> */}
                <div className='m-portlet__body' style={{'height': '150px'}}>
                  <div className='m-widget17'>
                    <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides' style={{'backgroundColor': '#0083C2'}}>
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
                        <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                          <span className='m-widget17__icon'>
                            <i className='flaticon-truck m--font-brand' />
                          </span>
                          <span className='m-widget17__subtitle'>
                            <h3 style={{'marginRight': '40px'}}>Reviews in Progress</h3>
                            <h4 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{reviewsInProgress}</h4>
                          </span>
                          {/* <span className='m-widget17__desc'>
                            <h1>{softwareCount}</h1>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='row' id='agreementSummary'>
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
          </div> */}
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
                      <h5>Reviews Compliant & Per Month</h5>
                    </span>
                  </div>
                  <div className='col'>
                    <span className='m-widget12__text2'>
                      <Line data={lineData} options={lineOption} />
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
