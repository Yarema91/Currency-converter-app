
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { currencyAPI } from "../services/CurrencyService";

export default function Selector() {
  const options = [] as any;
  const persistedCurrencyList = localStorage.getItem('currencyList') as string;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(parsedcurrencyList || []) as any;

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);


  const currencyList = [] as string[];

  useEffect(() => {
    if (currencyList) {
      try {
        localStorage.setItem("currencyList", JSON.stringify(selectedOption));
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
  // console.log('selectedOption S', selectedOption);

  // console.log('add', add(selectedOption));
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
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error download...</h1>}
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </div>
  );
}