import './App.css';

import React, { useEffect, useState } from "react";

import Map from './Map'
import Modal from './Components/Modal';
import Banner from './Components/Banner';
import api from './service';

const MAPS_KEY = process.env.REACT_APP_MAPS_API_KEY || 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`


function App() {

  const [showModal, setShowModal] = useState(false)
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })
  const [center, setCenter] = useState(null)
  const [groups, setGroups] = useState([null])
  
  useEffect(() => {
    let mounted = true

    if (groups[0] === null && geolocation.lat) {
      api.get(`groups?latitude=${geolocation.lat}&longitude=${geolocation.lng}`).then(result => {
        if (mounted) setGroups(result.data)
      })
    }

    return () => mounted = false
  }, [groups, geolocation])


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


  const getGroups = centerCoords => {
    setCenter(centerCoords)
    api.get(`groups?latitude=${centerCoords.lat}&longitude=${centerCoords.lng}`).then(result => {
      let newGroups = result.data.filter(newGroup => typeof groups.find(group => group.id === newGroup.id) === 'undefined')
      setGroups([...groups, ...newGroups])
    })
  }

  const addNewGroupToGroupList = newGroup => {
    setGroups([...groups, newGroup])
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return <>
    <main className='page-container'>
      
      <Banner />

      <section className='new-group'>
        <Modal geolocation={geolocation} updateGroupsList={addNewGroupToGroupList} show={showModal} close={closeModal}></Modal>
        <button className='add-group-btn' onClick={() => setShowModal(true)}>+ Adicionar novo grupo</button>
      </section>


      <section className='map-container'>
        <Map
          center={center}
          getGroups={getGroups}
          geolocation={geolocation}
          groups={groups}
          googleMapURL={MAPS_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </section>

    </main>
  </>
}

export default App;
