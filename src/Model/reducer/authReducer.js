import { ActionTypes } from "../constants/action-type";
const initialState = {
    user:{},
    access_token:"",
}

export const authReducer = (state=initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_AUTH:
            return {
                ...state,
                user: payload.user,
                access_token:payload.access_token
            }
        case ActionTypes.CLEAR_AUTH:
            return {}
        default:
            return state

    }
}