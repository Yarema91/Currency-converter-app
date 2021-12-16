import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import settings from "../settings";
import CurrencyInput from "../components/CurrencyInput";

var timeoutId;

const HistoryPage = () => {

    const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });
    const [changeDate, setChangeDate] = useState();
    const [startDate, setStartDate] = useState(new Date());  //view change date
    const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()-1}` 
    const { data, error, isLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });
    const [amount, setAmount] = useState(1 as any); //1

  
    // const [endDate, setEndDate] = useState(new Date());

  
    // const [history, setHistory] = useState(parsedHistory  || [] as any); // defaltHistory

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

            console.log('hello');
        }, 3000)
    }
     const onChangeDate = (e) => {
        let exchangeRate = e.target.value;
        setStartDate(exchangeRate )

         console.log('click date');
     }

    return (
        <div className="row" style={{
              // background: "red",
            boxSizing: "border-box",
            margin: "auto",
            padding: "2em",
            display: "flex",
            alignItems: "flex-center",
            justifyContent: "center",
        }}>

            <Card className="col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em", margin: "auto" }}>
                <div id="toolbar" className="container" style={{
                    display: "contants",
                    // alignItems: "flex-center",
                    paddingBlockStart: "1em",
                    paddingBlockEnd: "2.2em",
                }}
                >
                    <div className="container" style={{
                        display: "contants",
                        // alignItems: "flex-center",
                        paddingBlockStart: "1em",
                        paddingBlockEnd: "2.2em",
                    }}
                    >
                        <div className=" d-flex justify-content-center " style={{ flexWrap: "inherit" }}>

                            <CurrencyInput onChange={handleSelectCurrency} value={baseCurrency.code} />

                            {/* <input type="number" className="form-control me-2" aria-label="Text input with segmented dropdown button" /> */}
                            <input type="number" min={1}
                                className="form-control me-2" 
                                value={amount} 
                                onChange={onChangeAmount} />

                            <DatePicker className="me-2 p-1 " selected={startDate} onChange={(date) => setStartDate(date)} />
                            {/* <button className="btn btn-outline-primary " type="button" >Quantify</button> */}
                        </div>
                    </div>
                        {isLoading && <h1>Loading...</h1>}
                        {error && <h1>Error download...</h1>}
                    <table className="table"
                        style={{ alignItems: "flex-center", paddingLeft: "2.2em",
                         alignContent: "center", margin: "auto", textAlign: "center" }}
                        // id="table"
                        // data-toggle="table"
                        // data-height="460"
                        // data-toolbar="#toolbar"
                        // data-show-refresh="true"
                        // data-show-toggle="true"
                        // data-show-columns="true"
                        // data-query-params="queryParams"
                        // data-response-handler="responseHandler"
                        // data-url="https://examples.wenzhixin.net.cn/examples/bootstrap_table/data"
                    >
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
                                        {/* <td>{amount}</td> */}
                                        {/* <td>{setAmount}</td> */}
                                        {/* <td>{(rate.rate * (amount < 0 ? 0 : amount)).toFixed(2)}</td> */}
                                        <td>{(rate.rate * (amount < 0 ? 0 : amount)).toLocaleString('en-US',{
                                            style: 'currency',
                                            currency: rate.currency,
                                        })}</td>
                                        <td>{data.date}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    {/* {error && <h1>Error find...</h1>}
            {isLoading && <h1>Loading find by id project...</h1>}
            {DeleteError && <h1>Error delete...</h1>}
            {DeleteIsLoading && <h1>Loading Delete project...</h1>}
            {UpdateError && <h1>Error update...</h1>}
            {UpdateIsLoading && <h1>Loading update project...</h1>}
            {(project) ? <ProjectDetails project={project} update={handleUpdate} remove={handleRemove}
            /> : erroeMassege()} */}
                </div>
            </Card>
        </div>
    )
}

export default HistoryPage
