import React, { useState } from 'react';
import { currencyAPI } from '../services/CurrencyService';
import settings from '../settings';
import Input from '../components/Input';

const CurrencyContainer = ({ onChange }) => {
  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({
    code: settings.baseCurrency,
  });

  const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(
    baseCurrency.code
  );

  const [amount, setAmount] = useState(1 as number);

  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue });
  };

  const onChangeAmount = (e) => {
    const exchangeRate = e.target.value;
    setAmount(exchangeRate);

    let timeoutId;
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onChange({
        currency: baseCurrency.code,
        amount: exchangeRate,
      });
    }, 3000);
  };

  return (
    <>
      <div id="toolbar" className="container-1">
        <div className="input-panel">
          <Input
            onChange={handleSelectCurrency}
            value={baseCurrency.code}
          />
          <input
            type="number"
            min={1}
            className="input"
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
          {data &&
            Object.keys(data.rates)
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
    </>
  );
};

export default CurrencyContainer;
