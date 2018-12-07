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

import React from 'react';
import { observable, computed, action } from 'mobx';
import jsonp from 'jsonp';
import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/button.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/button';
import moment from 'moment';

export class AppStore {
    // -----------------------------------------------------------------------------------------
    // Display status of Current Conditions ----------------------------------------------------
    // For Components: CurrentButton, DisplayCurrent -------------------------------------------
    // -----------------------------------------------------------------------------------------
    @observable current_status=false;
    @action updateCurrentStatus = (b) => { this.current_status = b };
    @computed get currentStatus() { return this.current_status };

    // -----------------------------------------------------------------------------------------
    // Display status of Season To Date --------------------------------------------------------
    // For Components: TrendButton, DisplayTrend -----------------------------------------------
    // -----------------------------------------------------------------------------------------
    @observable trend_status=false;
    @action updateTrendStatus = (b) => { this.trend_status = b };
    @computed get trendStatus() { return this.trend_status };

    // -----------------------------------------------------------------------------------------
    // Display status of Location Summaries ----------------------------------------------------
    // For Components: LocationSummaryButton, DisplayLocationSummary ---------------------------
    // -----------------------------------------------------------------------------------------
    @observable location_summary_status=false;
    @action updateLocationSummaryStatus = (b) => { this.location_summary_status = b };
    @computed get locationSummaryStatus() { return this.location_summary_status };

    // -----------------------------------------------------------------------------------------
    // Display status for Full Season ----------------------------------------------------------
    // For Components: SeasonButton, DisplaySeason - -------------------------------------------
    // -----------------------------------------------------------------------------------------
    @observable season_status=true;
    @action updateSeasonStatus = (b) => { this.season_status = b };
    @computed get seasonStatus() { return this.season_status };

    // -----------------------------------------------------------------------------------------
    // Display status for climate change results -----------------------------------------------
    // For Components: ClimateChangeButton -----------------------------------------------------
    // -----------------------------------------------------------------------------------------
    @observable climate_change_status=false;
    @action updateClimateChangeStatus = (b) => {
        this.climate_change_status = b
    };
    @computed get climateChangeStatus() { return this.climate_change_status };
    cc_placeholder_content=
        <div>
        <p>
        <h3><b>Find out how Growing Degree Days are changing where you live ...</b></h3>
        </p>
        <p>
        The Northeast United States has observed an increase in temperatures over the past century, and that trend is expected to continue. In just the last four decades warming has intensified, on average, at a rate of 0.5°F/decade in this region. As a consequence, the Northeast US is experiencing longer growing seasons and a greater amount of heat accumulation that affects plant and insect development.
        </p>
        <p>
        Our tool, <a href="http://climatesmartfarming.org/tools/csf-county-climate-change/" target="_blank" rel="noopener noreferrer">Climate Change in Your County</a>, provides regional maps and individual county charts that describe how the climate has changed in the Northeast US since 1950, and what is expected over the next century. Observed and projected trends for the following are available:
        </p>
        <p>
  &bull; Average annual temperatures <br/>
  &bull; Number of days exceeding 90°F <br/>
  &bull; Growing season length <br/>
  &bull; Growing degree days <br/>
  &bull; Total annual precipitation <br/>
  &bull; Heavy precipitation events <br/>
        </p>
        <p>
The tool provides data at the county level to show local changes and impacts. This type of information will help farmers and decision makers understand how climate change will likely affect them over the coming decades. For more information, please contact us at <a href="mailto:cicss@cornell.edu?subject=CSF growing degree day calculator">cicss@cornell.edu</a>.
        </p>
        </div>;

