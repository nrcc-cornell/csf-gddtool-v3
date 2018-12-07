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
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import '../../styles/GddTargetSelect.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
//const Range = createSliderWithTooltip(Slider.Range);
createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

@inject("store") @observer
class GddTargetSelect extends Component {

  render() {
    if (this.props.store.app.getGddTarget && this.props.store.app.getChartData) {
        let target = parseInt(this.props.store.app.getGddTarget,10)
        let target_str = target.toString()
        let max_gdd = this.props.store.app.getChartData.gdd_ytd_por_max[this.props.store.app.getChartData.gdd_ytd_por_max.length-1]
        max_gdd = Math.floor(max_gdd/100)*100;
        let max_gdd_str = max_gdd.toString()
        let marks_object = {50:'50'}
        marks_object[target] = target_str
        //marks_object[max_gdd] = max_gdd_str
        marks_object[max_gdd] = max_gdd_str

        return (
            <div className={(this.props.store.app.getTargetIsEnabled) ? 'target-div' : 'hide-target-div'}>
            <div className='target-slider-div'>
                <Slider
                    min={50}
                    //max={2000}
                    max={max_gdd}
                    step={25}
                    //defaultValue={this.props.store.app.getGddTarget}
                    //value={this.props.store.app.getGddTarget}
                    defaultValue={target}
                    value={target}
                    onChange={this.props.store.app.onChangeGddTarget}
                    handle={handle}
                    handleStyle={{
                        borderColor: '#4ca20b',
                    }}
                    marks={marks_object}
                    trackStyle={{ backgroundColor: '#4ca20b'}}
                    dotStyle={{borderColor:'#4ca20b'}}
                    activeDotStyle={{borderColor:'#4ca20b'}}
                />
            </div>
            </div>
        )
    } else {
        return(false);
    }
  }

};

export default GddTargetSelect;

