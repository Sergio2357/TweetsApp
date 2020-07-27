import React from 'react';
import ReactMapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import { PopInfoF, PopInfoB} from './Popupinfo'
import Pins from './Pins';

import '../App.css';

const TOKEN = 'pk.eyJ1IjoiZGFuaWVsamltZW5leiIsImEiOiJjazdtNWo3NzUwZXNhM2ttNTZhcGFjdm9vIn0.8Z5sZNVoYIgruhJ-QMOWZA'

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class EpidemMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        width: 600,
        height: 450,
        latitude: 52.132633,
        longitude: 5.291266,
        zoom: 5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      farmName: null
    };
  };

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onHoverMarker = city => {
    this.setState({popupInfo: city});
  };

  _renderPopup() {
    const {viewport, popupInfo} = this.state;
    const  zoomValue = viewport.zoom
    
    if (zoomValue > 6) {
      return (
        popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.lon}
            latitude={popupInfo.lat}
            closeOnClick={false}
            onClose={() => this.setState({popupInfo: null})}
          >
            <PopInfoB info={popupInfo}/>
          </Popup>
        )
      );
    } else {
      return (
        popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.lon}
            latitude={popupInfo.lat}
            closeOnClick={false}
            onClose={() => this.setState({popupInfo: null})}
          >
            <PopInfoF info={popupInfo}/>
          </Popup>
        )
      );
    }
  } 
   

  render() {
    const {viewport} = this.state;
    const { BARNS, FARMS, onClickMarker, Month } = this.props;
    let FilBARNS = null
    if (Month === null) {
      FilBARNS = BARNS
    } else {
      FilBARNS = BARNS.filter(item => item.month_name === Month);
    }
    return (
      <ReactMapGL
        {...viewport}
        style={{ width: '100%', height: '500px' }}
        mapStyle='mapbox://styles/mapbox/light-v9'
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Pins dataBarns={FilBARNS} dataFarms={FARMS} onHover={this._onHoverMarker} onClick={onClickMarker} zoomValue={viewport.zoom} />

        {this._renderPopup()}

        <div className="bounce" style={geolocateStyle}>
          <GeolocateControl />
        </div>
        <div className="bounce" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="bounce" style={navStyle}>
          <NavigationControl />
        </div>
        <div className="bounce" style={scaleControlStyle}>
          <ScaleControl />
        </div>

      </ReactMapGL>
    );
  }
}