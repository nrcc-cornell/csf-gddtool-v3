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
import Select from 'react-select';
//import 'react-select/dist/react-select.css';

import '../../styles/GddBaseSelect.css';

// selectable values: 32 - 60 degrees F
const selectValues = Array.from(new Array(19), (x,i) => i + 32)

var disabled
var selectOptions = []
for(var idx=0; idx<selectValues.length; idx++){
    disabled = false
    selectOptions.push({ value: selectValues[idx].toString(), label: selectValues[idx].toString()+'°F', clearableValue: false, disabled: disabled })
}
// include 86/50 method
selectOptions.push({ value: '86/50', label: '50°F (86/50)', clearableValue: false, disabled: disabled })

// reverse so that larger bases show first
selectOptions.reverse()

@inject("store") @observer
class GddBaseSelect extends Component {

  render() {
        return (
            <div className='base-div'>
            <div className='base-label'>
              <label><b>GDD Base (°F)</b></label>
            </div>
            <div className='select-div'>
                <Select
                    className="gdd-base-dropdown"
                    name="gdd_base"
                    placeholder={(this.props.store.app.getGddBase==='86/50') ? '50°F (86/50)' : this.props.store.app.getGddBase+'°F'}
                    maxMenuHeight={200}
                    value={this.props.store.app.getGddBase}
                    isClearable={false}
                    options={selectOptions}
                    onChange={this.props.store.app.updateGddBase}
                />

            </div>
            </div>
        )
  }

};

export default GddBaseSelect;

