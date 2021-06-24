import { useEffect, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"
import MarkerDescripton from "../Components/MarkerDescripton"



const Map = (props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    const [center, setCenter] = useState(props.geolocation)
    // const [buildCounter, setBuildCounter] = useState(props.geolocation)


    // const [mapRef, setMapRef] = useState(null);


    // let center = {...props.center} || {...props.geolocation, esse:'acola'}
    let ref = null;
    useEffect(() => {
        // console.log('reccareguei os grupos', props.groups.length, props.groups);
        // setBuildCounter(buildCounter + 1)
    }, [props.groups])

    // useEffect(() => { }, [buildCounter])


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