import React, { useState, useRef, useMemo } from 'react'
import './location.css'
import { motion } from 'framer-motion'
import { LoadScript, StandaloneSearchBox, GoogleMap, MarkerF } from '@react-google-maps/api';
import api from '../../api/api';
import { setLocation } from '../../utils/manageLocalStorage';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../model/action-type';


const libraries = ['places'];

const Location = (props) => {


  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);
  const [currLocationClick, setcurrLocationClick] = useState(false);
  const [isInputFields, setisInputFields] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [isAddressLoading, setisAddressLoading] = useState(false);
  const [localLocation, setlocalLocation] = useState({
    city: "",
    formatted_address: "",
    lat: parseFloat(0),
    lng: parseFloat(0),
  })

  const center = useMemo(() => ({
    lat: localLocation.lat,
    lng: localLocation.lng,
  }), [localLocation.lat, localLocation.lng])


  const inputRef = useRef();
  const closeModalRef = useRef();



  // By Selecting place from input field

  const handlePlaceChanged = () => {
    setisloading(true);

    const [place] = inputRef.current.getPlaces();
    if (place) {
      let city_name = place.address_components[0].long_name;
      let loc_lat = place.geometry.location.lat();
      let loc_lng = place.geometry.location.lng();

      console.log(city_name)

      fetchCity(city_name, loc_lat, loc_lng)
        .then(
          (res) => {
            if (res.status === 1) {
              setLocation({
                city: res.data.name,
                formatted_address: res.data.formatted_address,
                lat: res.data.latitude,
                lng: res.data.longitude,
              })
              dispatch({ type: ActionTypes.SET_CITY, payload: res.data })

              setisloading(false);
              closeModalRef.current.click()
            }
            else {
              setisloading(false);
              seterrorMsg(res.message)
            }
          }
        )
        .catch(error => {
          console.log(error)
        })
      props.setisLocationPresent(true)
      // closeModalRef.current.click();
    }
  }
  //fetching city from server 
  const fetchCity = async (city_name, loc_lat, loc_lng) => {
    const response = await api.getCity(city_name, loc_lat, loc_lng);
    const res = await response.json();
    return res;
  }


  //Select Current Location
  const handleCurrentLocationClick = () => {
    setisloading(true);
    setisInputFields(false);
    setcurrLocationClick(true);

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported"
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
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
        getAvailableCity(response).then(res => {
          if (res.status === 1) {
            // setLocation({
            //   city: res.data.name,
            //   formatted_address: res.data.formatted_address,
            //   latitude: res.data.latitude,
            //   longitude: res.data.longitude,
            // })

            setlocalLocation({
              city: res.data.name,
              formatted_address: res.data.formatted_address,
              lat: parseFloat(res.data.latitude),
              lng: parseFloat(res.data.longitude),
            })

            // dispatch({ type: ActionTypes.SET_CITY, payload: res.data });
          }
          else {
            console.log(res.message)
          }
        })
          .catch(error => console.log("error " + error));
        setisloading(false);
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
  }

  //get available delivery location city
  const getAvailableCity = async (response) => {
    var results = response.results;
    var c, lc, component;
    var found = false, message = "";
    for (var r = 0, rl = results.length; r < rl; r += 1) {
      var flag = false;
      var result = results[r];
      for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
        component = result.address_components[c];

        //confirm city from server
        const response = await api.getCity(component.long_name, result.geometry.location.lat(), result.geometry.location.lng()).catch(error => console.log("error: ", error));
        const res = await response.json();
        if (res.status === 1) {
          flag = true;
          found = true;
          return res;
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
      return {
        status: 0,
        message: message
      }
    }
  }



  const onMarkerDragStart = () => {
    setisAddressLoading(true);
  }

  const onMarkerDragEnd = (e) => {

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({
      location: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
    })
      .then(response => {
        if (response.results[0]) {
          //get city
          getAvailableCity(response)
            .then(res => {
              if (res.status === 1) {
                setlocalLocation({
                  city: res.data.name,
                  formatted_address: res.data.formatted_address,
                  lat: parseFloat(res.data.latitude),
                  lng: parseFloat(res.data.longitude),
                })
                setisAddressLoading(false);

              }
              else {
                seterrorMsg(res.message)
              }
            })
            .catch(error => console.log("error " + error))
        }
        else {
          console.log("No result found")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  //handle Confirm current location
  const confirmCurrentLocation = () => {
    setisloading(true);

    setLocation({
      city: localLocation.city,
      formatted_address: localLocation.formatted_address,
      lat: localLocation.lat,
      lng: localLocation.lng,
    })

    fetchCity(localLocation.city, localLocation.lat, localLocation.lng)
      .then(result => {
        if (result.status === 1) {
          dispatch({ type: ActionTypes.SET_CITY, payload: result.data });
          setisloading(false);
          props.setisLocationPresent(true)
          closeModalRef.current.click();
        }
        else {
          seterrorMsg(result.message)
        }
      }).catch(error => console.log("error ", error))
  }


  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACE_API} libraries={libraries}>
      <div className='modal-header'>
        <p className='location-header'>set delivery location</p>

        <motion.button whileTap={{ scale: 0.6 }} type="button" className="btn-close m-2" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}
          onClick={() => {
            setisloading(false)
            setcurrLocationClick(false)
            setisInputFields(false)
            setisAddressLoading(false)
          }}></motion.button>

      </div>
      <div className='location'>
        {isloading
          ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
          : (
            <>
              {!currLocationClick
                ? (
                  <div className='options'>
                    <motion.button whileTap={{ scale: 0.6 }} id='currLocation' onClick={handleCurrentLocationClick} disabled={isInputFields} style={isInputFields ? { opacity: "0.5" } : null}>your current location</motion.button>


                    <div className="px-3 m-auto"><span className="else"> OR </span></div>

                    {/* Input Places Fields */}
                    <div className='m-auto'>
                      <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <input type="text" id='text-places' className='border-bottom' placeholder='Enter City...' onFocus={() => {
                          setcurrLocationClick(false)
                          setisInputFields(true)
                        }} onBlur={() => { setisInputFields(false); }} />
                      </StandaloneSearchBox>
                    </div>
                  </div>
                )
                : (

                  <>
                    <GoogleMap zoom={11} center={center} mapContainerStyle={{ height: "400px" }}>
                      <MarkerF position={center} draggable={true} onDragStart={onMarkerDragStart} onDragEnd={onMarkerDragEnd}>
                      </MarkerF>
                    </GoogleMap>

                    {errorMsg === "" ? (
                      <div className='d-flex justify-content-between p-4'>
                        <p><b>Address : </b>{isAddressLoading ? "...." : localLocation.formatted_address}</p>
                        <motion.button whileTap={{ scale: 0.6 }} type='button' className='btn-confirm-location' onClick={confirmCurrentLocation} disabled={localLocation.formatted_address === ''}>Confirm</motion.button>
                      </div>
                    ) : null}
                  </>
                )}

              <p className='text-danger'>{errorMsg}</p>
            </>
          )}
      </div>
    </LoadScript>
  )
}

export default Location
