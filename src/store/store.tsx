import { combineReducers, configureStore, getDefaultMiddleware }  from "@reduxjs/toolkit";
import { currencyAPI } from "../services/CurrencyService";
import SelectedCurencySlice from "./SelectedCurencySlice";
import  selectorSlice  from "./SelectedCurencySlice";




const rootReducer = combineReducers({
    
    [currencyAPI.reducerPath]: currencyAPI.reducer, 
    selectorSlise: selectorSlice

})

export const setupStore = () => {
    return configureStore({
        
     reducer: rootReducer,

     middleware: (getDefaultMiddleware) => 
         getDefaultMiddleware().concat(currencyAPI.middleware)
    });
}


export type RootState = ReturnType<typeof rootReducer>
// export type RootState = ReturnType<typeof store.getState>

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export default store;
 
