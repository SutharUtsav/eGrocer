import React, { useRef,useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

const library = ['places'];

const GeoLocation = (props) => {
    const inputRef = useRef();

    const [location, setlocation] = useState()


    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            props.deliveryRef.current.click();
            props.setlocation({
                formatted_address: place.formatted_address,
                loaded: true,
                coordinates: {
                    lattitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }
            })
        }
    }

    const onSuccess = (location) => {
        setlocation(location.coords)
        // const geocoder = new window.google.maps.Geocoder();

        // geocoder.geocode({
        //     location: {
        //         lat: location.coords.latitude,
        //         lng: location.coords.longitude
        //     }
        // }).then((response) => {
        //     props.setlocation({
        //         formatted_address: response.results[0].formatted_address,
        //         loaded: true,
        //         coordinates: {
        //             lattitude: location.coords.lattitude,
        //             longitude: location.coords.longitude
        //         }
        //     })
        // }).catch((error) => {
        //     console.log("error:", error)
        // })
    }

    const onError = (error) => {
        props.setlocation({
            city: "",
            loaded: "true",
            error
        })
    }

    const handleCurrentlocation = () => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not Permitted"
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    return (
        <div className="dropdown-menu" aria-labelledby={props.labelby} style={{ width: "17pc" }}>
            
                {/* Current location modal trigger */}
                <button className='btn btn-outline-dark border-0 rounded-0 w-100' onClick={handleCurrentlocation} data-bs-toggle="modal" data-bs-target="#currentlocation">
                    <i className="bi bi-geo p-2"></i>Use my current location
                </button>

                {/* Current location Modal */}
                <div className="modal fade" id="currentlocation" tabIndex="-1" role="dialog" aria-labelledby="currentlocationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" style={{ backgroundColor: "teal" }}>
                            <div className="modal-body">
                            <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                {JSON.stringify(location)}
                            </div>
                            
                        </div>
                    </div>
                </div>

            <div className="dropdown-divider"></div>
            <div className='p-2'>

                <LoadScript googleMapsApiKey={props.google_place_api_key} libraries={library}>
                    <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <input type="text" className='form-control' placeholder='Enter location manually' />
                    </StandaloneSearchBox>
                </LoadScript>
            </div>
        </div>
    )
}

export default GeoLocation
