import { combineReducers } from "@reduxjs/toolkit";
import { locationReducer } from "./locationReducer";
import { cssmodeReducer } from './cssmodeReducer';
import { languageReducer } from "./languageReducer";
import { categoryReducer } from "./categoryReducer";
import { authReducer } from './authReducer';
import { productFilterReducer } from "./productFilterReducer";
import { selectedProductReducer } from "./selectedProduct";
import {cartReducer} from './cartReducer';
import {productSizesReducer} from './productSizesReducer'

const reducers = combineReducers({
    city:locationReducer,
    cssmode:cssmodeReducer,
    language:languageReducer,
    category:categoryReducer,
    user:authReducer,
    productFilter:productFilterReducer,
    selectedProduct:selectedProductReducer,
    cart:cartReducer,
    productSizes:productSizesReducer,
})

export default reducers;