import { ActionTypes } from "../constants/action-type";

export const shopReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_SHOP:
            return {
                ...state,
                shop: payload,
            }
        case ActionTypes.SET_CATEGORY:
            return {
                ...state,
                categories: payload,
            }
        case ActionTypes.SET_OFFERS:
            return {
                ...state,
                offers: payload,
            }
        case ActionTypes.SET_SECTIONS:
            return {
                ...state,
                sections: payload,
            }
        case ActionTypes.SET_SLIDERS:
            return {
                ...state,
                sliders: payload,
            }
        // case ActionTypes.GET_CATEGORY:
        //     return state
        // case ActionTypes.GET_OFFERS:
        //     return state
        // case ActionTypes.GET_SECTIONS:
        //     return state
        // case ActionTypes.GET_SLIDERS:
        //     return state
        default:
            return state
    }
}