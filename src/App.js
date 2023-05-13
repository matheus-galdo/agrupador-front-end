import './App.css';

import React, { useState } from "react";

import Map from './Components/Map'
import Modal from './Components/Modal';
import Banner from './Components/Banner';

function App() {

  const [showModal, setShowModal] = useState(false)
  const [modalDefaultData, setModalDefaultData] = useState(null)
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
        addNewGroupToGroupList={addNewGroupToGroupList}
        updateGroupInList={updateGroupInList}
        show={showModal}
        close={closeModal}
      />


      <Map
        groups={groups}
        setGroups={setGroups}
        recentGroup={recentGroupOpenedInModal}
        showModalWithSomeData={showModalWithSomeData}
      />

    </main>
  </>
}

export default App;
