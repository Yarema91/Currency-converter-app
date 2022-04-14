/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelector } from "../models/ISelector";

interface Currency {
  value: string;
  label: string;
}

interface CurrencyState {
  selector: ISelector[];
  isLoading: boolean;
  error: string;
  currencyList: Currency[];
}

// const persistedCurrencyList = localStorage.getItem('currencyList') as any;
// const parsedcurrencyList = JSON.parse(persistedCurrencyList);

const initialState: CurrencyState = {
  selector: [],
  isLoading: false,
  error: "",
  currencyList: [{ value: "AMD", label: "AMD" }],
};

export const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.currencyList = [
        ...state.currencyList,
        {
          value: action.payload,
          label: action.payload,
        },
      ];
    },
    remove(state, action: PayloadAction<string>) {
      console.log(state);
      console.log(action);
    },
  },
});

export const { add, remove } = selectorSlice.actions;

export default selectorSlice.reducer;

// export const {add, remove } = SelectedCurencySlice.actions;

// const store = configureStore ({
//     reducer: {
//         currencyList1: SelectedCurencySlice.reducer,
//     },
// })
