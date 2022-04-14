
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { currencyAPI } from "../services/CurrencyService";

export default function Selector() {
  const options = [] as any;
  // <[{ value: string, label: string }]>
  const persistedCurrencyList = localStorage.getItem('currencyList') as string;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(parsedcurrencyList || []);

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
    const currency = Object.keys(data.rates);

    currency.forEach(element => {
      options.push({
        value: element,
        label: element,
      })
    })
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error download...</h1>}
      <Select
        className="selector"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />
    </>
  );
}
