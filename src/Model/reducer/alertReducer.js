import { ActionTypes } from "../constants/action-type";

export const alertReducer = (state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_ALERT:
            return{
                ...state,
                alert : payload,
            }

        case ActionTypes.REMOVE_ALERT:
            return {}
        default:
            return state
    }
}