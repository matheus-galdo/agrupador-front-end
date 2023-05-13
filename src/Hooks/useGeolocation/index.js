import { useEffect, useState } from "react";

function useGeolocation() {

  // const [geolocation, setGeolocation] = useState({ lat: -23.551259, lng: -46.633398 })
  const [geolocation, setGeolocation] = useState({ lat: null, lng: null })

  useEffect(() => {
    let mounted = true

    //get geolocation
    if (mounted) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(data => {

          if (data.coords.latitude !== geolocation.lat && data.coords.longitude !== geolocation.lng) {
            setGeolocation({ lat: data.coords.latitude, lng: data.coords.longitude })
          }
          
        });
      } else {
        setGeolocation({ message: "Seu navegador não suporta geolocalização" })
      }
    }

    return () => mounted = false
  }, [geolocation])

  return geolocation
}

export default useGeolocation