    // -----------------------------------------------------------------------------------------
    // Display status for Data Sources and References ------------------------------------------
    // For Components: InfoButton & InfoWindow -------------------------------------------------
    // -----------------------------------------------------------------------------------------
    @observable info_status=false;
    @action updatePopupStatus = () => { this.info_status = !this.info_status };
    @computed get popupStatus() { return this.info_status };
    info_content = 
        <div>
               <h2>Data Sources and methods</h2>
               <h4><br/>&bull; ABOUT THE GROWING DEGREE DAY CALCULATOR</h4>
               <p>
               This tool plots Growing Degree Days (GDD), also called Growing Degree Units (GDUs), which measure heat accumulation in order to predict plant and insect development. In a stress-free environment, the development rate of a plant is dependent on temperature. Using the expected temperature of the summer season, based on previous years, this tool can help predict the best days to plant, harvest, and fertilize.
               </p>
               <p>
               GDDs are calculated by taking the average of the daily maximum and minimum air temperature, and then subtracting a base temperature. The base temperature is the lowest temperature at which a crop will grow.
               </p>
               <h4><br/>&bull; COMMON BASE TEMPERATURES USED FOR GDD CALCULATION</h4>
               <p>
               50°F is the most common base for GDD calculations. However, a number of other bases are used depending on the lifecycle of the plant or insect of interest. Here is a small sample:
               </p>
               <ul>
               <i>Plants</i>
                   <li>50°F : corn, sorghum, soybeans, tomato</li>
                   <li>46°F : sunflower, potato</li>
                   <li>42°F : wheat, barley, rye, oats, flaxseed, lettuce, asparagus</li>
               </ul>
               <ul>
               <i>Insects and Diseases</i>
                   <li>52°F : Green Cloverworm</li>
                   <li>50°F : Codling moth, Apple maggot</li>
                   <li>48°F : Alfalfa weevil</li>
                   <li>45°F : Corn rootworm, Oriental fruit moth</li>
                   <li>43°F : Stalk Borer</li>
                   <li>40°F : Onion maggot</li>
                   <li>39°F : Cabbage maggot</li>
                   <li>32°F : Apple scab</li>
               </ul>
               <h4>&bull; AIR TEMPERATURE DATA</h4>
               <p>
               The 2.5 x 2.5 mile gridded dataset of maximum and minimum air temperatures is produced daily for the Northeast United States by the <a href="http://www.nrcc.cornell.edu" target="_blank" rel="noopener noreferrer">Northeast Regional Climate Center</a>, using methods described in Degaetano and Belcher (2007). These data are available for use through the Applied Climate Information System (<a href="http://www.rcc-acis.org" target="_blank" rel="noopener noreferrer">ACIS</a>) web service.
               </p>
               <p>
               Degaetano, A.T. and B.N. Belcher. (2007). Spatial Interpolation of Daily Maximum and Minimum Air Temperature Based on Meteorological Model Analyses and Independent Observations. Journal of Applied Meteorology and Climatology. 46.
               </p>
               <h4>&bull; FORECASTS AND OUTLOOKS</h4>
               <p>
               Six-day forecasts of daily temperature extremes obtained through the National Weather Service's National Digital Forecast Database (Glahn and Ruth, 2003) provide the means to produce 6-day GDD forecasts.
               </p>
               <p>
               Seasonal outlooks are produced based on historical observations over recent decades. Minimum, maximum and average observed GDD accumulation over previous seasons provide expected guidelines and reference points based on what has occurred at a specific location in the past. 
               </p>
               <p>
               Glahn, H. R., and D. P. Ruth, 2003: The new digital forecast database of the National Weather Service. Bull. Amer. Meteor. Soc., 84, 195–201.
               </p>
        </div>;

    // -----------------------------------------------------------------------------------
    // Get the most recent selectable year -----------------------------------------------
    // New seasons will start on Mar 1. Until then, the previous season is active. ----
    // -----------------------------------------------------------------------------------
    @computed get latestSelectableYear() {
        let thisMonth = moment().month();
        let thisYear = moment().year();
        if (thisMonth===0 || thisMonth===1) {
            return thisYear-1
        } else {
            return thisYear
        }
    };

    // -----------------------------------------------------------------------------------
    // Planting Date Picker --------------------------------------------------------------
    // For Components: PlantingDatePicker ------------------------------------------------
    // -----------------------------------------------------------------------------------
    @observable planting_date = moment('01/01/'+this.latestSelectableYear.toString(),'MM/DD/YYYY');
    @action initPlantingDate = () => {
        let current_year = moment().year()
        this.updatePlantingDate( moment('01/01/'+current_year.toString(),'MM/DD/YYYY') );
    };
    @action updatePlantingDate = (v) => {
      this.planting_date = v
      let selected_year = v.format('YYYY')
      // if planting year is the same as latest year, allow saving of user settings
      if (selected_year === this.latestSelectableYear.toString()) {
          // update the saved planting date
          let locations = this.manage_local_storage("read","locations");
          let selected_id = this.manage_local_storage("read","selected");
          locations[selected_id]['planting_date']=v.format('MM/DD/YYYY');
          this.manage_local_storage("write","locations",locations);
          this.updateSavedLocations()
          // update GDD base and target back to user-saved settings for current growing season
          if (locations[selected_id].hasOwnProperty('gdd_base')) {
              if (this.getGddBase!==locations[selected_id]['gdd_base']) { this.updateGddBase({value: locations[selected_id]['gdd_base']}) };
          } else {
              if (this.getGddBase!=='50') { this.updateGddBase({value:'50'}) };
          }
          if (locations[selected_id].hasOwnProperty('gdd_target')) {
              if (this.getGddTarget!==locations[selected_id]['gdd_target']) { this.onChangeGddTarget(locations[selected_id]['gdd_target']) };
          } else {
              //if (this.getGddTarget!=='1500') { this.onChangeGddTarget({value:'1500'}) };
              if (this.getGddTarget!=='1500') { this.onChangeGddTarget('1500') };
          }
      }
      //this.updatePlantingYear(v.format('YYYY'))
      this.downloadData()
    };
    @computed get getPlantingDate() {
      return this.planting_date
    };
    @computed get getPlantingDateForDataRequest() {
      return this.getPlantingDate.format('YYYY-MM-DD')
    };

    @computed get getPlantingYear() {
      return this.getPlantingDate.format('YYYY')
    };
    //@observable planting_year = this.getPlantingDate.format('YYYY');
    //@action updatePlantingYear = (y) => {
    //    if (this.planting_year !== y) {
    //        this.planting_year = y
    //        //this.downloadData()
    //    }
    //}
    //@computed get getPlantingYear() {
    //  return this.planting_year
    //};

    // -----------------------------------------------------------------------------------
    // Gdd threshold selection -----------------------------------------------------------
    // For Components: GddRadioSelect --------------------------------------------------
    // -----------------------------------------------------------------------------------
    //@observable gdd_threshold='gdd50';
    //@action updateGddType = (changeEvent) => {
    //        console.log(changeEvent.target.value);
    //        this.gdd_threshold = changeEvent.target.value
    //    }
    //@computed get getGddType() {
    //    return this.gdd_threshold
    //}

    // -----------------------------------------------------------------------------------
    // Gdd base selection ----------------------------------------------------------------
    // For Components: GddBaseSelect -----------------------------------------------------
    // -----------------------------------------------------------------------------------
    @observable gdd_base='50';
    @action updateGddBase = (v) => {
            this.gdd_base = v.value
            // if planting year is the same as latest year, allow saving of user settings
            if (this.getPlantingYear === this.latestSelectableYear.toString()) {
                let locations = this.manage_local_storage("read","locations");
                let selected_id = this.manage_local_storage("read","selected");
                locations[selected_id]['gdd_base']=v.value;
                this.manage_local_storage("write","locations",locations);
                this.updateSavedLocations()
            }
            this.downloadData()
        }
    @computed get getGddBase() {
        return this.gdd_base
    }

    @observable isMethod8650=false;
    @action setIsMethod8650 = () => {
        this.isMethod8650 = !this.isMethod8650
        this.downloadData()
    }
    @computed get getIsMethod8650() {
        return this.isMethod8650
    }

    // -----------------------------------------------------------------------------------
    // Gdd target selection ----------------------------------------------------------------
    // For Components: GddTargetSelect -----------------------------------------------------
    // -----------------------------------------------------------------------------------
    @observable targetIsEnabled=false;
    @action setTargetIsEnabled = () => {
            this.targetIsEnabled=!this.targetIsEnabled
        }
    @computed get getTargetIsEnabled() {
        return this.targetIsEnabled
    }

    @observable gdd_target=1500;
    @observable gdd_target_track_keystroke=null;
    @action onChangeGddTarget = (v) => {
            //this.gdd_target = e.target.value;
            this.gdd_target = v;
            // if planting year is the same as latest year, allow saving of user settings
            if (this.getPlantingYear === this.latestSelectableYear.toString()) {
                let locations = this.manage_local_storage("read","locations");
                let selected_id = this.manage_local_storage("read","selected");
                locations[selected_id]['gdd_target']=v;
                this.manage_local_storage("write","locations",locations);
                this.updateSavedLocations()
            }
            //console.log(this.getGddTargetTrackKeystroke);
            //console.log(this.getGddTarget);
        }
    @action onChangeGddTargetTrackKeystroke = (e) => {
            this.gdd_target_track_keystroke = e.target.value
            //console.log(this.getGddTargetTrackKeystroke);
            //console.log(this.getGddTarget);
        }
    @action onSubmitGddTarget = (e) => {
            //this.gdd_target = this.getGddTargetTrackKeystroke;
            //console.log(this.getGddTargetTrackKeystroke);
            //console.log(this.getGddTarget);
            e.preventDefault();
        }
    @computed get getGddTarget() {
        return this.gdd_target
    }
    @computed get getGddTargetTrackKeystroke() {
        return this.gdd_target_track_keystroke
    }

    // -----------------------------------------------------------------------------------
    // Location Picker -------------------------------------------------------------------
    // For Components: LocationPicker ----------------------------------------------------
    // -----------------------------------------------------------------------------------
    map_dialog=null;
    manage_local_storage=null;

    // Location ID -------------------------------------------
    @observable location_id='default';
    @action updateLocationId = (i) => {
            this.location_id = i;
        }
    @computed get getLocationId() {
            return this.location_id
        }

    // Location coordinates ----------------------------------
    @observable lat='42.45';
    @observable lon='-76.48';
    @action updateLocation = (lt,ln) => {
            if ((this.getLat !== lt) || (this.getLon!==ln)) {
                this.lat = lt;
                this.lon = ln;
                if (this.getPlantingYear !== this.latestSelectableYear.toString()) { this.downloadData() }
            }
        }
    @computed get getLat() {
            return this.lat
        }
    @computed get getLon() {
            return this.lon
        }

    // Location address --------------------------------------
    @observable address='Cornell University, Ithaca, NY';
    @action updateAddress = (a) => {
            this.address = a;
        }
    @computed get getAddress() {
            return this.address
        }


    // Location default --------------------------------------
    @observable default_location;
    @action updateDefaultLocation = () => {
            this.default_location = {address:this.getAddress, lat:parseFloat(this.getLat), lng:parseFloat(this.getLon), id:this.getLocationId};
        }
    @computed get getDefaultLocation() {
            return this.default_location
        }


    // Initialize the local storage manager
    @action initStorageManager = (namespace) => {
        //console.log('initStorageManager');
        let storage_options = {
            namespace: namespace,
            expireDays: 3650
        }
        jQuery().CsfToolManageLocalStorage(storage_options);
        this.manage_local_storage = jQuery().CsfToolManageLocalStorage();
        this.manage_local_storage("init");
    }

    // Initialize the location state
    @action initLocationState = () => {
        //console.log('initLocationState');
        let selected_id = this.manage_local_storage("read","selected");
        let locations = this.manage_local_storage("read","locations");
        let loc_obj = null;
        if (locations !== undefined) {
            loc_obj = locations[selected_id]
        } else {
            loc_obj = null
        }
        this.updateDefaultLocation();
        if (loc_obj) {
            this.updateLocationId(loc_obj.id);
            this.updateAddress(loc_obj.address);
            this.updateLocation(loc_obj.lat.toString(),loc_obj.lng.toString());

            if (locations[loc_obj.id].hasOwnProperty('planting_date')) {
                // make sure saved value is for current season. If it is not, reset to default value
                if (locations[loc_obj.id]['planting_date'].slice(-4) === this.latestSelectableYear.toString()) {
                    this.updatePlantingDate(moment(locations[loc_obj.id]['planting_date'],'MM/DD/YYYY'));
                } else {
                    this.updatePlantingDate(moment('01/01/'+this.latestSelectableYear,'MM/DD/YYYY'));
                }
            } else {
                this.updatePlantingDate(moment('01/01/'+this.latestSelectableYear,'MM/DD/YYYY'));
            }

            if (locations[loc_obj.id].hasOwnProperty('gdd_base')) {
                // make sure saved value is for current season. If it is not, reset to default value
                if (this.getPlantingYear === this.latestSelectableYear.toString()) {
                    this.updateGddBase({value: locations[loc_obj.id]['gdd_base']});
                } else {
                    this.updateGddBase({value:'50'});
                }
            } else {
                this.updateGddBase({value:'50'});
            }

            if (locations[loc_obj.id].hasOwnProperty('gdd_target')) {
                // make sure saved value is for current season. If it is not, reset to default value
                if (this.getPlantingYear === this.latestSelectableYear.toString()) {
                    this.onChangeGddTarget(locations[loc_obj.id]['gdd_target']);
                } else {
                    this.onChangeGddTarget('1500');
                }
            } else {
                this.onChangeGddTarget('1500');
            }

            // initial download of data
            if (loc_obj.id === this.default_location.id) { this.downloadData() }
        } else {
            this.updateLocationId(this.default_location.id);
            this.updateAddress(this.default_location.address);
            this.updateLocation(this.default_location.lat.toString(),this.default_location.lng.toString());
            // WRITE DEFAULT LOCATION IF NO LOCATIONS EXIST
            this.manage_local_storage("write","locations",{default: this.default_location});
            this.manage_local_storage("write","selected",this.default_location.id);
            // initial download of data
            this.downloadData()
        }
        this.updateSavedLocations();
        //this.downloadDataForTable(this.getSavedLocations);
    }

