import { ActionTypes } from "../constants/action-type"

export const setAlert = (alert)=>{
    return {
        type:ActionTypes.SET_ALERT,
        payload:alert,
    }
}

export const removeAlert = () => {
    return {
        type:ActionTypes.REMOVE_ALERT,
    }
}