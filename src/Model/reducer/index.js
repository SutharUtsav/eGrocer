import { combineReducers } from "redux";
// import { userReducer } from "./userReducer";
import { shopReducer } from './shopReducer';

const reducers = combineReducers({

    // login: userReducer,
    shop: shopReducer,
})

export default reducers;