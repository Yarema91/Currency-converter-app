/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { currencyAPI } from "../services/CurrencyService";
import selectorSlice from "./SelectedCurencySlice";

const rootReducer = combineReducers({
  [currencyAPI.reducerPath]: currencyAPI.reducer,
  selectorSlise: selectorSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["currencyAPI.reducerPath"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(currencyAPI.middleware),

  //  middleware: (getDefaultMiddleware) =>
  //      getDefaultMiddleware().concat(currencyAPI.middleware)
});
export const persistor = persistStore(store);

export default store;
