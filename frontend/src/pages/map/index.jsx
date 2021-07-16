import "leaflet/dist/leaflet.css";
import React, {useState, ReactDOM, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import axios from  'axios';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import Leaflet from "leaflet";

import twitterPin from '../../assets/twitterPin.svg';
import './styles.css';
// import RenderedMap from "./renderMap";

function SearchingPage() {
	const history = useHistory();
  const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;
  const initialPos = { center: {lat: -22.2154042, lng: -54.8331331}, zoom: 11};
  const [hashtag, setHashtag] = useState("");
  const [pin, setPin] = useState([]);

  const MapTweetIcon = Leaflet.icon({
    iconUrl: twitterPin,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });
  
  const [location, setLocation] = useState(initialPos);

  function handleLogout() {
		history.push('/');
	}

  async function fetchLocalMap (local) {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${ACCESS_TOKEN_MAP_BOX}`
    )
      .then(response => response.json())
      .then(data => data);

    return response;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(hashtag);
    if (hashtag) {
      const response = await axios.get(
        'http://localhost:4000/tweets',
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
        }
      )
        .then(response => response)
        .then(data => data)

        console.log(response.data.data);
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const newUrl = `${url}${encodeURIComponent(location)}.json?access_token=${process.env.ACCESS_TOKEN_MAP_BOX}`
        const data = response.data.data;
        let resp = []
        data.forEach(element => {
          resp = [...resp, [{ lat: Math.floor((Math.random() * 360) - 180), lgt: Math.floor((Math.random() * 180) - 90)}]]
        })
        console.log(resp);
    }
    setHashtag("");
  }
  function placePins() {
    pin.forEach(element => {
      return <MapTweetIcon position={
        {
          lat: element.lat,
          lng: element.lng
        }
      } />
    })
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Você está aqui</Popup>
      </Marker>
    )
  }

  return (
    <div id="page-map">
      <main>
        <form onSubmit={handleSubmit} className="landing-page-form">
          <fieldset>
            <legend>Faça sua Busca</legend>

            <div className="input-block">
              <label htmlFor="name">Digite a hashtag</label>
              <input
                id="hashtag"
                placeholder="Hashtag"
                value={hashtag}
                onChange={(event) => setHashtag(event.target.value)}
              />
            </div>
          </fieldset>
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
        <div style={{height:'100vh', width: '100vw'}}>
          <MapContainer 
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <placePins />
          </MapContainer>
        </div>
      </main>
    </div>
  );
}


export default SearchingPage;