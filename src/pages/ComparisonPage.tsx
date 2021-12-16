import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import settings from "../settings";
import CurrencyInput from "../components/CurrencyInput";


const ComparisonPage = () => {

    const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

    const [startDate, setStartDate] = useState(new Date());  //view change date1
    const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
    const { data, error, isLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });
   
    const [endDate, setEndDate] = useState(new Date());
    const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
    console.log(endDateForRecquest);

    const { data: dataEnd, error: endDateError, isLoading: endDateisLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: endDateForRecquest });
    // const { dataEnd, error: endDateError, isLoading: endDateisLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });


    // const [amount, setAmount] = useState(1 as any); 

    console.log('dataEnd', dataEnd);
    console.log('data', data);
    // console.log(rate.rate);


    // setTimeout(() => {
    //     let newArray = [] as any;
    //     for (const rate in data.rates) {
    //         newArray
    //             .push({
    //                 currency: rate,
    //                 data: data.rates[rate],
    //                 dataEnd: dataEnd.rates[rate]
    //             }
    //             )
    //             // .filter(x => settings.currencyList.includes(x.currency))
    //             ;
    //     }
    //     console.log('newArray', newArray);
    // }, 0)


 

    // let differance = data1 > dataEnd : new Data(data) - new Data(dataEnd) : new Data(dataEnd)  - new Data(data) ;

    const handleSelectCurrency = (e) => {
        const selectValue = e.target.value;
        setBaseCurrency({ code: selectValue })
    }

    const onChangeDate = (e) => {
        let exchangeDate = e.target.value;
        setStartDate(exchangeDate)

        console.log('click date');
    }

    var findTable;
    if (data && dataEnd) {
     findTable = settings.currencyList
            .filter(x => x != baseCurrency.code)
            .map(x => ({
                currency: x,
                rateStart: data.rates[x],
                rateEnd: dataEnd.rates[x]
            }))
    }
    console.log('findTable', findTable);
    


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
                            {/* {isLoadingDate && <h1>Loading date...</h1>}
                            {errorDate && <h1>Error date download...</h1>} */}
                            <DatePicker className=" me-2 p-1 " selected={startDate} onChange={(date) => setStartDate(date)} />
                            {endDateisLoading && <h1>Loading end date...</h1>}
                            {endDateError && <h1>Error end date download...</h1>}
                            <DatePicker className=" me-2 p-1 mw-auto" selected={endDate} onChange={(date) => setEndDate(date)} />

                            {/* <button className="btn btn-outline-primary  " type="button" >Quantify</button> */}
                        </div>
                    </div>
                    {/* {isLoading && <h1>Loading...</h1>}
                    {error && <h1>Error download...</h1>} */}
                    <table  className="table"
                        style={{ alignItems: "flex-center", paddingLeft: "2.2em",
                         alignContent: "center", margin: "auto", textAlign: "center" }}
                    >
                        <thead>
                            <tr>
                                <th >Currency</th>
                                <th >First Date</th>
                                <th >Second Date</th>
                                <th >Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                                  {findTable && findTable.map(t => 
                                        <tr key={t.currency}>
                                            <td>{t.currency}</td>
                                            <td>{t.rateStart}</td>
                                            <td>{t.rateEnd}</td>
                                            <td>{(t.rateStart - t.rateEnd).toFixed(2)}</td>
                                        </tr>
                                    )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ComparisonPage;
