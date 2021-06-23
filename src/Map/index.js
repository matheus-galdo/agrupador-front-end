import { useEffect, useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"

const Map = (props) => {

    const [selectedGroup, setSelectedGroup] = useState(null)
    useEffect(() => {

    }, [])

    console.log(props);

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
                        < InfoWindow >
                            <>{group.name}</>
                        </InfoWindow>
                    }
                </>}

            </Marker>
        })}
    </GoogleMap >
}


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap