import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import Map from './Map';
import api from '../../api';
import { Spinner } from 'react-bootstrap';

const libraries = ['places'];

const GeoLocation = (props) => {
    const inputRef = useRef();

    const [localLocation, setlocalLocation] = useState({
        status: 1,
        city: "",
        formatted_address: "",
        lat: 0,
        lng: 0,
    })

    const [loadingMap, setloadingMap] = useState(true)
    const [loadingAddress, setloadingAddress] = useState(true)

    // By Selecting place from input field
    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();
        if (place) {
            props.deliveryRef.current.click();

            props.setlocation({
                city: place.address_components[0].long_name,
                formatted_address: place.formatted_address,
                coordinates: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }
            })
        }
    }

    const getCity = async (response) => {
        var results = response.results;
        var c, lc, component;
        var found = false, message = "";
        for (var r = 0, rl = results.length; r < rl; r += 1) {
            var flag = false;
            var result = results[r];
            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                component = result.address_components[c];

                //confirm city from server
                const response = await api.getCity(component.long_name, result.geometry.location.lat(), result.geometry.location.lng());
                const res = await response.json();
                if (res.status === 1) {
                    // console.log(res)
                    setlocalLocation({
                        status: 1,
                        city: res.data.name,
                        formatted_address: result.formatted_address,
                        lat: parseFloat(res.data.latitude),
                        lng: parseFloat(res.data.longitude)
                    })
                    setloadingMap(false)
                    setloadingAddress(false)
                    flag = true;
                    found = true;
                }
                else {
                    found = false;
                    message = res.message
                }
                if (flag === true) {
                    break;
                }
            }
            if (flag === true) {
                break;
            }
        }
        if (found === false) {
            props.setlocalLocation({
                status: 0,
                message: message
            })
            props.setloadingAddress(false)
        }
    }


    const onSuccess = (location) => {

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({
            location: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        }).then(response => {
            if (response.results[0]) {
                //get city
                getCity(response)
            }
            else {
                console.log("No result found")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const onError = (error) => {
        console.log(error)
        props.setlocation({
            formatted_address: "",
            loaded: true,
            error: error
        })
    }

    const handleCurrentLocationClick = () => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)

    }

    const handleConfirmAddress = () => {
        props.setlocation({
            city: localLocation.city,
            formatted_address: localLocation.formatted_address,
            coordinates: {
                latitude: localLocation.lat,
                longitude: localLocation.lng
            }
        })
    }

    return (
        <>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACE_API} libraries={libraries}>
                <div className="dropdown-menu" aria-labelledby={props.labelby} style={{ width: "17pc" }}>

                    {/* Current location modal trigger */}
                    <button className='btn btn-outline-dark border-0 rounded-0 w-100' onClick={handleCurrentLocationClick} data-bs-toggle="modal" data-bs-target="#currentlocation">
                        <i className="bi bi-geo p-2"></i>Use my current location
                    </button>
                    <div className="dropdown-divider"></div>
                    <div className='p-2'>
                        <StandaloneSearchBox
                            onLoad={ref => inputRef.current = ref}
                            onPlacesChanged={handlePlaceChanged}
                        >
                            <input type="text" className='form-control' placeholder='Enter location manually' />
                        </StandaloneSearchBox>
                    </div>
                </div>


                {/* Current location Modal */}
                <div className="modal fade" id="currentlocation" tabIndex="-1" role="dialog" aria-labelledby="currentlocationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg mvh-90 w-100 d-flex flex-column" role="document">
                        <div className="modal-content flex-grow-1">

                            <div className="modal-header">
                                <h5 className="modal-title" id="currentlocationLabel">Confirm Location</h5>
                                <button id='closemodal' type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ position: "unset" }}></button>
                            </div>

                            <div className="modal-body h-100">
                                <p>Drag marker to change </p>
                                <div className="container h-100 w-100 " >
                                    {loadingMap ? <Spinner /> : (
                                        <Map localLocation={localLocation} setlocalLocation={setlocalLocation} setlocation={props.setlocation} setloadingAddress={setloadingAddress} />
                                    )}
                                </div>
                            </div>

                            {localLocation.status === 0 ? <p className='text-danger'>{localLocation.message}</p> : (
                                <>
                                    <div className='container'><b>Address :</b>
                                        {loadingAddress ? (<div><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>) : (<>{localLocation.formatted_address}</>)}</div>
                                </>
                            )}
                            {/* <p><b>Latitude : </b>{localLocation.lat}</p>
                                <p><b>Longitude : </b>{localLocation.lng}</p> */}
                            <div className="modal-footer">

                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmAddress}>
                                    Confirm
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </LoadScript>
        </>
    )
}

export default GeoLocation
