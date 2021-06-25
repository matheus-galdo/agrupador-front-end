import { useCallback, useEffect, useRef, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"
import MarkerDescripton from "../Components/MarkerDescripton"
import NewMarker from "../Components/NewMarker"

import BluePinMarker from '../assets/img/blue-pin-dark-maps.svg'
import api from "../service"

const fakerCoords = {}

const MAPS_KEY = process.env.REACT_APP_MAPS_API_KEY || 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`

const Map = withGoogleMap((props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [center, setCenter] = useState(props.geolocation)

    const [tempMarker, setTempMarker] = useState(fakerCoords)
    const [showTempMarkerDetails, setShowTempMarkerDetails] = useState(false)


    // console.log('center', center, props.geolocation);
    let ref = null;


    // useEffect

    useEffect(() => {
        setShowTempMarkerDetails(false)
        setTempMarker(fakerCoords)
        if (props.recentGroup) setSelectedGroup(props.recentGroup)
    }, [props.groups, props.recentGroup])


    // useEffect(() => {
    //     setCenter(props.geolocation)
    // }, [props.geolocation])

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


    return <GoogleMap
        onDragEnd={() => props.getGroups(ref.getCenter())}
        defaultZoom={14}
        defaultCenter={center}
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








const MapContainer = ({ geolocation, groups, setGroups, showModalWithSomeData, ...props }) => {

    const [center, setCenter] = useState(null)
    const [recentGroup, setRecentGroup] = useState(null)


    console.log('yuhuuu');


    const getGroupsNearbyUserLocation = useCallback(async currentCoords => {

        let result = await api.get(`groups?latitude=${currentCoords.lat}&longitude=${currentCoords.lng}`)
            .then(result => result.data)
            .catch(err => null)

        return result
    }, [])

    // console.log('new render', groups, geolocation);


    //get groups nearby user location
    useEffect(() => {
        let mounted = true

        const fetchGroups = async () => {
            let initialGroupsNearby = await getGroupsNearbyUserLocation(geolocation)
            if (initialGroupsNearby) setGroups(initialGroupsNearby)
        }

        if (mounted && geolocation.lat) {
            fetchGroups()
        }

        return () => mounted = false
    }, [geolocation, getGroupsNearbyUserLocation, setGroups])


    const deleteGroup = group => {
        api.delete(`groups/${group.id}`).then(result => {
            let groupIndex = groups.indexOf(groups.find(groupItem => groupItem.id === group.id))
            let splicedGroups = [...groups]
            splicedGroups.splice(groupIndex, 1)
            setGroups(splicedGroups)
        })
    }

    const getGroups = async (centerCoords) => {
        console.log('oi eu');
        console.log('current coords', centerCoords);

        centerCoords = { lat: centerCoords.lat(), lng: centerCoords.lng() }

        setCenter(centerCoords)

        let loadedGroups = await getGroupsNearbyUserLocation(centerCoords)
        let newGroups = loadedGroups.filter(newGroup => typeof groups.find(group => group.id === newGroup.id) === 'undefined')
        setGroups([...groups, ...newGroups])
    }

    const addNewGroupToGroupList = newGroup => {
        setGroups([...groups, newGroup])
        setRecentGroup(newGroup)
    }

    const updateGroupInList = updatedGroup => {
        setRecentGroup(updatedGroup)
        let groupIndex = groups.indexOf(groups.find(groupItem => groupItem.id === updatedGroup.id))
        let splicedGroups = [...groups]
        splicedGroups.splice(groupIndex, 1, updatedGroup)
        setGroups(splicedGroups)
    }


    // useEffect(() => {
    //     let mounted = true

    //     if (groups[0] === null && geolocation.lat) {
    //         getGroupsNearbyUserLocation(geolocation)


    //         // api.get(`groups?latitude=${geolocation.lat}&longitude=${geolocation.lng}`).then(result => {
    //         //     if (mounted) setGroups(result.data)
    //         // })
    //     }

    //     return () => mounted = false
    // }, [groups, geolocation, getGroupsNearbyUserLocation])




    return <section className='map-container'>
        {geolocation.lat ?
            <WrappedMap
                deleteGroup={deleteGroup}
                center={center}
                recentGroup={recentGroup}
                getGroups={getGroups}
                geolocation={geolocation}
                groups={groups}
                googleMapURL={MAPS_URL}

                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                showModalWithSomeData={showModalWithSomeData}
            />

            : <div className='coords-not-seeted'>
                Você precisa permitir o uso de localização para usar este site
            </div>
        }
    </section>
}
export { WrappedMap }
export default MapContainer