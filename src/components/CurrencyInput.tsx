/* eslint-disable import/extensions */
import React from "react";
// import { currencyAPI } from "../services/CurrencyService";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-unresolved
import settings from "../settings";

// eslint-disable-next-line react/prop-types
function CurrencyInput({ onChange, value }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <select className="form-select me-2" value={value} onChange={onChange}>
      {settings.currencyList.map((currency) => (
        <option value={currency} key={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}

export default CurrencyInput;
