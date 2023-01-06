import { combineReducers } from "@reduxjs/toolkit";
import { locationReducer } from "./locationReducer";
import { cssmodeReducer } from './cssmodeReducer';
import { languageReducer } from "./languageReducer";

const reducers = combineReducers({
    city:locationReducer,
    cssmode:cssmodeReducer,
    language:languageReducer,
})

export default reducers;