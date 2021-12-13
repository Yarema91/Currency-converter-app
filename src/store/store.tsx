import { combineReducers, configureStore, getDefaultMiddleware }  from "@reduxjs/toolkit";

import productReducer from "../components/project/projectSlice"
import counterReducer from "../components/counter/counterSlice";
import { projectAPI } from "../services/ProductsService";
import { currencyAPI } from "../services/CurrencyService";


const rootReducer = combineReducers({
    productReducer,
    counterReducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [currencyAPI.reducerPath]: currencyAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        // product: {
        //     id: 1,
        //     imageUrl: "some url here",
        //     name: "Product name",
        //     count: 4,
        //     size: {
        //         "width": 200,
        //         "height": 200
        //         },
        //     weight: "200g",
        //     comments: ["CommentModel", "CommentModel"]
        // },
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) => 
        //  getDefaultMiddleware().concat(projectAPI.middleware);
         getDefaultMiddleware().concat(currencyAPI.middleware)
    });

}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
 
