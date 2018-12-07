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
import { string } from 'prop-types'
import Icon from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';

import '../../styles/LocationSummaryButton.css';

@inject("store") @observer
class LocationSummaryButton extends Component {

  static propTypes = {
    button_label: string,
  }

  static defaultProps = {
    button_label: "Go",
  }

  render() {
        const className = this.props.store.app.locationSummaryStatus ? 'location-summary-button-active' : 'location-summary-button-inactive';
        return (
            <div className="location-summary-label">
              <div>
                <button
                  className={className}
                  onClick={() => {
                      //this.props.store.app.updateCurrentStatus(false);
                      this.props.store.app.updateTrendStatus(false);
                      this.props.store.app.updateLocationSummaryStatus(true);
                      this.props.store.app.updateClimateChangeStatus(false);
                      this.props.store.app.updateSeasonStatus(false);
                      if (this.props.store.app.popupStatus) { this.props.store.app.updatePopupStatus(); }
                      this.props.store.app.downloadDataForTable(this.props.store.app.getSavedLocations);
                      //this.props.store.app.updateSavedLocations();
                      }
                  }
                >
                  {this.props.button_label}
                  <Icon size={14} icon={mapMarker} className="location-summary-graph-icon" />
                </button>
              </div>
            </div>
        )
  }

};

export default LocationSummaryButton;
