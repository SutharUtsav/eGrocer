import { combineReducers } from "@reduxjs/toolkit";
import { locationReducer } from "./locationReducer";
import { cssmodeReducer } from './cssmodeReducer';
import { languageReducer } from "./languageReducer";
import { categoryReducer } from "./categoryReducer";
import { userReducer } from './userReducer';

const reducers = combineReducers({
    city:locationReducer,
    cssmode:cssmodeReducer,
    language:languageReducer,
    category:categoryReducer,
    user:userReducer,
})

export default reducers;