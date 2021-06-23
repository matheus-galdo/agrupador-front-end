import './App.css';

import React, { useEffect, useState } from "react";

import Map from './Map'
import Modal from './Components/Modal';
import Banner from './Components/Banner';



function App() {

  const [showModal, setShowModal] = useState(false)
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })

  useEffect(() => {
    let mounted = true


    if (mounted) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(data => setGeolocation({ lat: data.coords.latitude, lng: data.coords.longitude }));
      } else {
        setGeolocation({ message: "Seu navegador não suporta geolocalização" })
      }
    }

    return () => mounted = false
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  return <>
    <main className='page-container'>


      <Banner />

      <section className='new-group'>
        <Modal geolocation={geolocation} show={showModal} close={closeModal}></Modal>
        <button onClick={() => setShowModal(true)}>+ Adicionar novo grupo</button>
      </section>


      <section className='map-container'>
        <Map
          googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAySiL9ZbhExrMyLD6LZ4XNThqfsMBUuk&v=3.exp&libraries=geometry,drawing,places'}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </section>

    </main>
  </>
}

export default App;
