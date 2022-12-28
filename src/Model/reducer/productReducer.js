import { ActionTypes } from "../constants/action-type";

export const productReducer = (state={},{type,payload})=>{
    switch (type) {
        case ActionTypes.FETCH_PRODUCT_FROM_CATEGORY:
            return {
                ...state,
                products:payload,
            }
        case ActionTypes.CLEAR_PRODUCTS:
            return {}
        case ActionTypes.ERROR_FETCH_PRODUCTS:
            return{ 
                error:payload,
            }

        default:
            return state
    }
} 