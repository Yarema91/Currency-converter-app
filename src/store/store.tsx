import { combineReducers, configureStore, getDefaultMiddleware }  from "@reduxjs/toolkit";

import { currencyAPI } from "../services/CurrencyService";


const rootReducer = combineReducers({

   
    [currencyAPI.reducerPath]: currencyAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) => 
       
         getDefaultMiddleware().concat(currencyAPI.middleware)
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
 
