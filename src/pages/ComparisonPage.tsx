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
  const { data, error: errorStarDate, isLoading: isLoadingStarDate } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });

  const [endDate, setEndDate] = useState(new Date());
  const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`

  console.log(endDateForRecquest);
  const { data: dataEnd, error: endDateError, isLoading: endDateisLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: endDateForRecquest });


  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue })
  }

  const onChangeDate = (e) => {
    let exchangeDate = e.target.value;
    setStartDate(exchangeDate)

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

  return (
    <div className="row" style={{
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
          paddingBlockEnd: "2.2em",
        }}
        >
          <div className="container" style={{
            display: "contants",
            paddingBlockStart: "1em",
            paddingBlockEnd: "2.2em",
          }}
          >
            <div className=" d-flex justify-content-center " style={{ flexWrap: "inherit" }}>
              <CurrencyInput onChange={handleSelectCurrency} value={baseCurrency.code} />

              <DatePicker className=" me-2 p-1 " selected={startDate} onChange={(date) => setStartDate(date)} />

              <DatePicker className=" me-2 p-1 mw-auto" selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            {isLoadingStarDate && <h2>Loading start date...</h2>}
            {errorStarDate && <h2>Error start date download...</h2>}
            {endDateisLoading && <h2>Loading end date...</h2>}
            {endDateError && <h2>Error end date download...</h2>}
          </div>

          <table className="table"
            style={{
              alignItems: "flex-center", paddingLeft: "2.2em",
              alignContent: "center", margin: "auto", textAlign: "center"
            }}
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
                  <td>{(t.rateStart - t.rateEnd).toFixed(4)}</td>
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
