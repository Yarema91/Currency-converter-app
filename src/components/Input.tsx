import React from "react";
import settings from "../settings";

function Input({ onChange, value }) {
  return (
    <select
      className="input"
      value={value}
      onChange={onChange}
    >
      {settings.currencyList.map((currency) => (
        <option
          value={currency}
          key={currency}
        >
          {currency}
        </option>
      ))}
    </select>
  );
}

export default Input;
