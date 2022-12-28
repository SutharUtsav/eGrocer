import { ActionTypes } from "../constants/action-type";

export const userReducer  =(state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.GET_USER_DETAILS:
            return {
                ...state,
                user:payload,
            }
        default:
            return state
    }
}