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
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-advanced';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

import '../../styles/DisplaySeason.css';
import '../../styles/loader.css';

var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

const spinner = <div className="loader"></div>

@inject("store") @observer
class DisplaySeason extends Component {

  render() {

        if ( (this.props.store.app.seasonStatus) && (this.props.store.app.getChartData) ) {

            var data = this.props.store.app.getChartData
            let year = this.props.store.app.getPlantingYear

            let lastDayOfSeason = moment(year+'-11-15', 'YYYY-MM-DD')
            let idxFirstFcst = data.dates_selected_year.length
            let firstFcstDate = null
            if (data.firstFcstDate==="") {
                idxFirstFcst = data.gdd_ytd_selected.length
                firstFcstDate = null
            } else {
                idxFirstFcst = data.dates_selected_year.indexOf(data.firstFcstDate)
                firstFcstDate = moment(data.firstFcstDate,'YYYY-MM-DD')
            }

            //const getXaxisMin = () => {
            //    return this.props.store.app.getPlantingDate
            //    //let beginSeason = moment.utc( this.props.store.app.getPlantingDate.format('YYYY-MM-DD'), 'YYYY-MM-DD' )
            //    //return beginSeason
            //}

            const getXaxisMax = () => {
                //let endOfSeason = moment.utc(year.toString()+'-11-01','YYYY-MM-DD')
                let endOfSeason = moment.utc(year.toString()+'-11-15','YYYY-MM-DD')
                return endOfSeason
            }

            // function to count item in array
            const countItemInArray = (item,arr) => {
                let i
                let count = 0;
                for(i = 0; i < arr.length; ++i){
                    if(arr[i] === item)
                        count++;
                }
                return count
            }

            // data for first freeze
            let dataForFirstFreeze = [];
            let i, countOfThisDate;
            for (i=0; i<data.datesOfFirstFreeze_15yr.length; i++) {
                countOfThisDate = countItemInArray(data.datesOfFirstFreeze_15yr[i],data.datesOfFirstFreeze_15yr)
                dataForFirstFreeze.push( {x: moment(data.datesOfFirstFreeze_15yr[i],'YYYY-MM-DD'), y: countOfThisDate, color: 'rgb(0,0,255)'} )
            }

            // data for last freeze
            let dataForLastFreeze = [];
            for (i=0; i<data.datesOfLastFreeze_15yr.length; i++) {
                countOfThisDate = countItemInArray(data.datesOfLastFreeze_15yr[i],data.datesOfLastFreeze_15yr)
                dataForLastFreeze.push( {x: moment(data.datesOfLastFreeze_15yr[i],'YYYY-MM-DD'), y: countOfThisDate, color: 'rgb(0,0,255)'} )
            }

            // date of GDD target forecast date and historical range
            let targetDate = null;
            let targetMin = null;
            let targetMax = null;
            let targetFcstDate = null;
            let targetFcstMin_15yr = null;
            let targetFcstMax_15yr = null;
            //for (i=0; i<data.gdd_ytd_15yr_ave.length; i++) {
            //    if (this.props.store.app.getGddTarget <= data.gdd_ytd_15yr_ave[i]) {
            //        targetDate = moment(this.props.store.app.getPlantingDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
            //        break;
            //    }
            //}
            for (i=0; i<data.gdd_ytd_selected.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_ytd_selected[i]) {
                    targetDate = moment(this.props.store.app.getPlantingDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    break;
                }
            }
            for (i=0; i<data.gdd_fcst_15yr_ave.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_fcst_15yr_ave[i]) {
                    //targetFcstDate = moment(data.firstFcstDate,'YYYY-MM-DD').add(i-1,'days').format('YYYY-MM-DD')
                    targetFcstDate = moment(data.firstFcstDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    break;
                }
            }
            for (i=0; i<data.gdd_ytd_por_max.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_ytd_por_max[i]) {
                    targetMin = moment(this.props.store.app.getPlantingDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    targetMax = moment(this.props.store.app.getPlantingDate,'YYYY-MM-DD').add(data.gdd_ytd_por_max.length,'days').format('YYYY-MM-DD')
                    break;
                }
            }
            for (i=0; i<data.gdd_ytd_por_min.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_ytd_por_min[i]) {
                    targetMax = moment(this.props.store.app.getPlantingDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    break;
                }
            }
            for (i=0; i<data.gdd_fcst_15yr_max.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_fcst_15yr_max[i]) {
                    //targetFcstMin_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(i-1,'days').format('YYYY-MM-DD')
                    //targetFcstMax_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(data.gdd_fcst_15yr_max.length-1,'days').format('YYYY-MM-DD')
                    targetFcstMin_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    targetFcstMax_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(data.gdd_fcst_15yr_max.length,'days').format('YYYY-MM-DD')
                    break;
                }
            }
            for (i=0; i<data.gdd_fcst_15yr_min.length; i++) {
                if (this.props.store.app.getGddTarget <= data.gdd_fcst_15yr_min[i]) {
                    //targetFcstMax_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(i-1,'days').format('YYYY-MM-DD')
                    targetFcstMax_15yr = moment(data.firstFcstDate,'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD')
                    break;
                }
            }

            // determine if the forecasts are viewable in the currently displayed chart
            const fcstInView = () => {
                if (firstFcstDate === null) { return false }
                if (firstFcstDate > lastDayOfSeason) { return false }
                if (firstFcstDate > getXaxisMax()) { return false }
                return true
            }

            function tooltipFormatter() {
                var i, item;
                var header = '<span style="font-size:14px;font-weight:bold;text-align:center">' + Highcharts.dateFormat('%b %d, %Y', this.x) + '</span>';
                var tips = "";
                for (i=0; i<this.points.length; i++) {
                    item = this.points[i];
                    if ( (item.series.name !== "POR Max") && (item.series.name !== "POR Min") && (item.series.name !== "POR") ) {
                        tips += '<br/>' + item.y.toFixed(0) + ' : <span style="color:'+item.color+';font-size:12px;font-weight:bold">' +  item.series.name + '</span>';
                    }
                    if (item.series.name === "POR Min") {
                        tips += '<br/>' + item.y.toFixed(0) + '-';
                    }
                    if (item.series.name === "POR Max") {
                        tips += item.y.toFixed(0) + ' : <span font-size:12px;">Period of Record</span>';
                    }
                }
                return header + tips;
            }

            const afterRender = (chart) => {
                chart.renderer.text(year + ' Season Outlook', 300, 85).attr({zIndex:12}).css({ color:"#000000", fontSize:"16px" }).add();
            };

            // determine whether crosshair should be in front of data
            //let crosshair_zindex = (data.gdd_ytd_por_min[idxFirstFcst]<100) ? 4 : 1;
            let crosshair_zindex = (data.gdd_ytd_por_min[-62]<100) ? 4 : 1;

            let por = data.gdd_ytd_por_min.map( (v, i) => { return [data.gdd_ytd_por_min[i], data.gdd_ytd_por_max[i]] });

            // construct plotLines and plotBands
            let plotLines = []
            let plotBands = []
            let targetTooltipLabel = ''
            let targetInLegend = false
            if (this.props.store.app.getTargetIsEnabled) {
              if (this.props.store.app.getGddTarget <= data.gdd_ytd_selected[idxFirstFcst-1]) {
                plotLines.push({ label: {text:'Target Observed', y:30}, color: 'rgba(0,255,0,1.0)', width: 4, zIndex: 6, value: moment(targetDate, 'YYYY-MM-DD') })
                if (parseInt(year,10) !== this.props.store.app.latestSelectableYear) {
                    plotLines.push({ label: {text:''}, color: 'rgba(0,255,0,1.0)', width: 1, value: moment(targetMin, 'YYYY-MM-DD') })
                    plotLines.push({ label: {text:''}, color: 'rgba(0,255,0,1.0)', width: 1, value: moment(targetMax, 'YYYY-MM-DD') })
                    plotBands.push({ label: {text:''}, color: 'rgba(0,255,0,0.1)', from: moment(targetMin,'YYYY-MM-DD'), to: moment(targetMax,'YYYY-MM-DD') })
                    targetTooltipLabel = 'POR Target Range'
                    targetInLegend = true
                } else {
                    targetTooltipLabel = 'Target Fcst Range'
                    targetInLegend = false
                }
              } else {
                plotLines.push({ label: {text:'Target Fcst', y:30}, color: 'rgba(0,255,0,1.0)', width: 4, zIndex: 6, value: moment(targetFcstDate, 'YYYY-MM-DD') })
                if (parseInt(year,10) === this.props.store.app.latestSelectableYear) {
                    plotLines.push({ label: {text:''}, color: 'rgba(0,255,0,1.0)', width: 1, value: moment(targetFcstMin_15yr, 'YYYY-MM-DD') })
                    plotLines.push({ label: {text:''}, color: 'rgba(0,255,0,1.0)', width: 1, value: moment(targetFcstMax_15yr, 'YYYY-MM-DD') })
                    plotBands.push({ label: {text:''}, color: 'rgba(0,255,0,0.1)', from: moment(targetFcstMin_15yr,'YYYY-MM-DD'), to: moment(targetFcstMax_15yr,'YYYY-MM-DD') })
                    targetTooltipLabel = 'Target Fcst Range'
                    targetInLegend = true
                }
              }
            }
            //plotLines.push({ label: {text:'First Freeze (Median)', y:180}, color: 'rgba(135,206,250,1.0)', width: 6, zIndex: 5, value: moment(data.datesOfFirstFreeze_15yr[7], 'YYYY-MM-DD') })
            //plotLines.push({ label: {text:'Last Freeze (Median)', y:180}, color: 'rgba(135,206,250,1.0)', width: 6, zIndex: 5, value: moment(data.datesOfLastFreeze_15yr[7], 'YYYY-MM-DD') })

            var chartConfig = {
                 plotOptions: {
                     line: {
                         //animation: true,
                         animation: false,
                     },
                     series: {
                         type: 'line',
                         //pointStart: moment(this.props.store.app.getPlantingDate,"MM/DD/YYYY"),
                         pointStart: moment(data.dates_selected_year[0],"YYYY-MM-DD"),
                         pointInterval: 24*3600*1000,
                         //animation: { duration: 800 },
                         animation: false,
                         lineWidth: 4,
                         marker: {
                             symbol: 'circle',
                         },
                         states: {
                             hover: {
                                 enabled: true,
                                 halo: {
                                     size: 0
                                 }
                             }
                         }
                     }
                 },
                 chart: { height: 460, width: 724, marginTop: 60, backgroundColor: null },
                 title: {
                     text: 'Cumulative Growing Degree Days (Base '+this.props.store.app.getGddBase+')'
                 },
                 subtitle: {
                     text: '@ ' + this.props.store.app.getAddress,
                     style:{"font-size":"14px",color:"#000000"},
                 },
                 exporting: {
                   chartOptions: {
                     chart: {
                       backgroundColor: '#ffffff'
                     }
                   }
                 },
                 tooltip: { useHtml:true, shared:true, borderColor:"#000000", borderWidth:2, borderRadius:8, shadow:false, backgroundColor:"#ffffff",
                   xDateFormat:"%b %d, %Y", positioner:function(){return {x:80, y:60}}, shape: 'rect',
                   crosshairs: { width:1, color:"#ff0000", snap:true, zIndex: crosshair_zindex }, formatter:tooltipFormatter },
                 credits: { text:"Powered by NRCC", href:"http://www.nrcc.cornell.edu/", color:"#000000" },
                 legend: { align: 'left', symbolRadius: 0, floating: true, verticalAlign: 'top', layout: 'vertical', x: 65, y: 50 },
                 xAxis: {
                     type: 'datetime',
                     startOnTick: false,
                     endOnTick: false,
                     // after update to highcharts
                     //min: getXaxisMin(),
                     max: getXaxisMax(),
                     labels: { align: 'center', x: 0, y: 20 },
                     plotLines: plotLines,
                     plotBands: plotBands,
                     dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
                 },
                 yAxis: [
                     { title:{ text:'Cumulative GDD', style:{"font-size":"14px", color:"#000000"}}, min: 0,
                         //alignTicks: false, endOnTick: false,
                         gridZIndex:1, labels:{style:{color:"#000000"}}},
                     { title:{ text:'First/Last Freeze (# yrs)', align:'low', style:{"font-size":"14px", color:"#0000FF"}}, min: 0, max: 8,
                         //alignTicks: false, endOnTick: false,
                     labels:{style:{color:"#0000FF"}}, opposite: true },
                 ],
                 series: [{
                     name: "Season to Date", data: data.gdd_ytd_selected.slice(0,idxFirstFcst), type: "line", zIndex: 24, lineWidth: 2, color: "#00dd00", shadow: false, marker: { enabled: true, fillColor: "#00dd00", lineWidth: 2, lineColor: "#00dd00", radius:2, symbol:"circle" } },{
                     name: "6 Day Forecast", data: new Array(idxFirstFcst).fill(null).concat(data.gdd_ytd_selected.slice(idxFirstFcst)), type: "line", zIndex: 24, lineWidth: 2, color: "#dd0000", shadow: false, marker: { enabled: true, fillColor: "#dd0000", lineWidth: 2, lineColor: "#dd0000", radius:2, symbol:"circle" }, showInLegend: fcstInView() },{
                     name: "15 Year Average", data: data.gdd_ytd_15yr_ave, type: "line", zIndex: 23, lineWidth: 2, color: "#0000ff", marker: { enabled: false, states: { hover: { enabled: false }} } },{
                     name: '30 Year "Normal"', data: data.gdd_ytd_30yr_nor, type: "line", zIndex: 22, lineWidth: 2, color: "#B041FF", marker: { enabled: false, states: { hover: { enabled: false }} } },{
                     name: "POR Min", data: data.gdd_ytd_por_min, type: "line", showInLegend: false, zIndex: 10, lineWidth: 2, color: "#444444", marker: { enabled: false, states: { hover: { enabled: false }} } },{
                     name: "POR Max", data: data.gdd_ytd_por_max, type: "line", showInLegend: false, zIndex: 10, lineWidth: 2, color: "#444444", marker: { enabled: false, states: { hover: { enabled: false }} } },{
                     name: "POR", data: por, type: "arearange", showInLegend: false, zIndex: 10, lineWidth: 2, color: "#444444", fillColor: "#eeeeee", fillOpacity: 0.1, marker: { enabled: false, states: { hover: { enabled: false }} } },{
                     name: "Period of Record", data: {}, color: '#D3D3D3', lineWidth: 0, marker : {symbol: 'square', lineWidth: 2, lineColor: '#000000', radius: 12 } },{
                     //name: "15 Year Freeze Data", data: {}, color: 'rgba(135,206,250,1.0)', lineWidth: 0, marker : {symbol: 'square', radius: 12 } },{
                     name: targetTooltipLabel, data: {}, color: 'rgba(0,255,0,0.2)', lineWidth: 0, marker : {symbol: 'square', radius: 12 },
                             showInLegend: targetInLegend },{
                     name: 'First/Last Freezes (15 yrs)', type: 'column', pointWidth: 1, borderWidth: 0,
                         yAxis: 1,
                         showInLegend: true,
                         enableMouseTracking: false,
                         //marker: { states: { hover: { enabled: false }} },
                         data: dataForFirstFreeze,
                         //zIndex: 23,
                     },{
                     name: 'Last Freeze Occurrences', type: 'column', pointWidth: 1, borderWidth: 0,
                         yAxis: 1,
                         showInLegend: false,
                         enableMouseTracking: false,
                         //marker: { states: { hover: { enabled: false }} },
                         data: dataForLastFreeze,
                         //zIndex: 23,
                     }
                 ]
            };

            return (
                <div className='season-display-active'>
                  <Loader message={spinner} show={this.props.store.app.getLoaderData} priority={10} backgroundStyle={{backgroundColor: null}} hideContentOnLoad={true}>
                    <div className="season-display-content">
                      <ReactHighcharts config={ chartConfig } callback={afterRender} isPureConfig />
                    </div>
                  </Loader>
                </div>
            )

        } else {
            return(false)
        }
  }

};

export default DisplaySeason;
