import { useEffect, useRef, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"
import MarkerDescripton from "../Components/MarkerDescripton"
import NewMarker from "../Components/NewMarker"

import BluePinMarker from '../assets/img/blue-pin-dark-maps.svg'
import api from "../service"

const fakerCoords = {}

const Map = withGoogleMap((props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [center, setCenter] = useState(props.geolocation)

    const [tempMarker, setTempMarker] = useState(fakerCoords)
    const [showTempMarkerDetails, setShowTempMarkerDetails] = useState(false)


    let ref = null;

    useEffect(() => {
        setShowTempMarkerDetails(false)
        setTempMarker(fakerCoords)
        if (props.recentGroup) setSelectedGroup(props.recentGroup)
    }, [props.groups, props.recentGroup])


    useEffect(() => {

    }, [tempMarker, showTempMarkerDetails])


    const getCenter = (center) => {
        setCenter({ lat: center.lat(), lng: center.lng() })
    }

    const addMarker = ({ ...eventData }) => {
        setSelectedGroup(null)
        setShowTempMarkerDetails(true)
        setTempMarker(eventData.latLng)
    }

    const selectGroup = group => {
        setShowTempMarkerDetails(false)
        setTempMarker(fakerCoords)
        setSelectedGroup(group)
    }

    // console.log('rebuildei', props.groups);

    return <GoogleMap
        onDragEnd={() => props.getGroups(center)}
        defaultZoom={14}
        defaultCenter={props.geolocation}
        onCenterChanged={() => getCenter(ref.getCenter())}
        ref={mapRef => ref = mapRef}
        onClick={addMarker}
    >
        {props.groups[0] && props.groups.map((group, key) => {
            return <Marker
                key={key}
                onClick={() => selectGroup(group)}
                position={{ lat: group.latitude, lng: group.longitude }}
                draggable={true}
                onDrag={e => {
                    console.log(e);
                }}

            >

                {selectedGroup && <>
                    {group.id === selectedGroup.id &&
                        <InfoWindow onCloseClick={() => setSelectedGroup(null)}>
                            <MarkerDescripton deleteGroup={props.deleteGroup} group={group} showModalWithSomeData={props.showModalWithSomeData} />
                        </InfoWindow>
                    }
                </>}

            </Marker>
        })}

        {tempMarker && <Marker
            onClick={() => setShowTempMarkerDetails(true)}
            position={tempMarker}
            draggable={true}
            onDragEnd={addMarker}
            icon={BluePinMarker}

        >
            {showTempMarkerDetails && <InfoWindow onCloseClick={() => setShowTempMarkerDetails(false)}>
                <NewMarker coords={tempMarker} showModalWithSomeData={props.showModalWithSomeData} />
            </InfoWindow>}
        </Marker>}
    </GoogleMap >
})


const WrappedMap = withScriptjs(Map)


const MapContainer = ({geolocation, googleMapURL, ...props}) => {

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

    return <section className='map-container'>
        <Map
            // deleteGroup={deleteGroup}
            // center={center}
            // recentGroup={recentGroup}
            // getGroups={getGroups}
            geolocation={geolocation}
            groups={groups}
            googleMapURL={googleMapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            // showModalWithSomeData={showModalWithSomeData}
        />
    </section>
}

export default WrappedMap