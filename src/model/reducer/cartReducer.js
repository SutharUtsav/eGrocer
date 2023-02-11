import { ActionTypes } from "../action-type";


const initialState = {
    status:'loading', //fulfill
    cart:null,
}

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CART:
            return{
                ...state,
                status:"fulfill",
                cart:payload,
            }
        
        default:
            return state;
    }
}