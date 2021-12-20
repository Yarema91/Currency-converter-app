import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import settings from "../settings";
import CurrencyInput from "./CurrencyInput";


var timeoutId;

var defaltHistory = [
    { 'currency': 'USD', 'amount': 100 },
    { 'currency': 'UAH', 'amount': 20 },
];


const CurrencyContainer: React.FC<any>  = ({onChange1}) => {

    const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

    const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(baseCurrency.code);

    const [amount, setAmount] = useState(1 as any); //1

    const persistedHistory = localStorage.getItem('history') as any;
    const parsedHistory = JSON.parse(persistedHistory );
    const [history, setHistory] = useState(parsedHistory  || [] as any); // defaltHistory

    // localStorage.setItem('defaltHistory', JSON.stringify(defaltHistory));
    // const persistedHistory = localStorage.getItem('defaltHistory') as any;
    // const parsedHistory = JSON.parse(persistedHistory);
    // console.log(parsedHistory);

    // useEffect(() => {
    //     if (history) {
    //         try {
    //         localStorage.setItem('history', JSON.stringify(history)); 
    //         } catch (err) {
    //           console.log(err);
    //         }
    //       }
    // }, [history])


    const handleSelectCurrency = (e) => {
        const selectValue = e.target.value;
        setBaseCurrency({ code: selectValue })
    }

    const onChangeAmount = (e) => {

        let exchangeRate = e.target.value;
        setAmount(exchangeRate); //
        console.log('exchangeRate', exchangeRate);

        timeoutId && clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {

            if (amount !== 1) {
                onChange1({
                    currency: baseCurrency.code,
                        amount: exchangeRate,
            })
                // setHistory([
                //     ...history,
                //     {
                //         id: history.length + 1,
                //         currency: baseCurrency.code,
                //         amount: exchangeRate.trim(),
                //         date:  data.date
                //     } 
                // ]);
            }
            //  setHistory([...history, amount]);
            // localStorage.setItem('exchangeRate', JSON.stringify(exchangeRate))
            // console.log(history);
            // setAmount(1)
            console.log('hello');
        }, 3000)
    }

    return (
        <div>
            <div id="toolbar" className="container" style={{
                display: "contants",
                paddingBlockStart: "1em",
                paddingBlockEnd: "2.2em",
            }}
            >
                <div className=" d-flex justify-content-center " style={{ flexWrap: "inherit" }}>
                    
                    <CurrencyInput onChange={handleSelectCurrency} value={baseCurrency.code} />

                    <input type="number" min={1}
                        className="form-control" aria-label="Text input with segmented dropdown button"
                        value={amount} onChange={onChangeAmount} />
                </div>
            </div>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error download...</h1>}
            <table className="table"
                style={{ alignItems: "flex-center", paddingLeft: "2.2em", alignContent: "center", margin: "auto", textAlign: "center" }}
                id="table"
            >
                <thead>
                    <tr>
                        <th >Currency</th>
                        <th >Rates</th>
                        <th >Result</th>
                    </tr>
                </thead>
                <tbody>
                    {data && Object.keys(data.rates)
                        .map(x => ({ currency: x, rate: data.rates[x] }))
                        .filter(x => settings.currencyList.includes(x.currency))
                        .filter(x => x.currency != data.base)
                       .map(rate =>
                            <tr key={rate.currency}>
                                <td>{rate.currency}</td>
                                <td>{rate.rate}</td>
                                <td>{(rate.rate * (amount < 0 ? 0 : amount)).toFixed(2)}</td>
                            </tr>
                        )}
                </tbody>
            </table>

        </div>
    )
}

export default CurrencyContainer
