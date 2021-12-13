import React, { useState } from "react";
import { Card } from "react-bootstrap";

import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';



const HistoryPage = () => {
    let filterCurrency = ['EUR', 'USD', 'UAH', 'CAD', 'CHF', 'PLN', 'JPY', 'CZK'];

    const [baseCurrency, setBaseCurrency] = useState<string>('');

    const { data, error, isLoading } = currencyAPI.useFetchAllRatesQuery(baseCurrency);
    // const [ data: changeDate, {error: errorDate, isLoading: isLoadingDate} ] = currencyAPI.useFetchChangeDateQuery<any>();

    const [changeDate, setChangeDate] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    // console.log('date', data.date);


    return (
        // <div className="container"
        // style={{
        //     margin: "auto",
        //    boxSizing: "border-box",
        //    paddingTop: "1.5em",
        //    paddingLeft: "15px",

        // }} 

        // >
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

                    {/* <h1>History Page</h1> */}

                    <div className="container" style={{
                        display: "contants",
                        // alignItems: "flex-center",
                        paddingBlockStart: "1em",
                        paddingBlockEnd: "2.2em",
                    }}
                    >


                        <div className=" d-flex justify-content-center " style={{ flexWrap: "inherit" }}>
                            <select className="form-select me-2" id="inputGroupSelect04" aria-label="Example select with button addon"
                                value={baseCurrency}
                                defaultValue={'DEFAULT'}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const selectValue = e.target.value;
                                    // setSelectedCurrency(selectValue)
                                    setBaseCurrency(selectValue)
                                }}
                            >
                                <option value="DEFAULT" selected>Choose...</option>
                                {data && Object.keys(data.rates)
                                    .map(x => ({ currency: x, rate: data.rates[x] }))
                                    .filter(x => filterCurrency.includes(x.currency))
                                    .filter(x => x.currency != data.base)
                                    .map(rate =>
                                        <option key={rate.currency} value={rate.currency} >{rate.currency}</option>
                                    )}
                            </select>
                            <input type="number" className="form-control me-2" aria-label="Text input with segmented dropdown button" />
                            <select className="form-select me-2" id="inputGroupSelect04" aria-label="Example select with button addon"
                                value={baseCurrency}
                                defaultValue={'DEFAULT'}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const selectValue = e.target.value;
                                    // setSelectedCurrency(selectValue)
                                    setBaseCurrency(selectValue)
                                }}
                            >
                                <option value="DEFAULT" selected>Choose...</option>
                                {data && Object.keys(data.rates)
                                    .map(x => ({ currency: x, rate: data.rates[x] }))
                                    .filter(x => filterCurrency.includes(x.currency))
                                    .filter(x => x.currency != data.base)
                                    .map(rate =>
                                        <option key={rate.currency} value={rate.currency} >{rate.currency}</option>
                                    )}
                            </select>

                            <button className="btn btn-outline-primary " type="button" >Quantify</button>
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
                                {/* <th data-field="id">#</th> */}
                                <th data-field="Date">Date</th>
                                <th data-field="Rates">Rates </th>
                                {/* <th data-field="Second Date">Second Date</th> */}
                                <th data-field="Total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && Object.keys(data.rates)
                                .map(x => ({ currency: x, rate: data.rates[x] }))
                                .filter(x => filterCurrency.includes(x.currency))
                                .filter(x => x.currency = data.base)
                                .map(rate =>
                                    <tr >

                                        {/* <td>1</td> */}
                                        {/* <td>{d.setMonth(d.getMonth() + 1);
                                        while (d.getMonth() === month) {
                                                d.setDate(d.getDate() - 1) }}
                                                </td> */}
                                               
                                        <td>{data.date}</td>
                                        <td>{rate.rate}</td>

                                        {/* <td>{amount}</td> */}
                                        {/* <td>{amount}*</td> */}

                                        <td>{(rate.rate * 10).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: rate.currency,
                                        })}</td>

                                        {/* <td>{(rate.rate * 10).toFixed(2)}</td> */}
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
