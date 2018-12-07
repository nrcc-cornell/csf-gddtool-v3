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
import Icon from 'react-icons-kit';
import { info } from 'react-icons-kit/icomoon/info';

import '../../styles/InfoButton.css';

@inject("store") @observer
class InfoButton extends Component {

  render() {
        const className = this.props.store.app.popupStatus ? 'data-sources-button-active' : 'data-sources-button-inactive';
        return (
            <div className="data-sources-label">
                <Icon icon={info} size={26} className={className}
                  onClick={() => {
                      if (this.props.store.app.locationSummaryStatus) { this.props.store.app.updateLocationSummaryStatus(false) };
                      this.props.store.app.updatePopupStatus();
                      }
                  }
                />
            </div>
        )
  }

};

export default InfoButton;
