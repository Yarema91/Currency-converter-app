import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import settings from "../settings";
import Input from "../components/Input";


const HistoryPage = () => {

    const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });
    const [changeDate, setChangeDate] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
    const { data, error, isLoading } = currencyAPI.useFetchChangeDateQuery({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });
    const [amount, setAmount] = useState(1 as number); //1


    const handleSelectCurrency = (e) => {
        const selectValue = e.target.value;
        setBaseCurrency({ code: selectValue })
    }

    const onChangeAmount = (e) => {
        let exchangeRate = e.target.value;
        setAmount(exchangeRate); //

        let timeoutId;
        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {

        }, 3000)
    }

    return (
        <div className="row">
            <Card className="col-md-4">
                <div className="input-panel" >
                    <Input
                        onChange={handleSelectCurrency}
                        value={baseCurrency.code}
                    />
                    <input
                        type="number"
                        min={1}
                        className="input"
                        value={amount}
                        onChange={onChangeAmount}
                    />
                    <DatePicker
                        className="date-picker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error download...</h1>}
                <table className="table">
                    <thead>
                        <tr>
                            <th >Currency</th>
                            <th >Rates </th>
                            <th >Total</th>
                            <th >Date</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data && Object.keys(data.rates)
                            .map(x => ({ currency: x, rate: data.rates[x] }))
                            .filter(x => settings.currencyList.includes(x.currency))
                            .filter(x => x.currency != data.base)
                            .map(rate =>
                                <tr key={rate.currency}>
                                    <td>{rate.currency}</td>
                                    <td>{rate.rate}</td>
                                    <td>{(rate.rate * (amount < 0 ? 0 : amount)).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: rate.currency,
                                    })}</td>
                                    <td>{data.date}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default HistoryPage
