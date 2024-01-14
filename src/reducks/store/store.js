import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware} from "connected-react-router";
import { thunk } from 'redux-thunk';

// Import reducers
import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export default function createStore(history) { // history: reactアプリ内で前回どのパスにいたのか・・
    return configureStore({
        reducer:{

            products: ProductsReducer,
            router: connectRouter(history),//reactのstore内で、history情報を管理
            users: UsersReducer, // Assuming "useres" was a typo and "users" is correct.
        },
        //routerMiddlewareをmiddlewareとして使うという宣言
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(routerMiddleware(history)).concat(thunk) // Added thunk here
    });
}
