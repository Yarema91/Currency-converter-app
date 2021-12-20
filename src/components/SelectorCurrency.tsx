import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { currencyAPI } from '../services/CurrencyService';
import settings from '../settings';



let options = [
  // {value: 'usd', label: 'usd'},
  // {value: 'eur', label: 'eur'},
  // {value: 'uah', label: 'uah'},
];

export default function App() {

  const [options, setOptions] = useState([] || null) as any;

  const [selectedOption, setSelectedOption] = useState([] || null) as any;

  // const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);


    
  
  //1. Викликати дані
  //2. вісортувати по ключу
  // 3. наповнити щзешщті currency 
  //3. обявити як options
  //4. створити локал сторадж, записувти активні із генерацією кольору
  //5. викликати локалсторедж у інших компонентах

  console.log('data', data);

  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b})`;


  if (data && data.rates) {
    const currency = Object.keys(data.rates) as any;
    // console.log('currency', currency);
    // currency.map(x => )

    var value = currency.forEach(element => {
      // console.log(element);
      options.push({
            value: element,
            label: element,
          })
    })
    // console.log('options', options);
  }
  // console.log('SelectedOption', selectedOption);

  // const persistedCurrencyList = localStorage.getItem('currencyList') as any;
  // const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  // const [currencyList, setCurrencyList] = useState(parsedcurrencyList  || [] as any); 

  var currencyList = [] as any;
  const selectedCurrency = selectedOption.forEach(e => {
    // console.log('i.value', e.value);
    currencyList.push(e.value) ;
  }
  );
  // localStorage.setItem('currencyList', JSON.stringify(currencyList));
  // console.log('currencyList', currencyList);
  
  useEffect(() => {
    if (currencyList) {
      try {
        localStorage.setItem('currencyList', JSON.stringify(currencyList));
      } catch (err) {
        console.log(err);
      }
    }
  }, [currencyList])


  const onChange = () => {
    // console.log('select click');

  }

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