import { ActionTypes } from "../constants/action-type";
import api from "../../api";

export const setBrands = () => async (dispatch)=>{
    const respones = await api.getBrands().catch(error=>console.log("error : ",error));
    const result = await respones.json();

    if(result.status===0){
        dispatch({type:ActionTypes.SET_ALERT,payload:{ message: result.message, type: "error" }})
    }
    else{
        dispatch({type:ActionTypes.SET_BRANDS,payload:result.data});
    }
}