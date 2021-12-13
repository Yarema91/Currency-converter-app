import { randomBytes } from "crypto";
import React, { useState } from "react";
import { currencyAPI } from "../services/CurrencyService";




const CurrencyContainer = () => {

    let filterCurrency = ['EUR', 'USD', 'UAH', 'CAD', 'CHF', 'PLN', 'JPY', 'CZK'];

    const [baseCurrency, setBaseCurrency] = useState<{code: string}>({code: 'USD'});

    const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(baseCurrency.code);
    const [amount, setAmount] = useState(1 as number) ;
    // const [selectedCurrency, setSelectedCurrency] = useState('');

    // console.log('baseCurrency', baseCurrency);


    // const onChangeCurrency = obj => {
    //     setBaseCurrency('EUR');
    //     // const searchWord = event.target.value;
    //     // setSelectedCurrency(searchWord);
    //     setSelectedCurrency(obj); 

    //     console.log("click select");
    //     console.log("data.base", data.base);
    //     // console.log('selectedCurrency', selectedCurrency());

    //     // || "DEFAULT" 
    //     // let currentValue = rate.currency;
    //     // setbaseCurrency(currentValue);
    // }

    const onChangeAmount = (e) => {
        console.log("convert");
       
        let exchangeRate =  e.target.value;
        setAmount(exchangeRate);
        console.log('exchangeRate', exchangeRate);

        // const convert = data.rate * exchangeRate;
        // console.log('convert', convert);
       
        
    }

    // console.log('baseCurrency2', baseCurrency);

    return (
        <div>
            <div id="toolbar" className="container" style={{
                display: "contants",
                // alignItems: "flex-center",
                paddingBlockStart: "1em",
                paddingBlockEnd: "2.2em",
            }}
            >
                {/* <select
                    value={baseCurrency}
                    defaultValue={'DEFAULT'}
                    onChange={(e) => {
                        e.preventDefault();
                        const selectValue = e.target.value;
                        // setSelectedCurrency(selectValue)
                        setBaseCurrency(selectValue)
                    }}
                >
                    <option value="steak">Steak</option>
                    <option value="sandwich">Sandwich</option>
                    <option value="dumpling">Dumpling</option>
                    {data && Object.keys(data.rates)
                            .map(x => ({ currency: x, rate: data.rates[x] }))
                            .filter(x => filterCurrency.includes(x.currency))
                            .filter(x => x.currency != data.base)
                            .map(rate =>
                                <option key={rate.currency} value={rate.currency} >{rate.currency}</option>
                            )}
                </select>
                {baseCurrency} */}
                
                <div className="input-group">
                    <select className="form-select"  
                        value={baseCurrency.code}
                        // defaultValue={'DEFAULT'}
                        onChange={(e) => {
                            // e.preventDefault();
                            const selectValue = e.target.value;
                            // setSelectedCurrency(selectValue)
                            setBaseCurrency({code: selectValue})
                        }}
                    >
                        {/* <option value="DEFAULT" >Choose...</option> */}
                        {data && Object.keys(data.rates)
                            .map(x => ({ currency: x, rate: data.rates[x] }))
                            .filter(x => filterCurrency.includes(x.currency))
                            .filter(x => x.currency != data.base)
                            .map(rate =>
                                <option  value={rate.currency} selected={baseCurrency.code === rate.currency}>{rate.currency}</option>
                            )}
                    </select>

                    <input type="number" className="form-control" aria-label="Text input with segmented dropdown button"  
                    value={amount} onChange={onChangeAmount}/>
                    <button className="btn btn-outline-primary " type="button" >Convert</button>
                </div>
            </div>

            <table className="table"
                style={{ alignItems: "flex-center", paddingLeft: "2.2em", alignContent: "center", margin: "auto", textAlign: "center" }}
                id="table"
                data-toggle="table"
                data-height="460"
                data-toolbar="#toolbar"
                data-show-refresh="true"
                data-show-toggle="true"
                data-show-columns="true"
                data-query-params="queryParams"
                data-response-handler="responseHandler"
                data-url="https://examples.wenzhixin.net.cn/examples/bootstrap_table/data"
            >
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error download...</h1>}
                <thead>
                    <tr>
                        <th data-field="Currency">Currency</th>
                        <th data-field="Rates">Rates</th>
                        <th data-field="Amount">Amount</th>
                        <th data-field="Result">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {data && Object.keys(data.rates)
                        .map(x => ({ currency: x, rate: data.rates[x]  }))
                        .filter(x => filterCurrency.includes(x.currency))
                        .filter(x => x.currency != data.base)
                        .map(rate =>
                            <tr >

                                <td>{rate.currency}</td>
                                <td>{rate.rate}</td>
                                <td>{amount}</td>
                                {/* <td>{setAmount}</td> */}
                                {/* <td>{rate.rate * {amount} }</td> */}
                            </tr>
                        )}
                </tbody>
            </table>

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
