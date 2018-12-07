///////////////////////////////////////////////////////////////////////////////
//
// Climate Smart Farming Growing Degree Day Calculator
// Copyright (c) 2018 Cornell Institute for Climate Smart Solutions
// All Rights Reserved
//
// This software is published under the provisions of the GNU General Public
// License <http://www.gnu.org/licenses/>. A text copy of the license can be
// found in the file 'LICENSE' included with this software.
//
// A text copy of the copyright notice, licensing conditions and disclaimers
// is available in the file 'COPYRIGHT' included with this software.
//
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-advanced';
import ReactTable from "react-table";
import moment from "moment";

import 'react-table/react-table.css'
import '../../styles/DisplayLocationSummary.css';
import '../../styles/loader.css';

const spinner = <div className="loader"></div>

@inject("store") @observer
class DisplayLocationSummary extends Component {

  render() {

        let dateDiffInDays = (a,b) => {
          var a_moment = moment(a,'MM/DD/YYYY');
          var b_moment = moment(b,'MM/DD/YYYY');
          var diffDays = b_moment.diff(a_moment, 'days');
          return diffDays;
        }

        if ( (this.props.store.app.locationSummaryStatus) && (this.props.store.app.getTableData) && (this.props.store.app.getChartData) ) {

            //let locations = this.props.store.app.getSavedLocations;
            let tableData = this.props.store.app.getTableData;
            let chartData = this.props.store.app.getChartData;
            let selected_id = this.props.store.app.getSelectedID;
            tableData = toJS(tableData)
            let data = [];
            let columns = [];
            let planting_date, gdd_base, gdd_target, gdd, target_date;

            let idxFirstFcst = chartData.dates_selected_year.length
            let firstFcstDate = null
            if (chartData.firstFcstDate==="") {
                idxFirstFcst = chartData.gdd_ytd_selected.length
                firstFcstDate = null
            } else {
                idxFirstFcst = chartData.dates_selected_year.indexOf(chartData.firstFcstDate)
                firstFcstDate = moment(chartData.firstFcstDate,'YYYY-MM-DD')
            }

            let selectedTargetFcstDate='--/--';
            if (this.props.store.app.getGddTarget >= chartData.gdd_ytd_selected[idxFirstFcst-1]) {
                // use forecasts
                for (var i=0; i<chartData.gdd_fcst_15yr_ave.length; i++) {
                    if (this.props.store.app.getGddTarget <= chartData.gdd_fcst_15yr_ave[i]) {
                        //selectedTargetFcstDate = moment(chartData.firstFcstDate,'YYYY-MM-DD').add(i-1,'days').format('MM/DD')
                        selectedTargetFcstDate = moment(chartData.firstFcstDate,'YYYY-MM-DD').add(i,'days').format('MM/DD')
                        break;
                    }
                }
            } else {
                // use observations
                for (i=0; i<chartData.gdd_ytd_selected.length; i++) {
                    if (this.props.store.app.getGddTarget <= chartData.gdd_ytd_selected[i]) {
                        //selectedTargetFcstDate = moment(this.props.store.app.getPlantingDate.format('YYYY-MM-DD'),'YYYY-MM-DD').add(i-1,'days').format('MM/DD')
                        selectedTargetFcstDate = moment(this.props.store.app.getPlantingDate.format('YYYY-MM-DD'),'YYYY-MM-DD').add(i,'days').format('MM/DD')
                        break;
                    }
                }
            }

            let one_column = []
            let one_data = []
            one_column.push({accessor:'title', style: {background:'rgba(255,255,255,1.0)', fontWeight: 'bold'}, width:205})
            if (this.props.store.app.getTargetIsEnabled) {
                one_column.push({accessor:'white', width:172})
                one_column.push({accessor:'yellow', style: {background:'rgba(255,255,0,0.4)'}, width:172})
                one_column.push({accessor:'green', style: {background:'rgba(76,162,11,0.4)'}, width:172})
                one_data.push({title:'GDD Target Status Color:', white:'> 2 weeks until target', yellow:'< 2 weeks until target', green:'Target is observed'})
            } else {
                one_column.push({accessor:'white', width:516})
                one_data.push({title:'GDD Target Status Color:', white:'You currently do not have targets enabled.'})
            }

            columns.push({Header:'Address', accessor:'address', width:264})
            columns.push({Header:'Planting Date', accessor:'planting_date', width:100})
            columns.push({Header:'Base (°F)', accessor:'gdd_base', width:80})
            columns.push({Header:'GDD (Obs Date)', accessor:'gdd', width:130})
            columns.push({Header:'Target (Fcst Date)', accessor:'gdd_target', width:130})
            for (var key in tableData) {
                if (selected_id===key) {
                    planting_date = this.props.store.app.getPlantingDate.format('MM/DD/YYYY')
                    gdd_base = this.props.store.app.getGddBase
                    gdd_target = this.props.store.app.getGddTarget
                    gdd = chartData.gdd_ytd_selected[idxFirstFcst-1].toString()
                } else {
                    if (tableData[key].hasOwnProperty('planting_date')) {
                        planting_date = tableData[key]['planting_date'];
                    } else {
                        planting_date = '01/01/'+this.props.store.app.latestSelectableYear.toString();
                    }
                    if (tableData[key].hasOwnProperty('gdd_base')) {
                        gdd_base = tableData[key]['gdd_base']
                    } else {
                        gdd_base = '50'
                    }
                    if (tableData[key].hasOwnProperty('gdd_target')) {
                        gdd_target = tableData[key]['gdd_target']
                    } else {
                        gdd_target = '1500'
                    }
                    if (tableData[key].hasOwnProperty('gdd')) {
                        gdd = tableData[key]['gdd'].toString()
                    } else {
                        gdd = ''
                    }
                    if (tableData[key].hasOwnProperty('target_date')) {
                        target_date = tableData[key]['target_date']
                        if (target_date!=='') {
                            target_date = tableData[key]['target_date'].slice(5).replace('-','/')
                        } else {
                            target_date = '--/--'
                        }
                    } else {
                        target_date = '--/--'
                    }
                }
                data.push({
                    address: tableData[key]['address'],
                    planting_date: planting_date,
                    gdd_base: gdd_base,
                    gdd: (selected_id===key) ?
                         Math.round(gdd).toString()+" ("+chartData['dates_selected_year'][idxFirstFcst-1].slice(5).replace('-','/')+")" :
                         Math.round(gdd).toString()+" ("+tableData[key]['last_obs_date'].slice(5).replace('-','/')+")",
                    gdd_target: (this.props.store.app.getTargetIsEnabled) ?
                        (selected_id===key) ? gdd_target+" ("+selectedTargetFcstDate+")" : gdd_target+" ("+target_date+")" :
                        '--'
                    })
            }

            return (
                <div className='current-display-active'>
                  <Loader message={spinner} show={this.props.store.app.getLoaderData} priority={10} backgroundStyle={{backgroundColor: null}} hideContentOnLoad={true}>
                    <div className="current-display-content">
                      <ReactTable
                          data={data}
                          columns={columns}
                          defaultPageSize={11}
                          showPagination={true}
                          showPageSizeOptions={false}
                          getTrProps={(state, rowInfo) => {
                              if (rowInfo && rowInfo.row && this.props.store.app.getTargetIsEnabled) {
                                  return {
                                      style: {
                                          background: parseInt(rowInfo.row.gdd_target,10) <= parseInt(rowInfo.row.gdd,10) ?
                                                      'rgba(76,162,11,0.4)' :
                                                      dateDiffInDays(rowInfo.row.gdd.split('(')[1].slice(0,5), rowInfo.row.gdd_target.split('(')[1].slice(0,5)) < 14 ? 'rgba(255,255,0,0.4)' : null
                                      }
                                  }
                              } else {
                                  return {}
                              }
                          }}
                      />
                      <ReactTable
                          data={one_data}
                          columns={one_column}
                          showPagination={false}
                          defaultPageSize={1}
                      />
                    </div>
                  </Loader>
                </div>
            )

        } else {
            return(false)
        }
  }

};

export default DisplayLocationSummary;
