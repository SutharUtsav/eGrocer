import api from "../../api"
import { ActionTypes } from "../constants/action-type"
// import {useCookies} from 'react-cookie';


export const login = (num, otp, countycode) => async (dispatch) => {

    const response = await api.login(num, otp, countycode).catch(error => console.log(error));
    const result = await response.json();

    if (result.status === 0) {
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "error" } })
    }
    else {        
        localStorage.setItem('user',JSON.stringify(result.data.user))
        localStorage.setItem('access_token',result.data.access_token)

        // dispatch({ type: ActionTypes.SET_AUTH, payload: result.data })
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: "successfully loggedin", type: "success" } })
    }
}

export const logout = ()=> async (dispatch) =>{
    const response = await api.logout().catch(error => console.log(error));
    const result = await response.json();

    if (result.status === 0) {
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "error" } })
    }
    else {        
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')

        // dispatch({ type: ActionTypes.SET_AUTH, payload: result.data })
        dispatch({ type: ActionTypes.CLEAR_AUTH})

        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: "successfully loggedout", type: "success" } })
    }
}