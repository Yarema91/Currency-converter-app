import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { currencyAPI } from '../services/CurrencyService';
import settings from '../settings';


export default function App() {

  const options = [] as any;

  const persistedCurrencyList = localStorage.getItem('currencyList') as any;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(parsedcurrencyList || []) as any; //[]

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);

  // const[ state, setState] = useState();
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



//   let selectedCurrencyList1 = [] as any;

//   selectedOption.forEach(element => {
//       selectedCurrencyList1.push(element.value);
//     });

// // setCurrencyList1(selectedCurrencyList1)
// // setState();
// console.log(' selectedCurrencyList1',  selectedCurrencyList1);




  // const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  // const r = randomBetween(0, 255);
  // const g = randomBetween(0, 255);
  // const b = randomBetween(0, 255);
  // const rgb = `rgb(${r},${g},${b})`;
  // setSelectedOption({value: 'ALL', label: 'ALL'});


  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </div>
  );
}