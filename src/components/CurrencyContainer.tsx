/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { currencyAPI } from "../services/CurrencyService";
import settings from "../settings";
import CurrencyInput from "./CurrencyInput";

// eslint-disable-next-line react/function-component-definition
const CurrencyContainer: React.FC<any> = ({ onChange1 }) => {
  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({
    code: settings.baseCurrency,
  });

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(
    baseCurrency.code,
  );

  const [amount, setAmount] = useState(1 as any);

  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue });
  };

  const onChangeAmount = (e) => {
    const exchangeRate = e.target.value;
    setAmount(exchangeRate);

    let timeoutId;
    // eslint-disable-next-line no-unused-expressions
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onChange1({
        currency: baseCurrency.code,
        amount: exchangeRate,
      });
    }, 3000);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div
        id="toolbar"
        className="container"
        style={{
          display: "contants",
          paddingBlockStart: "1em",
          paddingBlockEnd: "2.2em",
        }}
      >
        <div
          className=" d-flex justify-content-center "
          style={{ flexWrap: "inherit" }}
        >
          <CurrencyInput
            onChange={handleSelectCurrency}
            value={baseCurrency.code}
          />

          <input
            type="number"
            min={1}
            className="form-control"
            aria-label="Text input with segmented dropdown button"
            value={amount}
            onChange={onChangeAmount}
          />
        </div>
      </div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error download...</h1>}
      <table
        className="table"
        style={{
          alignItems: "flex-center",
          paddingLeft: "2.2em",
          alignContent: "center",
          margin: "auto",
          textAlign: "center",
        }}
        id="table"
      >
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rates</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data
            && Object.keys(data.rates)
              .map((x) => ({ currency: x, rate: data.rates[x] }))
              .filter((x) => settings.currencyList.includes(x.currency))
              .filter((x) => x.currency !== data.base)
              .map((rate) => (
                <tr key={rate.currency}>
                  <td>{rate.currency}</td>
                  <td>{rate.rate}</td>
                  <td>{(rate.rate * (amount < 0 ? 0 : amount)).toFixed(2)}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyContainer;
