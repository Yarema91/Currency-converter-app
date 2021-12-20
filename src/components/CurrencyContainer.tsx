// import { randomBytes } from "crypto";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import settings from "../settings";
import CurrencyInput from "./CurrencyInput";
// import { useLocalStorage } from "./useLocalStorage";


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

    useEffect(() => {
        if (history) {
            try {
            localStorage.setItem('history', JSON.stringify(history)); 
            } catch (err) {
              console.log(err);
            }
          }
    }, [history])


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
                // alignItems: "flex-center",
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
                        {/* <th data-field="Amount">Amount</th> */}
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
                                {/* <td>{amount}</td> */}
                                {/* <td>{setAmount}</td> */}
                                <td>{(rate.rate * (amount < 0 ? 0 : amount)).toFixed(2)}</td>
                            </tr>
                        )}
                </tbody>
            </table>


            {/* <Card className=" col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em" }}>
                <table className="table table-borderless"
                    style={{ alignItems: "flex-center", padding: "2.2em", alignContent: "center", }}
                    id="table"
                    data-toggle="table"
                    data-height="460"
                    data-url="json/data1.json">
                    <thead>
                        <tr >
                            <th data-field="name">#</th>
                            <th data-field="price">Currency</th>
                            <th data-field="price">Amount</th>
                            <th data-field="date">Date</th>
                            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents">Delete</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>

                        {history.map((h) => (
                            <tr key={h.id}>
                                <td>{h.id}</td>
                                <td>{h.currency}</td>
                                <td>{h.amount}</td>
                                <td>{h.date}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card> */}

            {/*
             <nav aria-label="Page navigation example" style={{
                paddingTop: "1em",
                alignContent: "center",
                // alignItems: "flex-center",
                margin: "auto",
                // width: "auto"
            }}>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav> 
            */}
        </div>
    )
}

export default CurrencyContainer
