import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { currencyAPI } from '../services/CurrencyService';
import settings from '../settings';

import SelectedCurencySlice, { add, remove } from '../store/SelectedCurencySlice';


export default function SelectionCurrency() {

const {currencyList1} = useAppSelector(state => state.selectorSlise);
// const {add} = SelectedCurencySlice.actions ; 
const dispatch = useAppDispatch();
// const [store, setStore] = useState(null)

console.log('currencyList1', currencyList1);

// store.subscribe(()=>{
//   localStorage.setItem('currencyList', JSON.stringify(store.getState()))
// })


  const options = [] as any;
  const persistedCurrencyList = localStorage.getItem('currencyList') as any;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(currencyList1 || []) as any; //parsedcurrencyList

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);

 
  let currencyList = [] as any;

  useEffect(() => {
    if (currencyList) {
      try {
        localStorage.setItem('currencyList', JSON.stringify(selectedOption));
      } catch (err) {
        console.log(err);
      }
    }
  }, [currencyList])

  if (data && data.rates) {
    const currency = Object.keys(data.rates) as any;

    var value = currency.forEach(element => {
      options.push({
        value: element,
        label: element,
      })
    })
  }
  console.log('selectedOption S', selectedOption);

  console.log('add', add(selectedOption));
  // dispatch(add(selectedOption))


  // setSelectedOption()

  // const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  // const r = randomBetween(0, 255);
  // const g = randomBetween(0, 255);
  // const b = randomBetween(0, 255);
  // const rgb = `rgb(${r},${g},${b})`;
  // setSelectedOption({value: 'ALL', label: 'ALL'});


  return (
    <div className="App">
      {/* <button  onChange={() => dispatch(add(selectedOption))}>hvhjjj</button> */}
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </div>
  );
}