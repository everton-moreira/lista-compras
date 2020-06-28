import {combineReducers} from 'redux';

//import {loaderReducer} from './loaderReducer';
import {modalReducer} from './modalReducer';
import { categoryReducer } from './categoryReducer';
import {productReducer} from './productReducer';
import {shoppingListReducer} from './shoppingListReducer';
import {userReducer} from './userReducer';

export const Reducers = combineReducers({
    categoryState: categoryReducer,
    productState: productReducer,
    shoppingListState: shoppingListReducer,
    userState: userReducer,
    modalState: modalReducer
})