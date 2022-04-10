
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { currencyAPI } from "../services/CurrencyService";

export default function Selector() {
  const options = [] as [];
  const persistedCurrencyList = localStorage.getItem("currencyList") as string;
  const parsedcurrencyList = JSON.parse(persistedCurrencyList);
  const [selectedOption, setSelectedOption] = useState(
    parsedcurrencyList || [],
  ) as any;

  const { error, isLoading } = currencyAPI.useFetchAllRatesQuery(selectedOption);
  const currencyList = [] as [];

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
