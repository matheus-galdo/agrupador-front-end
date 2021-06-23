import { useEffect, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"
import MarkerDescripton from "../Components/MarkerDescripton"

const Map = (props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    useEffect(() => {

    }, [])

    return <GoogleMap
        defaultZoom={14}
        defaultCenter={props.geolocation}
    >

        {props.groups.map((group, key) => {
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