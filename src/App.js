import './App.css';

import React, { useEffect, useState } from "react";

import Map, {WrappedMap} from './Map'
import Modal from './Components/Modal';
import Banner from './Components/Banner';
import api from './service';
import useGeolocation from './Hooks/useGeolocation';




function App() {

  const [showModal, setShowModal] = useState(false)
  const [modalDefaultData, setModalDefaultData] = useState(null)

  const userGeolocation = useGeolocation()

  const [groups, setGroups] = useState([null])

  const [recentGroupOpenedInModal, setRecentGroupOpenedInModal] = useState(null)


  //do modal
  const addNewGroupToGroupList = newGroup => {
    setGroups([...groups, newGroup])
    setRecentGroupOpenedInModal(newGroup)
  }

  const updateGroupInList = updatedGroup => {
    setRecentGroupOpenedInModal(updatedGroup)
    let groupIndex = groups.indexOf(groups.find(groupItem => groupItem.id === updatedGroup.id))
    let splicedGroups = [...groups]
    splicedGroups.splice(groupIndex, 1, updatedGroup)
    setGroups(splicedGroups)
  }

  //==================


  const closeModal = () => {
    setModalDefaultData(null)
    setShowModal(false)
  }

  const showModalWithSomeData = data => {
    setShowModal(true)
    setModalDefaultData(data)
  }


  return <>
    <main className='page-container'>

      <Banner />

      <Modal
        defaultData={modalDefaultData}
        setModalDefaultData={setModalDefaultData}

        geolocation={userGeolocation}
        addNewGroupToGroupList={addNewGroupToGroupList}
        updateGroupInList={updateGroupInList}
        show={showModal}
        close={closeModal}
      />


      {/* <section className='map-container'> */}
        {/* <WrappedMap
          deleteGroup={deleteGroup}
          center={center}
          recentGroup={recentGroup}
          getGroups={getGroups}
          geolocation={userGeolocation}
          groups={groups}
          googleMapURL={MAPS_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          showModalWithSomeData={showModalWithSomeData}
        /> */}
      {/* </section> */}

      Mapa certo e5e3df
      <Map
          groups={groups}
          setGroups={setGroups}

          recentGroup={recentGroupOpenedInModal}
          geolocation={userGeolocation}


          showModalWithSomeData={showModalWithSomeData}
        />
    </main>
  </>
}

export default App;
