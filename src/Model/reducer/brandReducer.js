import { ActionTypes } from "../constants/action-type";

export const brandReducer = (state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_BRANDS:
            return {
                ...state,
                brands:payload,
            }
    
        default:
            return state
    }
} 