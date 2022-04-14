import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { currencyAPI } from "../services/CurrencyService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import settings from "../settings";
import Input from "../components/Input";
// import "@styles/styles.scss";


const ComparisonPage = () => {

  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

  const [startDate, setStartDate] = useState(new Date());

  const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
  const { data, error: errorStarDate, isLoading: isLoadingStarDate } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: startDateForRecquest });

  const [endDate, setEndDate] = useState(new Date());
  const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`

  // console.log(endDateForRecquest);
  const { data: dataEnd, error: endDateError, isLoading: endDateisLoading } = currencyAPI.useFetchChangeDateQuery<any>({ baseCurrency: baseCurrency.code, changeDate: endDateForRecquest });


  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue })
  }

  const onChangeDate = (e) => {
    let exchangeDate = e.target.value;
    setStartDate(exchangeDate)
  }

  let findTable;
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
    <div className="row">

      <Card className="col-md-4">
        <div className="input-panel">
          <Input
            onChange={handleSelectCurrency}
            value={baseCurrency.code}
          />
          <DatePicker
            className="date-picker"
            selected={startDate}
            onChange={(date: React.SetStateAction<Date>) => setStartDate(date)}
          />
          <DatePicker
            className="date-picker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          {isLoadingStarDate && <h2>Loading start date...</h2>}
          {errorStarDate && <h2>Error start date download...</h2>}
          {endDateisLoading && <h2>Loading end date...</h2>}
          {endDateError && <h2>Error end date download...</h2>}
        </div>

        <table className="table">
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
      </Card>
    </div>
  );
};

export default ComparisonPage;
