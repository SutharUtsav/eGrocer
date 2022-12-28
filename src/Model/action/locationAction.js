import { ActionTypes } from "../constants/action-type"
import api from "../../api";

export const setLocation = (location) => async(dispatch)=>{ 
    const response = await api.getCity(location.city,location.latitude,location.longitude).catch(error => console.log(error));
    const result = await response.json();

    if(result.status===0){
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "error" } })
    }else{
        dispatch({type:ActionTypes.SET_LOCATION,payload:location})
        dispatch({type:ActionTypes.SET_CITY,payload:result.data})
        localStorage.setItem('location',JSON.stringify(
            {location:location,
            city:result.data}
        ))
    }
}

export const clearLocation = () =>{
    return {
        type:ActionTypes.CLEAR_LOCATION,
    }
}

export const setLocationbyInput = (location) => async(dispatch)=>{

    const response = await api.getCity(location.city, location.latitude, location.longitude).catch(error => console.log(error));
    const result = await response.json();

    if(result.status===0){
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "error" } })
    }
    else{
        dispatch({type:ActionTypes.SET_LOCATION,payload:location})
        dispatch({type:ActionTypes.SET_CITY,payload:result.data})
        localStorage.setItem('location',JSON.stringify(
            {location:location,
            city:result.data}
        ))
    }
}

// export const setLocationbyMap = ()