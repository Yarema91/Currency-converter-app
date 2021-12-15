import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import settings from "../settings";
import CurrencyInput from "../components/CurrencyInput";


const ComparisonPage = () => {

  // var prepareDte = 

  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

  const [changeDate, setChangeDate] = useState();

  const [startDate, setStartDate] = useState(new Date());  //view change date1
  const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() - 1}`
  const { data, error, isLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });


  const { dataEnd, error: endDateError, isLoading: endDateisLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });
  const [endDate, setEndDate] = useState(new Date());
  // const [amount, setAmount] = useState(1 as any); 

  console.log('endDate', endDate);
  console.log('endDate', endDate);



  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue })
  }

  const onChangeDate = (e) => {
    let exchangeDate = e.target.value;
    setStartDate(exchangeDate)

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

              {/* {isLoadingDate && <h1>Loading date...</h1>}
              {errorDate && <h1>Error date download...</h1>} */}
              <DatePicker className=" me-2 p-1 " selected={startDate} onChange={(date) => setStartDate(date)} />
              {endDateisLoading && <h1>Loading end date...</h1>}
              {endDateError && <h1>Error end date download...</h1>}
              <DatePicker className=" me-2 p-1 mw-auto" selected={endDate} onChange={(date) => setEndDate(date)} />

              <button className="btn btn-outline-primary  " type="button" >Quantify</button>
            </div>
          </div>
          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Error download...</h1>}
          <table className="table"
            style={{ alignItems: "flex-center", paddingLeft: "2.2em", alignContent: "center", margin: "auto", textAlign: "center" }}
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
              {data && Object.keys(data.rates)
                .map(x => ({ currency: x, rate: data.rates[x] }))
                .filter(x => settings.currencyList.includes(x.currency))
                .filter(x => x.currency != data.base)
                .map(rate =>
                  <tr key={rate.currency}>
                    <td>{rate.currency}</td>
                    <td>{rate.rate}</td>
                    {/* <td>+0.32</td> */}
                  </tr>
                )}
              {dataEnd && Object.keys(dataEnd.rates)
                .map(x => ({ currency: x, rate2: dataEnd.rates[x] }))
                .filter(x => settings.currencyList.includes(x.currency))
                .filter(x => x.currency != data.base)
                .map(rate =>
                  <tr key={rate.rate2}>

                    <td>{rate.rate2}</td>
                    <td>+0.32</td>
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
