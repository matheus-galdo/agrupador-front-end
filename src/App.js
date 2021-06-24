import './App.css';

import React, { useEffect, useState } from "react";

import Map from './Map'
import Modal from './Components/Modal';
import Banner from './Components/Banner';
import axios from 'axios';


function App() {

  const [showModal, setShowModal] = useState(false)
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })
  const [center, setCenter] = useState(null)
  const [groups, setGroups] = useState([null])


  useEffect(() => {
    let mounted = true

    if (groups[0] === null && geolocation.lat) {
      axios.get(`http://localhost:5000/groups?latitude=${geolocation.lat}&longitude=${geolocation.lng}`).then(result => {
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
    axios.get(`http://localhost:5000/groups?latitude=${centerCoords.lat}&longitude=${centerCoords.lng}`).then(result => {
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
        <button onClick={() => setShowModal(true)}>+ Adicionar novo grupo</button>
      </section>


      <section className='map-container'>
        <Map
          center={center}
          getGroups={getGroups}
          geolocation={geolocation}
          groups={groups}
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
