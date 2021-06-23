import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"

const Map = (props) => {

    return <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -23.7780796, lng: -46.848523512 }}
    >
        <Marker onClick={() => console.log('1')} position={{ lat: -23.7780796, lng: -46.848523512 }}>

            <InfoWindow >
                <>detalhes</>
            </InfoWindow>
        </Marker>
        <Marker onClick={() => console.log('2')} position={{ lat: -24.7780796, lng: -46.848523512 }}>
            <InfoWindow
            // position={{ lat: -25.7780796, lng: -46.848523512 }}
            ><>detalhes</></InfoWindow>
        </Marker>



    </GoogleMap>
}


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap