import './App.css';

import React from "react";

import Map from './Map'




function App() {
  return <Map
    googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAySiL9ZbhExrMyLD6LZ4XNThqfsMBUuk&v=3.exp&libraries=geometry,drawing,places'}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
}

export default App;
