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

import '../../styles/GddTargetSelectEnable.css';

@inject("store") @observer
class GddTargetSelectEnable extends Component {

  render() {
        return (
                <div className="gdd-target-select-enable">
                  <form>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" value="true"
                            checked={this.props.store.app.getTargetIsEnabled}
                            onChange={this.props.store.app.setTargetIsEnabled}
                        />
                        <span> enable Targets</span>
                      </label>
                    </div>
                  </form>
                </div>
        )
  }

};

export default GddTargetSelectEnable;

