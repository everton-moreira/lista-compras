import {combineReducers} from 'redux';

//import {loaderReducer} from './loaderReducer';
import {modalReducer} from './modalReducer';
import { categoryReducer } from './categoryReducer';
import {productReducer} from './productReducer';

export const Reducers = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
    modalState: modalReducer
})