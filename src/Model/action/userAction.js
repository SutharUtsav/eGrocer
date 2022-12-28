import { ActionTypes } from "../constants/action-type";
import api from "../../api";

export const getUserDetails= () => async (dispatch)=>{
    const response = await api.getUser().catch(error=>console.log("error : ",error));
    const result = await response.json();
    dispatch({type:ActionTypes.GET_USER_DETAILS,payload:result});
}

export const updateUser = (name,email,selectedfile) => async(dispatch)=>{
    const response = await api.editProfile(name,email,selectedfile).catch(error=>console.log("error : ",error));
    const result = await response.json();

    if(result.status===0){
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "error" } })
    }
    else{
        dispatch({ type: ActionTypes.SET_ALERT, payload: { message: result.message, type: "success" } })
    }

}