import { ActionTypes } from "../constants/action-type";
import api from "../../api";

export const fetchProductbyCategory = (city_id, latitude, longitude, category_id) => async (dispatch)=>{
    const respones = await api.getProductbyCategory(city_id, latitude, longitude, category_id).catch(error=>console.log("error : ",error));
    const result = await respones.json();

    if(result.status===0){
        dispatch({type:ActionTypes.ERROR_FETCH_PRODUCTS,payload:result.message })
    }
    else{
        dispatch({type:ActionTypes.FETCH_PRODUCT_FROM_CATEGORY,payload:result.data});
    }
}

export const clearProducts = () =>{
    return {
        type:ActionTypes.CLEAR_PRODUCTS,
    }
}