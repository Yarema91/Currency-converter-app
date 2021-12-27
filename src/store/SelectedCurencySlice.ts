
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currencyAPI } from '../services/CurrencyService';
import {ISelector} from '../models/ISelector'

interface Currency{
    value: string,
    label: string
}


interface CurrencyState {
    selector: ISelector[];
    isLoading: boolean;
    error: string;
    currencyList1: Currency[];
}


// const persistedCurrencyList = localStorage.getItem('currencyList') as any;
// const parsedcurrencyList = JSON.parse(persistedCurrencyList); 

const initialState: CurrencyState = {
    selector: [],
    isLoading: false,
    error: '',
    currencyList1: [{value: 'AMD', label: 'AMD'}],
    
}

 
export const selectorSlice = createSlice({
    name: 'selector', 
    initialState,
    reducers: {
       add(state, action: PayloadAction<string>){
 
           state.currencyList1 = [
               ...state.currencyList1,{
                value: action.payload,
                label: action.payload
               }
           ]
       },
       remove(state, action: PayloadAction<string>){
        console.log(state);
        console.log(action);
       }

    }
})

export const {add, remove} = selectorSlice.actions

export default selectorSlice.reducer;



// export const {add, remove } = SelectedCurencySlice.actions;

// const store = configureStore ({
//     reducer: {
//         currencyList1: SelectedCurencySlice.reducer,
//     },
// })