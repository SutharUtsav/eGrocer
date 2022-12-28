import { ActionTypes } from "../constants/action-type";

export const categoryReducer = (state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_CATEGORY_FROM_API:
            return {
                ...state,
                category:payload,
            }
    
        default:
            return state
    }
} 