    // Initialize the map dialog
    @action initMapDialog = () => {
            //console.log('initMapDialog');
            //var default_location = this.getDefaultLocation
            var default_location = {address:this.getAddress, lat:parseFloat(this.getLat), lng:parseFloat(this.getLon), id:"default"};
            //var options = { width:600, height:500, google:google, default:default_location };
            var options = { width:600, height:500, google:window.google, default:default_location };
            jQuery(".csftool-location-dialog").CsfToolLocationDialog(options);
            this.map_dialog = jQuery(".csftool-location-dialog").CsfToolLocationDialog();
            this.map_dialog("bind", "close", (ev, context) => {
                // get the currently saved locations
                let locations_saved = this.manage_local_storage("read","locations");
                // locations from the location picker
                let locations_from_picker = context.all_locations
                // save new locations into the saved locations
                for (var key in locations_from_picker) {
                    if (locations_from_picker.hasOwnProperty(key)) {
                        if (!(locations_saved.hasOwnProperty(key))) {
                            locations_saved[key] = locations_from_picker[key]
                        }
                    }
                }

                // selected location we get back from location picker
                let loc_obj = context.selected_location;
                this.updateLocationId(loc_obj.id);
                this.updateAddress(loc_obj.address);
                this.updateLocation(loc_obj.lat.toString(),loc_obj.lng.toString());

                // handle user saved value for planting_date, assign default if necessary
                if (locations_saved[loc_obj.id].hasOwnProperty('planting_date')) {
                    // make sure saved value is for current season. If it is not, reset to default value
                    if (locations_saved[loc_obj.id]['planting_date'].slice(-4) !== this.latestSelectableYear.toString()) {
                        locations_saved[loc_obj.id]['planting_date']='01/01/'+this.latestSelectableYear.toString()
                    }
                } else {
                    locations_saved[loc_obj.id]['planting_date']='01/01/'+this.latestSelectableYear.toString()
                }

                // handle user saved value for gdd_base, assign default if necessary
                //if (locations_saved[loc_obj.id].hasOwnProperty('gdd_base')) {
                //    // make sure saved value is for current season. If it is not, reset to default value
                //    if (this.getPlantingYear !== this.latestSelectableYear.toString()) {
                //        locations_saved[loc_obj.id]['gdd_base']='50'
                //    }
                //} else {
                //    locations_saved[loc_obj.id]['gdd_base']='50'
                //}

                // handle user saved value for gdd_target, assign default if necessary
                //if (locations_saved[loc_obj.id].hasOwnProperty('gdd_target')) {
                //    // make sure saved value is for current season. If it is not, reset to default value
                //    if (this.getPlantingYear !== this.latestSelectableYear.toString()) {
                //        locations_saved[loc_obj.id]['gdd_target']='1500'
                //    }
                //} else {
                //    locations_saved[loc_obj.id]['gdd_target']='1500'
                //}

                // handle user saved value for gdd_base, assign default if necessary
                if (!locations_saved[loc_obj.id].hasOwnProperty('gdd_base')) {
                    locations_saved[loc_obj.id]['gdd_base']='50'
                }

                // handle user saved value for gdd_target, assign default if necessary
                if (!locations_saved[loc_obj.id].hasOwnProperty('gdd_target')) {
                    locations_saved[loc_obj.id]['gdd_target']='1500'
                }

                // update the planting date applied to the chart only if user is viewing results for the current year.
                // If the user is viewing historical data from previous years, we do not update the selected planting date on location change.
                if (this.getPlantingYear === this.latestSelectableYear.toString()) {
                        this.updatePlantingDate(moment(locations_saved[loc_obj.id]['planting_date'],'MM/DD/YYYY'));
                }
                this.updateGddBase({value: locations_saved[loc_obj.id]['gdd_base']});
                this.onChangeGddTarget(locations_saved[loc_obj.id]['gdd_target']);

                // WRITE LOCATIONS THE USER HAS SAVED
                this.manage_local_storage("write","locations",locations_saved);
                this.manage_local_storage("write","selected",this.getLocationId);

                // REMOVE LOCATIONS THE USER HAS DELETED
                var idsToDelete = this.manage_local_storage("getExtraKeys", "locations", context.all_locations);
                this.manage_local_storage("delete", "locations", idsToDelete);

                this.updateSavedLocations()

                // when location changes, default to season chart view
                if (this.locationSummaryStatus) {
                    this.updateLocationSummaryStatus(false);
                    this.updateSeasonStatus(true);
                };
            });
        }

