import { useEffect, useState } from "react"
import { GoogleMap, Marker, withGoogleMap, InfoWindow } from "react-google-maps"

import MarkerDescripton from "../Components/MarkerDescripton"
import NewMarker from "../Components/NewMarker"
import BluePinMarker from '../assets/img/blue-pin-dark-maps.svg'
import { parseMapsCoords } from './helperFunctions'

const fakerCoords = {}

/**
 * Map main component
 * @param {*} param0 
 * @returns Marker
 */
const Map = withGoogleMap(({geolocation, recentGroup, groups, deleteGroup, showModalWithSomeData, getGroups}) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [center, setCenter] = useState(geolocation)

    const [tempMarker, setTempMarker] = useState(fakerCoords)
    const [showTempMarkerDetails, setShowTempMarkerDetails] = useState(false)

    let googleMapRef = null;

    useEffect(() => {
        setShowTempMarkerDetails(false)
        setTempMarker(fakerCoords)
        if (recentGroup) setSelectedGroup(recentGroup)
    }, [groups, recentGroup])


    const updateMapCenter = (center) => {
        setCenter(parseMapsCoords(center))
    }

    const addTempMarker = ({ ...eventData }) => {
        setSelectedGroup(null)
        setShowTempMarkerDetails(true)
        setTempMarker(eventData.latLng)
    }

    const selectGroup = group => {
        setShowTempMarkerDetails(false)
        setTempMarker(fakerCoords)
        setSelectedGroup(group)
    }


    return <GoogleMap
        onDragEnd={() => getGroups(googleMapRef.getCenter())}
        defaultZoom={14}
        defaultCenter={center}
        onCenterChanged={() => updateMapCenter(googleMapRef.getCenter())}
        ref={mapRef => googleMapRef = mapRef}
        onClick={addTempMarker}
    >
        {groups[0] !== null && groups.map((group, key) =>
            <GroupMarker
                key={key}
                onClick={() => selectGroup(group)}
                setSelectedGroup={setSelectedGroup}
                selectedGroup={selectedGroup}
                group={group}
                deleteGroup={deleteGroup}
                showModal={showModalWithSomeData}
            />
        )}

        <TempMarker
            setShowTempMarkerDetails={setShowTempMarkerDetails}
            showTempMarkerDetails={showTempMarkerDetails}
            position={tempMarker}
            onDragEnd={addTempMarker}
            showModalWithSomeData={showModalWithSomeData}
        />

    </GoogleMap >
})


/**
 * Marker used to render a group information
 * @param {*} param0 
 * @returns Marker
 */

const GroupMarker = ({ group, onClick, setSelectedGroup, selectedGroup, deleteGroup, showModal }) => {

    return <Marker
        key={group.id}
        onClick={onClick}
        position={parseMapsCoords(group)}
        draggable={true}
        onDrag={e => {
            console.log(e);
        }}
    >

        {selectedGroup && <>
            {group.id === selectedGroup.id &&
                <InfoWindow onCloseClick={() => setSelectedGroup(null)}>
                    <MarkerDescripton deleteGroup={deleteGroup} group={group} showModalWithSomeData={showModal} />
                </InfoWindow>
            }
        </>}
    </Marker>
}


/**
 * Temporary marker used to crate a new group
 * @param {*} param0 
 * @returns 
 */
const TempMarker = ({ setShowTempMarkerDetails, showTempMarkerDetails, position, onDragEnd, showModalWithSomeData }) => {

    return <Marker
        onClick={() => setShowTempMarkerDetails(true)}
        position={position}
        draggable={true}
        onDragEnd={onDragEnd}
        icon={BluePinMarker}
    >
        {showTempMarkerDetails && <InfoWindow onCloseClick={() => setShowTempMarkerDetails(false)}>
            <NewMarker coords={position} showModalWithSomeData={showModalWithSomeData} />
        </InfoWindow>}
    </Marker>
}

export default Map