import { combineReducers } from "@reduxjs/toolkit";
import { locationReducer } from "./locationReducer";
import { cssmodeReducer } from './cssmodeReducer';
import { languageReducer } from "./languageReducer";
import { categoryReducer } from "./categoryReducer";
import { authReducer } from './authReducer';
import { productFilterReducer } from "./productFilterReducer";

const reducers = combineReducers({
    city:locationReducer,
    cssmode:cssmodeReducer,
    language:languageReducer,
    category:categoryReducer,
    user:authReducer,
    productFilter:productFilterReducer,
})

export default reducers;