    // Open map with all saved locations
    @action openMap = () => {
            let locations = this.manage_local_storage("read","locations");
            let selected_id = this.manage_local_storage("read","selected");
            this.map_dialog("locations", locations);
            this.map_dialog("open", selected_id);
        }

    // Get all saved location information
    @observable saved_locations = null
    @action updateSavedLocations = () => {
            this.saved_locations = this.manage_local_storage("read","locations");
        }
    @computed get getSavedLocations() {
            return this.saved_locations
        }

    @computed get getSelectedID() {
            return this.manage_local_storage("read","selected");
        }

    // -----------------------------------------------------------------------------------
    // Control Loaders (Spinners) --------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Logic for displaying spinner
    @observable loader_data=false;
    @action updateLoaderData = (l) => {
            this.loader_data = l;
        }
    @computed get getLoaderData() {
            return this.loader_data
        }

    // -----------------------------------------------------------------------------------
    // API -------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------

    // store downloaded data
    @observable chart_data = null;
    @action updateChartData = (d) => {
            if (this.getChartData) { this.chart_data = null }
            this.chart_data = d;
        }
    @computed get getChartData() {
            return this.chart_data
        }

    // store downloaded data for summary table
    @observable table_data = null;
    @action updateTableData = (d) => {
            if (this.getTableData) { this.table_data = null }
            this.table_data = d;
        }
    @computed get getTableData() {
            return this.table_data
        }

    @action downloadData = () => {
            if (this.getLoaderData === false) { this.updateLoaderData(true); }
            let base = (this.getGddBase==='50' && this.getIsMethod8650) ? '86/50' : this.getGddBase
            //const url = 'http://tools.climatesmartfarming.org/nedafcst/gdd-data-new/?lat='+this.getLat+'&lon='+this.getLon+'&gdd_base='+base+'&planting_date='+this.getPlantingDateForDataRequest
            const url = 'http://tools.climatesmartfarming.org/gddtool_react_v3/gdd-data/?lat='+this.getLat+'&lon='+this.getLon+'&gdd_base='+base+'&planting_date='+this.getPlantingDateForDataRequest
            jsonp(url, null, (err,data) => {
                if (err) {
                    console.error(err.message);
                    return
                } else {
                    //console.log('DOWNLOADED DATA COMPLETE');
                    this.updateChartData(data);
                    if (this.getLoaderData === true) { this.updateLoaderData(false); }
                    return
                }
            });
        }

    @action downloadDataForTable = (locs) => {
            if (this.getLoaderData === false) { this.updateLoaderData(true); }
            //const url = 'http://tools.climatesmartfarming.org/nedafcst/gdd-data-summary/?locs='+encodeURIComponent(JSON.stringify(locs))
            const url = 'http://tools.climatesmartfarming.org/gddtool_react_v3/gdd-data-summary/?locs='+encodeURIComponent(JSON.stringify(locs))
            jsonp(url, null, (err,data) => {
                if (err) {
                    console.error(err.message);
                    return
                } else {
                    //console.log('DOWNLOADED DATA FOR TABLE COMPLETE');
                    this.updateTableData(data);
                    if (this.getLoaderData === true) { this.updateLoaderData(false); }
                    return
                }
            });
        }

}

