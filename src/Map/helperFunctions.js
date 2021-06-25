import api from "../service"

const getGroupsNearbyUserLocation = async currentCoords => {
    let result = await api.get(`groups?latitude=${currentCoords.lat}&longitude=${currentCoords.lng}`)
        .then(result => result.data)
        .catch(err => null)
    return result
}

const parseMapsCoords = coordsObject => {
    if (typeof coordsObject.lat === 'function') {
        return { lat: coordsObject.lat(), lng: coordsObject.lng() }
    }

    return { lat: coordsObject.latitude, lng: coordsObject.longitude }
}

export { parseMapsCoords, getGroupsNearbyUserLocation }