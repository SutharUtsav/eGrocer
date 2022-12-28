import { ActionTypes } from "../constants/action-type";

const initialState = {

    location: {},
    city:{}

}
export const locationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_LOCATION:
            return {
                ...state,
                location: payload
            }
        case ActionTypes.CLEAR_LOCATION:
            return {}
        case ActionTypes.SET_CITY:
            return {
                ...state,
                city:payload
            }
        default:
            return state
    }
}