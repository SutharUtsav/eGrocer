import { ActionTypes } from "../action-type";


const initialState = {
    final_products : [],
}

export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                final_products: payload,
            }
    
        default:
            return state;
    }
}