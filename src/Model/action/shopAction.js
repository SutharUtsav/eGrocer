
import api from "../../api"
import { ActionTypes } from "../constants/action-type"

export const fetchShop = (id,latitude,longitude) => async (dispatch) => {
    const response = await api.getShop(id,latitude,longitude).catch(error=>console.log("error:",error));
    const result = await response.json();

    dispatch({type: ActionTypes.FETCH_SHOP, payload: result.data})
    dispatch({type:ActionTypes.SET_CATEGORY, payload: result.data.category})
    dispatch({type:ActionTypes.SET_OFFERS, payload: result.data.offers})
    dispatch({type:ActionTypes.SET_SLIDERS, payload: result.data.sliders})
    dispatch({type:ActionTypes.SET_SECTIONS, payload: result.data.sections})
}

export const setSliders = (sliders)=>{
    return{
        type:ActionTypes.SET_SLIDERS,
        payload:sliders
    }
}

export const setCategories = (categories)=>{
    return{
        type:ActionTypes.SET_CATEGORY,
        payload:categories
    }
}

export const setOffers = (offers)=>{
    return{
        type:ActionTypes.SET_OFFERS,
        payload:offers
    }
}

export const setSections = (sections)=>{
    return{
        type:ActionTypes.SET_SECTIONS,
        payload:sections
    }
}

// export const getSliders = (sliders)=>{
//     return{
//         type:ActionTypes.GET_SECTIONS,
//         payload:sliders
//     }
// }

// export const getCategories = (categories)=>{
//     return{
//         type:ActionTypes.GET_CATEGORY,
//         payload:categories
//     }
// }

// export const getOffers = (offers)=>{
//     return{
//         type:ActionTypes.GET_OFFERS,
//         payload:offers
//     }
// }

// export const getSections = (sections)=>{
//     return{
//         type:ActionTypes.GET_SECTIONS,
//         payload:sections
//     }
// }