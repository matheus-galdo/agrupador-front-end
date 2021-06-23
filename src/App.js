import './App.css';

import React, { useEffect, useState } from "react";

import Map from './Map'


const Modal = ({ show, close, className = null, children = null, geolocation }) => {

  if (!show) return ''

  return <div className={`modal` + (className ? ` ${className}` : "")}>
    <button onClick={close}>X</button>

    <form>
      <fieldset>
        <label htmlFor='group-name'>Nome do grupo</label>
        <input id="group-name" type="text" />
      </fieldset>

      <fieldset>
        <label htmlFor='description'>Descrição</label>
        <input id="description" type="text" />
      </fieldset>

      <fieldset>
        <label htmlFor='url'>Link do convite do grupo</label>
        <input id="url" type="url" />
      </fieldset>

      <button type='submit'>Salvar</button>

    </form>

    {children && children}
  </div>
}

function App() {

  const [showModal, setShowModal] = useState(false)
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })

  useEffect(() => {
    let mounted = true


    if (mounted) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(data => console.log(data));
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
    <main>

      <section className='banner'>
        <h1>AGRUPADOR</h1>
        <p>Encontre grupos de estudo em sua região</p>
      </section>


      <section className='new-group'>
        <Modal geolocation={geolocation} show={showModal} close={closeModal}>aa</Modal>
        <button onClick={() => setShowModal(true)}>+ Adicionar novo grupo</button>
      </section>


      <section className='map-container' style={{ width: '100vw', height: '90vh' }}>
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
