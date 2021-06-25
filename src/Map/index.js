import { useEffect, useState } from "react"
import { withScriptjs } from "react-google-maps"
import { ImWarning } from 'react-icons/im'

import { parseMapsCoords, getGroupsNearbyUserLocation } from './helperFunctions'
import useGeolocation from "../Hooks/useGeolocation"
import api from "../service"
import Map from "./Map"
import './map.css'

const MAPS_KEY = process.env.REACT_APP_MAPS_API_KEY || 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`

let WrappedMap = withScriptjs(Map)

const MapContainer = ({ groups, setGroups, recentGroup, showModalWithSomeData, ...props }) => {

    const [center, setCenter] = useState(null)
    const userGeolocation = useGeolocation()

    useEffect(() => {
        let mounted = true

        console.log('req');
        const fetchGroups = async () => {
            let initialGroupsNearby = await getGroupsNearbyUserLocation(userGeolocation)
            if (initialGroupsNearby) setGroups(initialGroupsNearby)
        }

        if (mounted && userGeolocation.lat) fetchGroups()

        return () => mounted = false
    }, [userGeolocation, setGroups])


    const deleteGroup = group => {
        api.delete(`groups/${group.id}`).then(result => {

            //memoiza um novo mapa com os markers atuais
            WrappedMap = withScriptjs(Map)

            let groupIndex = groups.indexOf(groups.find(groupItem => groupItem.id === group.id))
            let splicedGroups = [...groups]
            let deletedGroup = splicedGroups.splice(groupIndex, 1)

            setCenter(parseMapsCoords(deletedGroup[0]))
            setGroups(splicedGroups)
        })
    }


    const getGroups = async (centerCoords) => {
        centerCoords = parseMapsCoords(centerCoords)
        setCenter(centerCoords)
        let loadedGroups = await getGroupsNearbyUserLocation(centerCoords)
        let newGroups = loadedGroups.filter(newGroup => typeof groups.find(group => group.id === newGroup.id) === 'undefined')
        setGroups([...groups, ...newGroups])
    }


    return <section className='map-container'>
        {userGeolocation.lat ?
            <WrappedMap
                deleteGroup={deleteGroup}
                recentGroup={recentGroup}
                getGroups={getGroups}
                geolocation={center || userGeolocation}
                groups={groups}
                googleMapURL={MAPS_URL}

                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                showModalWithSomeData={showModalWithSomeData}
            />

            : <div className='coords-not-seeted'>
                <ImWarning />
                <p>Você precisa permitir o uso da localização para visualizar o mapa</p>
            </div>
        }
    </section>
}

export default MapContainer