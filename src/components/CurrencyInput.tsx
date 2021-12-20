import React, { useState } from "react";
import { currencyAPI } from "../services/CurrencyService";
import settings from "../settings";


const CurrencyInput = ({ onChange, value }) => {

    // const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });
    // const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(baseCurrency.code);
    return (

        <select className="form-select me-2"
            value={value}
            onChange={onChange} 
        >
            {settings.currencyList.map(currency =>
                <option value={currency}  key={currency}>{currency}</option>
            )}
        </select>

    )
}

export default CurrencyInput
