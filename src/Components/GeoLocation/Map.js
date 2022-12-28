import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useMemo } from 'react'
import api from '../../api'

const Map = (props) => {


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
          // console.log(result)
          props.setlocalLocation({
            status: 1,
            city: res.data.name,
            formatted_address: result.formatted_address,
            lat: parseFloat(res.data.latitude),
            lng: parseFloat(res.data.longitude)
          })
          props.setloadingAddress(false)
          flag = true;
          found = true;
        }
        else {
          found = false;
          message = res.message;
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
    }
  }

  const onMarkerDragEnd = (e) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({
      location: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
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

  const onMarkerDragStart = () => {
    props.setloadingAddress(true)
  }

  const center = useMemo(() => ({
    lat: props.localLocation.lat,
    lng: props.localLocation.lng,
  }), [props.localLocation.lat, props.localLocation.lng])

  return (

    <GoogleMap zoom={11} center={center} mapContainerStyle={{ height: "400px" }}>
      <Marker position={center} draggable={true} onDragStart={onMarkerDragStart} onDragEnd={onMarkerDragEnd}>
      </Marker>
    </GoogleMap>

  )
}

export default Map
