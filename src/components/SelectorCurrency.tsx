/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import Select from "react-select";
// eslint-disable-next-line import/no-unresolved
import { currencyAPI } from "../services/CurrencyService";

export default function SelectionCurrency() {
  const options = [] as any;
  const persistedCurrencyList = localStorage.getItem("currencyList") as any;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(
    parsedcurrencyList || [],
  ) as any; // parsedcurrencyList

  const { error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);
  const currencyList = [] as any;

  useEffect(() => {
    if (currencyList) {
      try {
        localStorage.setItem("currencyList", JSON.stringify(selectedOption));
      } catch (err) {
        console.log(err);
      }
    }
  }, [currencyList]);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
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
