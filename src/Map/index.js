import { useEffect, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"
import MarkerDescripton from "../Components/MarkerDescripton"

const Map = (props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [center, setCenter] = useState(props.geolocation)

    let ref = null;
    useEffect(() => { }, [props.groups])

    const getCenter = (center) => {
        setCenter({ lat: center.lat(), lng: center.lng() })
    }


    return <GoogleMap
        onDragEnd={() => props.getGroups(center)}
        defaultZoom={14}
        defaultCenter={props.geolocation}
        onCenterChanged={() => getCenter(ref.getCenter())}
        ref={mapRef => ref = mapRef}
    >


        {props.groups[0] && props.groups.map((group, key) => {
            return <Marker
                key={key}
                onClick={() => setSelectedGroup(group)}
                position={{ lat: group.latitude, lng: group.longitude }}
            >

                {selectedGroup && <>
                    {group.id === selectedGroup.id &&
                        <InfoWindow onCloseClick={() => setSelectedGroup(null)}>
                            <MarkerDescripton group={group} />
                        </InfoWindow>
                    }
                </>}

            </Marker>
        })}
    </GoogleMap >
}


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap