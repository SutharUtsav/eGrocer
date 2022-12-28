import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { shopReducer } from './shopReducer';
import { alertReducer } from "./alertReducer";
import { locationReducer } from "./locationReducer";
import {userReducer} from "./userReducer";
import {brandReducer} from './brandReducer';
import {categoryReducer} from './categoryReducer'
import {productReducer} from './productReducer'

const reducers = combineReducers({
    shop: shopReducer,
    auth:authReducer,
    alert:alertReducer,
    location:locationReducer,
    user:userReducer,
    brands:brandReducer,
    category:categoryReducer,
    products:productReducer,
})

export default reducers;