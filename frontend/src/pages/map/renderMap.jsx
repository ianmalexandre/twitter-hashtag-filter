import React, { PureComponent } from 'react';
import Leaflet from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import twitterPin from '../../assets/twitterPin.svg';

class ReactLeafletMap extends PureComponent {
  getStyle(feature) {
    return {
        fillColor: '#ece7f2',
        weight: 2,
        opacity: 1,
        color: 'blue',
        dashArray: '3',
        fillOpacity: 0.7
    }
  }
  
  render() {

    return (
      <div className="map">
        <MapContainer center={[52.499219, 13.425416]} zoom={8} className="map__reactleaflet">
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          />
        </MapContainer>
      </div>
    );
  }
}

export default ReactLeafletMap;