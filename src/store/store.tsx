import { combineReducers, configureStore, getDefaultMiddleware }  from "@reduxjs/toolkit";
import { currencyAPI } from "../services/CurrencyService";
import SelectedCurencySlice from "./SelectedCurencySlice";
import  selectorSlice  from "./SelectedCurencySlice";

import { persistStore, 
    persistReducer,
     FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    
    [currencyAPI.reducerPath]: currencyAPI.reducer, 
    selectorSlise: selectorSlice
})


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['currencyAPI.reducerPath'],
    // whitelist: ['currencyList1']
  }

const persistedReducer  = persistReducer(persistConfig, rootReducer)


const store = configureStore ({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(currencyAPI.middleware),

    //  middleware: (getDefaultMiddleware) => 
    //      getDefaultMiddleware().concat(currencyAPI.middleware)

})
 export const persistor = persistStore(store)
  

// export const setupStore = () => {
//     return configureStore({
        
//      reducer: rootReducer,

//      middleware: (getDefaultMiddleware) => 
//          getDefaultMiddleware().concat(currencyAPI.middleware)
//     });
// }


// export type RootState = ReturnType<typeof rootReducer>
// // export type RootState = ReturnType<typeof store.getState>

// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']

export default store;
 
